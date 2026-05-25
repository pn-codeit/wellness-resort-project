const Minio = require('minio');
const { galleryItems } = require('../data/impressions');

const bucketName = process.env.MINIO_BUCKET || 'wellness-impressions';
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

function svgFor(item) {
  const title = item.label_en.replace(/&/g, 'and');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${item.color1}"/>
      <stop offset="100%" stop-color="${item.color2}"/>
    </linearGradient>
    <filter id="soft">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <rect width="1200" height="800" fill="url(#sky)"/>
  <circle cx="930" cy="150" r="86" fill="#fff7dc" opacity="0.74"/>
  <path d="M0 570 C170 455 275 468 405 548 C535 628 690 650 842 552 C1010 444 1115 482 1200 390 L1200 800 L0 800 Z" fill="#203f37" opacity="0.62"/>
  <path d="M0 660 C210 575 346 604 505 671 C700 753 854 664 960 604 C1068 543 1130 546 1200 570 L1200 800 L0 800 Z" fill="#f7f2e8" opacity="0.82"/>
  <path d="M130 205 C250 120 360 120 470 208 C570 288 660 268 760 188 C850 115 980 118 1095 222" fill="none" stroke="#ffffff" stroke-width="34" stroke-linecap="round" opacity="0.38" filter="url(#soft)"/>
  <rect x="76" y="596" width="490" height="90" rx="8" fill="#10231f" opacity="0.52"/>
  <text x="116" y="654" font-family="Georgia, serif" font-size="42" fill="#fffaf0">${title}</text>
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

async function seedGalleryObjects() {
  await Promise.all(galleryItems.map(async (item) => {
    if (await objectExists(item.objectName)) return;

    const body = Buffer.from(svgFor(item), 'utf8');
    await client.putObject(bucketName, item.objectName, body, body.length, {
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
      await seedGalleryObjects();
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

async function getObjectStream(objectName) {
  await ensureStorage();
  return client.getObject(bucketName, objectName);
}

async function statObject(objectName) {
  await ensureStorage();
  return client.statObject(bucketName, objectName);
}

async function putMediaObject({ objectName, buffer, contentType }) {
  await ensureStorage();
  await client.putObject(bucketName, objectName, buffer, buffer.length, {
    'Content-Type': contentType,
    'Cache-Control': 'public, max-age=86400'
  });
}

function getStorageStatus() {
  return {
    bucket: bucketName,
    ready,
    error: lastError ? lastError.message : null
  };
}

module.exports = {
  bucketName,
  ensureStorage,
  getObjectStream,
  getStorageStatus,
  putMediaObject,
  statObject
};
