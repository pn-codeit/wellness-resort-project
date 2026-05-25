const express = require('express');
const content = require('../data/content');
const serviceClients = require('../services/serviceClients');

const router = express.Router();

function getLang(req) {
  return req.body.lang === 'en' || req.query.lang === 'en' ? 'en' : 'de';
}

router.post('/booking', async (req, res, next) => {
  try {
    const lang = getLang(req);
    const result = await serviceClients.createBooking(req.body);
    res.render('success', {
      page: 'configurator',
      lang,
      navItems: content.navItems[lang],
      langSwitch: lang === 'de' ? 'en' : 'de',
      title: lang === 'de' ? 'Buchung eingegangen' : 'Booking received',
      heading: lang === 'de' ? 'Buchung eingegangen' : 'Booking received',
      message: lang === 'de'
        ? 'Vielen Dank für Ihre Buchung. Wir leiten Sie gleich zurück zur Startseite.'
        : 'Thank you for your booking. We will redirect you back to the home page shortly.',
      reference: result.reference,
      redirectUrl: `/?lang=${lang}`,
      redirectDelayMs: 3500,
      redirectLabel: lang === 'de'
        ? 'Sie werden automatisch zurück zum Hauptmenü geleitet.'
        : 'You will be redirected back to the main menu automatically.'
    });
  } catch (err) {
    next(err);
  }
});

router.post('/shop/orders', async (req, res, next) => {
  try {
    const lang = getLang(req);
    const result = await serviceClients.createOrder(req.body);
    res.render('success', {
      page: 'shop',
      lang,
      navItems: content.navItems[lang],
      langSwitch: lang === 'de' ? 'en' : 'de',
      title: lang === 'de' ? 'Bestellung eingegangen' : 'Order received',
      heading: lang === 'de' ? 'Bestellung eingegangen' : 'Order received',
      message: lang === 'de'
        ? 'Vielen Dank für Ihre Bestellung. Sie erhalten in Kürze eine Bestätigung.'
        : 'Thank you for your order. You will receive a confirmation shortly.',
      reference: result.reference
    });
  } catch (err) {
    next(err);
  }
});

router.post('/assistant/advice', async (req, res, next) => {
  try {
    const lang = getLang(req);
    const input = String(req.body.input || '').trim();
    const advice = input ? await serviceClients.getAssistantAdvice({ input, lang }) : null;

    res.render('assistant', {
      page: 'assistant',
      lang,
      navItems: content.navItems[lang],
      langSwitch: lang === 'de' ? 'en' : 'de',
      title: content.assistant[lang].title,
      assistant: content.assistant[lang],
      advice,
      input,
      error: input ? null : (lang === 'de' ? 'Bitte beschreiben Sie kurz Ihre Wünsche.' : 'Please describe your wishes first.')
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
