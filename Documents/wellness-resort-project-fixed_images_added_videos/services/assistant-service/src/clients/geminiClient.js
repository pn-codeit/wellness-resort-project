const GEMINI_API_BASE_URL = process.env.GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const GEMINI_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 8000);

let lastError = null;

function isConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}

function extractText(responseBody) {
  const parts = responseBody && responseBody.candidates && responseBody.candidates[0]
    && responseBody.candidates[0].content && responseBody.candidates[0].content.parts;

  if (!Array.isArray(parts)) return '';
  return parts.map((part) => part.text || '').join('').trim();
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch (_err) {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  }
}

function normalizeAdvice(value) {
  if (!value || typeof value !== 'object') return null;
  const recommendation = value.recommendation || {};

  const advice = {
    greeting: String(value.greeting || '').trim(),
    recommendation: {
      duration: String(recommendation.duration || '').trim(),
      treatments: Array.isArray(recommendation.treatments) ? recommendation.treatments.map(String).filter(Boolean) : [],
      room: String(recommendation.room || '').trim(),
      extras: Array.isArray(recommendation.extras) ? recommendation.extras.map(String).filter(Boolean) : [],
      reasoning: String(recommendation.reasoning || '').trim(),
      total_price: String(recommendation.total_price || '').trim()
    }
  };

  if (
    !advice.greeting ||
    !advice.recommendation.duration ||
    advice.recommendation.treatments.length === 0 ||
    !advice.recommendation.room ||
    !advice.recommendation.reasoning ||
    !advice.recommendation.total_price
  ) {
    return null;
  }

  return advice;
}

function buildPrompt({ input, lang, context }) {
  const language = lang === 'en' ? 'English' : 'German';

  return [
    'You are a concise wellness resort advisor for Serenity Wellness Resort.',
    `Answer in ${language}.`,
    'Use only resort facts from the JSON context. Do not invent unavailable rooms, treatments, extras, products or media.',
    'Recommend one package that fits the guest request. Keep it practical and warm, not medical.',
    'Return valid JSON only with this exact shape:',
    '{"greeting":"...","recommendation":{"duration":"...","treatments":["..."],"room":"...","extras":["..."],"reasoning":"...","total_price":"..."}}',
    'Use EUR prices from the context and estimate the total if possible.',
    '',
    `Guest request: ${input}`,
    '',
    `Resort context JSON: ${JSON.stringify(context)}`
  ].join('\n');
}

async function askGemini({ input, lang, context }) {
  if (!isConfigured()) {
    lastError = new Error('GEMINI_API_KEY is not configured.');
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);
  const url = `${GEMINI_API_BASE_URL}/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: buildPrompt({ input, lang, context }) }]
          }
        ],
        generationConfig: {
          temperature: 0.5,
          responseMimeType: 'application/json'
        }
      })
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      lastError = new Error(body.error && body.error.message ? body.error.message : `Gemini returned ${response.status}.`);
      return null;
    }

    const parsed = parseJson(extractText(body));
    const normalized = normalizeAdvice(parsed);
    if (!normalized) {
      lastError = new Error('Gemini returned an invalid advisor response.');
      return null;
    }

    lastError = null;
    return {
      ...normalized,
      source: 'gemini',
      model: GEMINI_MODEL
    };
  } catch (err) {
    lastError = err;
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function getGeminiStatus() {
  return {
    configured: isConfigured(),
    model: GEMINI_MODEL,
    error: lastError ? lastError.message : null
  };
}

module.exports = {
  askGemini,
  getGeminiStatus
};
