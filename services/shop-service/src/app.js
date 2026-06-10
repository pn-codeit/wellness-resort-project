require('dotenv').config();

const express = require('express');
const { getPageText } = require('./data/catalog');
const {
  createOrder,
  ensureDatabase,
  getDatabaseStatus,
  getProducts,
  pingDatabase
} = require('./db/mysqlClient');
const {
  deleteKey,
  getJson,
  getRedisStatus,
  pingRedis,
  setJson
} = require('./cache/redisClient');
const {
  ensureStorage,
  getObjectStream,
  getStorageStatus,
  statObject
} = require('./storage/minioClient');

const app = express();
const serviceName = process.env.SERVICE_NAME || 'shop-service';
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '1mb' }));

function langFrom(req) {
  return req.query.lang === 'en' || req.body.lang === 'en' ? 'en' : 'de';
}

function objectNameFrom(req) {
  return decodeURIComponent(req.params[0] || '').replace(/^\/+/, '');
}

function parseItems(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];

  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed) ? parsed : [];
  } catch (_err) {
    return [];
  }
}

function validateOrder(body) {
  const customer = {
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim(),
    address: String(body.address || '').trim(),
    city: String(body.city || '').trim()
  };
  const items = parseItems(body.items)
    .map((item) => ({
      id: Number(item.id),
      qty: Number(item.qty || item.quantity || 1)
    }))
    .filter((item) => Number.isInteger(item.id) && item.id > 0 && Number.isFinite(item.qty) && item.qty > 0);

  if (!customer.name || !customer.email || !customer.address || !customer.city) {
    throw Object.assign(new Error('Customer name, email, address and city are required.'), { statusCode: 400 });
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer.email)) {
    throw Object.assign(new Error('A valid email address is required.'), { statusCode: 400 });
  }

  if (items.length === 0) {
    throw Object.assign(new Error('At least one order item is required.'), { statusCode: 400 });
  }

  return { customer, items };
}

async function buildCatalog(lang) {
  const products = await getProducts();

  return {
    ...getPageText(lang),
    products: products.map((product) => ({
      id: product.id,
      name_de: product.name_de,
      name_en: product.name_en,
      cat_de: product.cat_de,
      cat_en: product.cat_en,
      price: product.price,
      desc_de: product.desc_de,
      desc_en: product.desc_en,
      color: product.color,
      media: {
        objectName: product.object_name,
        type: 'image/svg+xml'
      }
    }))
  };
}

app.get('/health', async (_req, res) => {
  const [databaseReady, redisReady, storageReady] = await Promise.all([
    ensureDatabase().then(() => pingDatabase()),
    pingRedis(),
    ensureStorage()
  ]);

  const ok = databaseReady && redisReady && storageReady;

  res.status(ok ? 200 : 503).json({
    status: ok ? 'ok' : 'degraded',
    service: serviceName,
    database: getDatabaseStatus(),
    redis: getRedisStatus(),
    storage: getStorageStatus()
  });
});

app.get('/catalog', async (req, res) => {
  await Promise.all([ensureDatabase(), ensureStorage()]);

  const lang = langFrom(req);
  const cacheKey = `shop:catalog:${lang}`;
  const cached = await getJson(cacheKey);
  if (cached) {
    return res.json({ ...cached, source: 'redis' });
  }

  const catalog = await buildCatalog(lang);
  await setJson(cacheKey, catalog, Number(process.env.CATALOG_CACHE_SECONDS || 120));
  return res.json({ ...catalog, source: 'mysql' });
});

app.post('/orders', async (req, res, next) => {
  try {
    const lang = langFrom(req);
    const { customer, items } = validateOrder(req.body);
    const result = await createOrder({ customer, items, lang });
    await deleteKey('shop:catalog:de');
    await deleteKey('shop:catalog:en');

    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

app.get(/^\/media\/(.+)$/, async (req, res, next) => {
  try {
    const objectName = objectNameFrom(req);
    if (!objectName) {
      return res.status(400).json({ message: 'Missing object name.' });
    }

    const stat = await statObject(objectName);
    res.setHeader('Content-Type', stat.metaData['content-type'] || 'application/octet-stream');
    res.setHeader('Cache-Control', stat.metaData['cache-control'] || 'public, max-age=300');
    res.setHeader('Content-Length', stat.size);

    const stream = await getObjectStream(objectName);
    stream.on('error', next);
    return stream.pipe(res);
  } catch (err) {
    if (err.code === 'NotFound' || err.code === 'NoSuchKey') {
      return res.status(404).json({ message: 'Media object not found.' });
    }

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
    message: statusCode >= 500 ? 'Unexpected shop-service error.' : err.message
  });
});

Promise.all([ensureDatabase(), ensureStorage(), pingRedis()]).then(([databaseReady, storageReady, redisReady]) => {
  if (!databaseReady || !storageReady || !redisReady) {
    console.warn(`${serviceName} started before all dependencies were ready; requests will retry.`);
  }
});

app.listen(port, () => {
  console.log(`${serviceName} listening on ${port}`);
});
