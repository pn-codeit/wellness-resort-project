const Minio = require('minio');
const { seedProducts } = require('../data/catalog');

const bucketName = process.env.MINIO_SHOP_BUCKET || 'wellness-shop';
const endpoint = new URL(process.env.MINIO_ENDPOINT || 'http://localhost:9000');
const client = new Minio.Client({
  endPoint: endpoint.hostname,
  port: Number(endpoint.port || (endpoint.protocol === 'https:' ? 443 : 80)),
  useSSL: endpoint.protocol === 'https:',
  accessKey: process.env.MINIO_ROOT_USER || process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_ROOT_PASSWORD || process.env.MINIO_SECRET_KEY || 'minioadmin'
});

let ready = false;
let lastError = null;
let initializing = null;

function productSvg(product) {
  const title = product.name_en.replace(/&/g, 'and');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 620" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fffaf0"/>
      <stop offset="100%" stop-color="${product.color}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="28" stdDeviation="18" flood-color="#16352f" flood-opacity="0.24"/>
    </filter>
  </defs>
  <rect width="900" height="620" fill="url(#bg)"/>
  <circle cx="720" cy="130" r="86" fill="#ffffff" opacity="0.42"/>
  <circle cx="165" cy="480" r="126" fill="#ffffff" opacity="0.28"/>
  <g filter="url(#shadow)">
    <rect x="318" y="206" width="264" height="282" rx="38" fill="#fffaf0"/>
    <rect x="352" y="134" width="196" height="116" rx="28" fill="${product.color}"/>
    <rect x="384" y="96" width="132" height="58" rx="16" fill="#f6ead7"/>
    <circle cx="450" cy="344" r="74" fill="${product.color}" opacity="0.75"/>
    <path d="M414 348 C436 302 486 302 508 348 C488 386 438 386 414 348 Z" fill="#fffaf0" opacity="0.8"/>
  </g>
  <rect x="62" y="488" width="776" height="74" rx="8" fill="#14332e" opacity="0.72"/>
  <text x="94" y="537" font-family="Georgia, serif" font-size="38" fill="#fffaf0">${title}</text>
</svg>`;
}

async function ensureBucket() {
  const exists = await client.bucketExists(bucketName);
  if (!exists) {
    await client.makeBucket(bucketName);
  }
}

async function objectExists(objectName) {
  try {
    await client.statObject(bucketName, objectName);
    return true;
  } catch (_err) {
    return false;
  }
}

async function seedProductObjects() {
  await Promise.all(seedProducts.map(async (product) => {
    if (await objectExists(product.object_name)) return;

    const body = Buffer.from(productSvg(product), 'utf8');
    await client.putObject(bucketName, product.object_name, body, body.length, {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    });
  }));
}

async function ensureStorage() {
  if (ready) return true;
  if (initializing) return initializing;

  initializing = (async () => {
    try {
      await ensureBucket();
      await seedProductObjects();
      ready = true;
      lastError = null;
      return true;
    } catch (err) {
      ready = false;
      lastError = err;
      return false;
    } finally {
      initializing = null;
    }
  })();

  return initializing;
}

async function statObject(objectName) {
  await ensureStorage();
  return client.statObject(bucketName, objectName);
}

async function getObjectStream(objectName) {
  await ensureStorage();
  return client.getObject(bucketName, objectName);
}

function getStorageStatus() {
  return {
    bucket: bucketName,
    ready,
    error: lastError ? lastError.message : null
  };
}

module.exports = {
  ensureStorage,
  getObjectStream,
  getStorageStatus,
  statObject
};
