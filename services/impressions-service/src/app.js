require('dotenv').config();

const express = require('express');
const multer = require('multer');
const { galleryItems, getPageText, videos } = require('./data/impressions');
const {
  ensureStorage,
  getObjectStream,
  getStorageStatus,
  putMediaObject,
  statObject
} = require('./storage/minioClient');

const app = express();
const serviceName = process.env.SERVICE_NAME || 'impressions-service';
const port = Number(process.env.PORT || 3000);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: Number(process.env.MEDIA_UPLOAD_LIMIT_BYTES || 10 * 1024 * 1024)
  }
});

app.use(express.json());

function langFrom(req) {
  return req.query.lang === 'en' ? 'en' : 'de';
}

function objectNameFrom(req) {
  return decodeURIComponent(req.params[0] || '').replace(/^\/+/, '');
}

function safeUploadName(fileName) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

app.get('/health', async (_req, res) => {
  const storageReady = await ensureStorage();

  res.status(storageReady ? 200 : 503).json({
    status: storageReady ? 'ok' : 'degraded',
    service: serviceName,
    storage: getStorageStatus()
  });
});

app.get('/impressions', async (req, res) => {
  await ensureStorage();

  const lang = langFrom(req);
  const items = galleryItems.map((item) => ({
    ...item,
    media: {
      objectName: item.objectName,
      type: 'image/svg+xml'
    }
  }));

  res.json({
    ...getPageText(lang),
    items,
    videos
  });
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

app.post('/media', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'A multipart file field named "file" is required.' });
    }

    if (!/^image\/|^video\//.test(req.file.mimetype)) {
      return res.status(415).json({ message: 'Only image and video uploads are accepted.' });
    }

    const name = safeUploadName(req.file.originalname || 'upload');
    const objectName = `impressions/uploads/${Date.now()}-${name}`;

    await putMediaObject({
      objectName,
      buffer: req.file.buffer,
      contentType: req.file.mimetype
    });

    return res.status(201).json({
      objectName,
      media: {
        objectName,
        type: req.file.mimetype
      }
    });
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
  console.error(err);
  res.status(500).json({
    service: serviceName,
    message: 'Unexpected impressions-service error.'
  });
});

ensureStorage().then((ok) => {
  if (!ok) {
    console.warn(`${serviceName} started before MinIO was ready; storage will retry on requests.`);
  }
});

app.listen(port, () => {
  console.log(`${serviceName} listening on ${port}`);
});
