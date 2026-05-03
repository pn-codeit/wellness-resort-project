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

router.get('/', async (req, res, next) => {
  try {
    const lang = getLang(req);
    render(res, 'home', {
      page: 'home',
      lang,
      title: 'Serenity Resort',
      home: content.home[lang]
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
      booking: data
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
