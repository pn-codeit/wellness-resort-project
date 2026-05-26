const express = require('express');
const content = require('../data/content');
const serviceClients = require('../services/serviceClients');

const router = express.Router();

function getLang(req) {
  return req.body.lang === 'en' || req.query.lang === 'en' ? 'en' : 'de';
}

function normalizeLabel(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function findOptionId(options, label) {
  const normalizedLabel = normalizeLabel(label);
  if (!normalizedLabel) return null;

  const exact = (options || []).find((item) => normalizeLabel(item.label) === normalizedLabel);
  if (exact) return exact.id;

  const partial = (options || []).find((item) => {
    const optionLabel = normalizeLabel(item.label);
    return optionLabel && (normalizedLabel.includes(optionLabel) || optionLabel.includes(normalizedLabel));
  });

  return partial ? partial.id : null;
}

function findDurationNights(durations, label) {
  const id = findOptionId(durations, label);
  const byId = (durations || []).find((item) => item.id === id);
  if (byId) return byId.nights;

  const numeric = String(label || '').match(/\d+/);
  return numeric ? Number(numeric[0]) : null;
}

function buildConfiguratorUrl(lang, recommendation, bookingOptions) {
  const params = new URLSearchParams({ lang });
  const roomId = findOptionId(bookingOptions.rooms, recommendation.room);
  const nights = findDurationNights(bookingOptions.durations, recommendation.duration);
  const treatmentIds = (recommendation.treatments || [])
    .map((label) => findOptionId(bookingOptions.treatments, label))
    .filter(Boolean);
  const extraIds = (recommendation.extras || [])
    .map((label) => findOptionId(bookingOptions.extras, label))
    .filter(Boolean);

  if (roomId) params.set('room', roomId);
  if (nights) params.set('nights', String(nights));
  treatmentIds.forEach((id) => params.append('treatments', id));
  extraIds.forEach((id) => params.append('extras', id));

  return `/configurator?${params.toString()}`;
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
    let advice = input ? await serviceClients.getAssistantAdvice({ input, lang }) : null;

    if (advice && advice.recommendation) {
      const bookingOptions = await serviceClients.getBookingOptions(lang);
      advice = {
        ...advice,
        configuratorUrl: buildConfiguratorUrl(lang, advice.recommendation, bookingOptions)
      };
    }

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
