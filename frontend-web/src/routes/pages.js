const express = require('express');
const { Readable } = require('stream');
const content = require('../data/content');
const serviceClients = require('../services/serviceClients');

const router = express.Router();

function getLang(req) {
  return req.query.lang === 'en' ? 'en' : 'de';
}

function render(res, view, options) {
  res.render(view, {
    ...options,
    navItems: content.navItems[options.lang],
    langSwitch: options.lang === 'de' ? 'en' : 'de'
  });
}

const MINIO_PUBLIC_URL = process.env.MINIO_PUBLIC_URL || 'http://localhost:9000';
const HERO_SLIDES = [
  'Bar-S.png', 'Building.png', 'entrance.png', 'Recep.png',
  'Ruhebereich.png', 'Spashop.png', 'view.png'
].map((f) => `${MINIO_PUBLIC_URL}/wellness-homepage/${f}`);

const ROOM_IMAGES = {
  standard:  [
    { file: 'Panorama zimmer.png',         de: 'Zimmer',        en: 'Room' },
    { file: 'badezimmer_panorama.png',     de: 'Badezimmer',    en: 'Bathroom' },
    { file: 'balkon-panorama.png',         de: 'Balkon',        en: 'Balcony' }
  ],
  superior:  [
    { file: 'superior suite.jpg',          de: 'Zimmer',        en: 'Room' },
    { file: 'bathroom_suit.png',           de: 'Badezimmer',    en: 'Bathroom' },
    { file: 'balcon-suit.png',             de: 'Balkon',        en: 'Balcony' }
  ],
  penthouse: [
    { file: 'wellness penthouse.jpg',      de: 'Zimmer',        en: 'Room' },
    { file: 'room_penthouse.png',          de: 'Zimmeransicht', en: 'Room View' },
    { file: 'badezimmmer_penthouse.png',   de: 'Badezimmer',    en: 'Bathroom' }
  ],
  family:    [
    { file: 'family zimmer.jpg',           de: 'Zimmer',        en: 'Room' },
    { file: 'badezimmer_familyzimmer.png', de: 'Badezimmer',    en: 'Bathroom' },
    { file: 'balkon_familyzimmer.png',     de: 'Balkon',        en: 'Balcony' }
  ]
};
const roomImages = Object.fromEntries(
  Object.entries(ROOM_IMAGES).map(([id, imgs]) => [
    id,
    imgs.map((img) => ({
      url: `${MINIO_PUBLIC_URL}/wellness-configurator/${encodeURIComponent(img.file)}`,
      de:  img.de,
      en:  img.en
    }))
  ])
);

router.get('/', async (req, res, next) => {
  try {
    const lang = getLang(req);
    render(res, 'home', {
      page: 'home',
      lang,
      title: 'Serenity Resort',
      home: content.home[lang],
      heroSlides: HERO_SLIDES
    });
  } catch (err) {
    next(err);
  }
});

router.get('/configurator', async (req, res, next) => {
  try {
    const lang = getLang(req);
    const data = await serviceClients.getBookingOptions(lang);
    render(res, 'configurator', {
      page: 'configurator',
      lang,
      title: data.title,
      booking: data,
      roomImages
    });
  } catch (err) {
    next(err);
  }
});

router.get('/shop', async (req, res, next) => {
  try {
    const lang = getLang(req);
    const data = await serviceClients.getShopCatalog(lang);
    render(res, 'shop', {
      page: 'shop',
      lang,
      title: data.title,
      shop: data
    });
  } catch (err) {
    next(err);
  }
});

router.get(/^\/shop\/media\/(.+)$/, async (req, res, next) => {
  try {
    const objectName = decodeURIComponent(req.params[0] || '');
    const media = await serviceClients.getShopMedia(objectName);

    if (!media) {
      return res.status(404).send('Media not found');
    }

    const contentType = media.headers.get('content-type');
    const cacheControl = media.headers.get('cache-control');
    const contentLength = media.headers.get('content-length');

    if (contentType) res.setHeader('Content-Type', contentType);
    if (cacheControl) res.setHeader('Cache-Control', cacheControl);
    if (contentLength) res.setHeader('Content-Length', contentLength);

    return Readable.fromWeb(media.body).pipe(res);
  } catch (err) {
    return next(err);
  }
});

router.get('/impressions', async (req, res, next) => {
  try {
    const lang = getLang(req);
    const data = await serviceClients.getImpressions(lang);
    render(res, 'impressions', {
      page: 'impressions',
      lang,
      title: data.title,
      impressions: data
    });
  } catch (err) {
    next(err);
  }
});

router.post('/impressions/upload', async (req, res, next) => {
  try {
    const impressionsUrl = process.env.IMPRESSIONS_SERVICE_URL || 'http://impressions-service:3000';
    const response = await fetch(`${impressionsUrl}/media`, {
      method: 'POST',
      headers: {
        'content-type': req.headers['content-type'],
        'content-length': req.headers['content-length']
      },
      body: req,
      duplex: 'half'
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return next(err);
  }
});

router.get(/^\/impressions\/media\/(.+)$/, async (req, res, next) => {
  try {
    const objectName = decodeURIComponent(req.params[0] || '');
    const media = await serviceClients.getImpressionMedia(objectName);

    if (!media) {
      return res.status(404).send('Media not found');
    }

    const contentType = media.headers.get('content-type');
    const cacheControl = media.headers.get('cache-control');
    const contentLength = media.headers.get('content-length');

    if (contentType) res.setHeader('Content-Type', contentType);
    if (cacheControl) res.setHeader('Cache-Control', cacheControl);
    if (contentLength) res.setHeader('Content-Length', contentLength);

    return Readable.fromWeb(media.body).pipe(res);
  } catch (err) {
    return next(err);
  }
});

router.get('/weather', async (req, res, next) => {
  try {
    const lang = getLang(req);
    const data = await serviceClients.getWeather(lang);
    render(res, 'weather', {
      page: 'weather',
      lang,
      title: data.title,
      weather: data
    });
  } catch (err) {
    next(err);
  }
});

router.get('/assistant', async (req, res, next) => {
  try {
    const lang = getLang(req);
    render(res, 'assistant', {
      page: 'assistant',
      lang,
      title: content.assistant[lang].title,
      assistant: content.assistant[lang],
      advice: null,
      input: '',
      error: null
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
