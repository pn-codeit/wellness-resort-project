require('dotenv').config();

const crypto = require('crypto');
const express = require('express');
const { buildFallbackAdvice } = require('./advisor/fallbackAdvice');
const { buildResortContext } = require('./advisor/resortContext');
const { getJson, getRedisStatus, pingRedis, setJson } = require('./cache/redisClient');
const { askGemini, getGeminiStatus } = require('./clients/geminiClient');
const { fetchResortData } = require('./clients/resortServices');

const app = express();
const serviceName = process.env.SERVICE_NAME || 'assistant-service';
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '1mb' }));

function langFrom(req) {
  return req.query.lang === 'en' || req.body.lang === 'en' ? 'en' : 'de';
}

function validateAdviceRequest(body) {
  const input = String(body.input || '').trim();

  if (!input) {
    throw Object.assign(new Error('A guest request is required.'), { statusCode: 400 });
  }

  if (input.length > 1200) {
    throw Object.assign(new Error('The guest request is too long.'), { statusCode: 400 });
  }

  return input;
}

function cacheKey(lang, input) {
  const hash = crypto.createHash('sha256').update(`${lang}:${input.toLowerCase()}`).digest('hex');
  return `assistant:advice:${hash}`;
}

app.get('/health', async (_req, res) => {
  const redisReady = await pingRedis();
  const gemini = getGeminiStatus();

  res.status(redisReady ? 200 : 503).json({
    status: redisReady ? 'ok' : 'degraded',
    service: serviceName,
    redis: getRedisStatus(),
    gemini
  });
});

app.post('/advice', async (req, res, next) => {
  try {
    const lang = langFrom(req);
    const input = validateAdviceRequest(req.body);
    const key = cacheKey(lang, input);
    const cached = await getJson(key);

    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const resortData = await fetchResortData(lang);
    const context = buildResortContext(resortData);
    const geminiAdvice = await askGemini({ input, lang, context });
    const advice = geminiAdvice || buildFallbackAdvice({ input, lang, context });
    const response = {
      ...advice,
      contextSources: resortData.sources
    };

    await setJson(key, response, Number(process.env.ASSISTANT_CACHE_SECONDS || 300));
    return res.json(response);
  } catch (err) {
    return next(err);
  }
});

app.use((req, res) => {
  res.status(404).json({
    service: serviceName,
    message: `No route for ${req.method} ${req.path}`
  });
});

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    service: serviceName,
    message: statusCode >= 500 ? 'Unexpected assistant-service error.' : err.message
  });
});

pingRedis().then((redisReady) => {
  if (!redisReady) {
    console.warn(`${serviceName} started before Redis was ready; requests will continue without cache.`);
  }
});

app.listen(port, () => {
  console.log(`${serviceName} listening on ${port}`);
});
