const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------------------------------------------------------------
// Resort location (Oberstdorf)
// ---------------------------------------------------------------------------
const RESORT_LOCATION = {
  name: 'Oberstdorf',
  lat: 47.4095,
  lon: 10.2789,
  radiusMeters: 5000,
};

// ---------------------------------------------------------------------------
// Tool definitions (sent to Gemini so it knows what it can call)
// ---------------------------------------------------------------------------
const tools = [
  {
    functionDeclarations: [
      {
        name: 'wikipedia_search',
        description:
          'Search Wikipedia and return a short summary for a given topic. ' +
          'Use this when the guest asks about a wellness practice, ingredient, destination, or any topic that benefits from factual background.',
        parameters: {
          type: 'OBJECT',
          properties: {
            query: {
              type: 'STRING',
              description: 'The search term to look up on Wikipedia.',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'search_nearby_attractions',
        description:
          'Search for nearby tourist attractions, hiking trails, viewpoints, restaurants, or other points of interest ' +
          'around the resort in Oberstdorf using OpenStreetMap data. Use this when a guest asks what to do, ' +
          'where to eat, what to visit, or anything about the local area.',
        parameters: {
          type: 'OBJECT',
          properties: {
            category: {
              type: 'STRING',
              description:
                'Type of place to search for. One of: attraction, hiking, viewpoint, restaurant, hotel, museum, spa, park',
            },
          },
          required: ['category'],
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Tool implementations
// ---------------------------------------------------------------------------
async function wikipedia_search({ query }) {
  // 1. Find the best matching page title
  const searchUrl =
    `https://en.wikipedia.org/w/api.php?action=query&list=search` +
    `&srsearch=${encodeURIComponent(query)}&srlimit=1&format=json&origin=*`;

  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  const hit = searchData?.query?.search?.[0];

  if (!hit) return { summary: `No Wikipedia article found for "${query}".` };

  // 2. Fetch the plain-text summary for that page
  const summaryUrl =
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(hit.title)}`;

  const summaryRes = await fetch(summaryUrl);
  const summaryData = await summaryRes.json();

  return {
    title: summaryData.title,
    summary: summaryData.extract ?? 'No summary available.',
    url: summaryData.content_urls?.desktop?.page ?? '',
  };
}

// Category → Overpass tag filters
const CATEGORY_FILTERS = {
  attraction: ['tourism=attraction', 'tourism=artwork', 'historic=monument'],
  hiking:     ['route=hiking', 'tourism=trailhead', 'leisure=nature_reserve'],
  viewpoint:  ['tourism=viewpoint'],
  restaurant: ['amenity=restaurant', 'amenity=cafe', 'amenity=biergarten'],
  hotel:      ['tourism=hotel', 'tourism=guest_house'],
  museum:     ['tourism=museum'],
  spa:        ['leisure=spa', 'amenity=spa'],
  park:       ['leisure=park', 'boundary=national_park'],
};

async function search_nearby_attractions({ category }) {
  const tags = CATEGORY_FILTERS[category] ?? CATEGORY_FILTERS.all;
  const { lat, lon, radiusMeters } = RESORT_LOCATION;

  // Build an Overpass union query for all matching tags
  const unionLines = tags
    .map(tag => {
      const [k, v] = tag.split('=');
      return `node["${k}"="${v}"](around:${radiusMeters},${lat},${lon});`;
    })
    .join('\n  ');

  const query = `[out:json][timeout:10];\n(\n  ${unionLines}\n);\nout body 10;`;

  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  });

  const data = await res.json();
  const places = (data.elements ?? [])
    .filter(el => el.tags?.name)
    .map(el => ({
      name: el.tags.name,
      type: el.tags.tourism ?? el.tags.amenity ?? el.tags.leisure ?? el.tags.historic ?? 'place',
      description: el.tags.description ?? el.tags['description:en'] ?? null,
      website: el.tags.website ?? null,
    }));

  if (places.length === 0) {
    return { message: `No ${category} spots found near Oberstdorf in OpenStreetMap.` };
  }

  return { location: RESORT_LOCATION.name, category, places };
}

// Map tool name → implementation
const TOOL_HANDLERS = { wikipedia_search, search_nearby_attractions };

// ---------------------------------------------------------------------------
// Agentic loop: send message, execute any tool calls, repeat until text reply
// ---------------------------------------------------------------------------
async function runAgentLoop(chat, userMessage) {
  let result = await chat.sendMessage(userMessage);

  while (true) {
    const candidate = result.response.candidates?.[0];
    const parts = candidate?.content?.parts ?? [];

    const functionCalls = parts.filter(p => p.functionCall);
    if (functionCalls.length === 0) {
      // No more tool calls — return the final text
      return result.response.text();
    }

    // Execute all tool calls in parallel
    const toolResults = await Promise.all(
      functionCalls.map(async part => {
        const { name, args } = part.functionCall;
        console.log(`[tool] calling ${name} with`, args);
        const handler = TOOL_HANDLERS[name];
        const response = handler
          ? await handler(args).catch(err => ({ error: err.message }))
          : { error: `Unknown tool: ${name}` };
        return { functionResponse: { name, response } };
      })
    );

    // Send tool results back to the model
    result = await chat.sendMessage(toolResults);
  }
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are a friendly and knowledgeable assistant for Serenity Wellness Resort,
located in Oberstdorf, Bavaria, Germany — a beautiful alpine town in the Allgäu Alps.
You help guests with questions about bookings, spa treatments, wellness programs, amenities, local weather,
and anything related to their stay. Keep your answers warm, concise, and helpful. Do not use markdown formatting.

1. When a guest asks about things to do, local attractions, hiking, restaurants, or the surrounding area,
use the search_nearby_attractions tool to find real, up-to-date options from OpenStreetMap.

2. When a guest asks about a wellness topic, ingredient, or place you are unsure about, use the
wikipedia_search tool to provide accurate background information.

If asked about something entirely unrelated to wellness or the resort, politely steer back.`;

router.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required.' });
  if (!process.env.GEMINI_API_KEY)
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview', // DO NOT CHANGE THE MODEL
      systemInstruction: SYSTEM_PROMPT,
      tools,
    });

    const geminiHistory = (history || []).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({ history: geminiHistory });
    const reply = await runAgentLoop(chat, message);

    res.json({ reply });
  } catch (err) {
    console.error('Gemini error:', err.message);
    res.status(500).json({ error: 'Failed to get a response from the assistant.' });
  }
});

module.exports = router;
