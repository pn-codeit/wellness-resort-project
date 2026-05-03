require('dotenv').config();

const express = require('express');
const { getPageText } = require('./data/options');
const {
  createBooking,
  ensureDatabase,
  getAvailability,
  getDatabaseStatus,
  getOptions,
  pingDatabase
} = require('./db/mysqlClient');
const {
  deleteKey,
  getJson,
  getRedisStatus,
  pingRedis,
  setJson
} = require('./cache/redisClient');

const app = express();
const serviceName = process.env.SERVICE_NAME || 'booking-service';
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '1mb' }));

function langFrom(req) {
  return req.query.lang === 'en' || req.body.lang === 'en' ? 'en' : 'de';
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === '') return [];
  return [value];
}

function validateBooking(body) {
  const customer = {
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim(),
    phone: String(body.phone || '').trim(),
    address: String(body.address || '').trim(),
    city: String(body.city || '').trim()
  };

  const selection = {
    durationId: String(body.duration || '').trim(),
    roomId: String(body.room || '').trim(),
    treatmentIds: asArray(body.treatments).map((id) => String(id).trim()).filter(Boolean),
    extraIds: asArray(body.extras).map((id) => String(id).trim()).filter(Boolean),
    arrive: String(body.arrive || '').trim()
  };

  if (!customer.name || !customer.email || !customer.phone || !customer.address || !customer.city) {
    throw Object.assign(new Error('Customer name, email, phone, address and city are required.'), { statusCode: 400 });
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer.email)) {
    throw Object.assign(new Error('A valid email address is required.'), { statusCode: 400 });
  }

  if (!selection.durationId || !selection.roomId || !selection.arrive) {
    throw Object.assign(new Error('Duration, room and arrival date are required.'), { statusCode: 400 });
  }

  const arrivalDate = new Date(`${selection.arrive}T00:00:00Z`);
  if (Number.isNaN(arrivalDate.getTime())) {
    throw Object.assign(new Error('A valid arrival date is required.'), { statusCode: 400 });
  }

  return { customer, selection };
}

async function buildOptions(lang) {
  const [options, availability] = await Promise.all([getOptions(), getAvailability()]);

  return {
    ...getPageText(lang),
    availability,
    durations: options.durations.map((item) => ({
      id: item.id,
      label: lang === 'en' ? item.label_en : item.label_de,
      nights: item.nights,
      price: item.price
    })),
    treatments: options.treatments.map((item) => ({
      id: item.id,
      label: lang === 'en' ? item.label_en : item.label_de,
      desc: lang === 'en' ? item.desc_en : item.desc_de,
      price: item.price
    })),
    rooms: options.rooms.map((item) => ({
      id: item.id,
      label: lang === 'en' ? item.label_en : item.label_de,
      desc: lang === 'en' ? item.desc_en : item.desc_de,
      pricePerNight: item.price_per_night
    })),
    extras: options.extras.map((item) => ({
      id: item.id,
      label: lang === 'en' ? item.label_en : item.label_de,
      desc: lang === 'en' ? item.desc_en : item.desc_de,
      price: item.price,
      pricePerNight: item.price_per_night
    }))
  };
}

app.get('/health', async (_req, res) => {
  const [databaseReady, redisReady] = await Promise.all([
    ensureDatabase().then(() => pingDatabase()),
    pingRedis()
  ]);

  const ok = databaseReady && redisReady;

  res.status(ok ? 200 : 503).json({
    status: ok ? 'ok' : 'degraded',
    service: serviceName,
    database: getDatabaseStatus(),
    redis: getRedisStatus()
  });
});

app.get('/options', async (req, res) => {
  await ensureDatabase();

  const lang = langFrom(req);
  const cacheKey = `booking:options:${lang}`;
  const cached = await getJson(cacheKey);
  if (cached) {
    return res.json({ ...cached, source: 'redis' });
  }

  const options = await buildOptions(lang);
  await setJson(cacheKey, options, Number(process.env.BOOKING_OPTIONS_CACHE_SECONDS || 120));
  return res.json({ ...options, source: 'mysql' });
});

app.get('/availability', async (_req, res) => {
  await ensureDatabase();
  const availability = await getAvailability();
  return res.json(availability);
});

app.post('/bookings', async (req, res, next) => {
  try {
    const lang = langFrom(req);
    const { customer, selection } = validateBooking(req.body);
    const result = await createBooking({ customer, selection, lang });

    await deleteKey('booking:options:de');
    await deleteKey('booking:options:en');

    return res.status(201).json(result);
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
    message: statusCode >= 500 ? 'Unexpected booking-service error.' : err.message
  });
});

Promise.all([ensureDatabase(), pingRedis()]).then(([databaseReady, redisReady]) => {
  if (!databaseReady || !redisReady) {
    console.warn(`${serviceName} started before all dependencies were ready; requests will retry.`);
  }
});

app.listen(port, () => {
  console.log(`${serviceName} listening on ${port}`);
});
