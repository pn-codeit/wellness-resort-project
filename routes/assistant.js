const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

const SYSTEM_PROMPT = `You are a friendly and knowledgeable assistant for Serenity Wellness Resort.
You help guests with questions about bookings, spa treatments, wellness programs, amenities, local weather,
and anything related to their stay. Keep your answers warm, concise, and helpful.
If asked about something unrelated to the resort or wellness, politely steer the conversation back.`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
      systemInstruction: SYSTEM_PROMPT,
    });

    const geminiHistory = (history || []).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessage(message);

    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error('Gemini error:', err.message);
    res.status(500).json({ error: 'Failed to get a response from the assistant.' });
  }
});

module.exports = router;
