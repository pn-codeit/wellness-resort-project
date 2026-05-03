const express = require('express');
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
