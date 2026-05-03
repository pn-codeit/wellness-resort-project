const content = require('../data/content');

const SERVICE_TIMEOUT_MS = Number(process.env.SERVICE_TIMEOUT_MS || 2500);
const ASSISTANT_TIMEOUT_MS = Number(process.env.ASSISTANT_TIMEOUT_MS || 10000);

const serviceUrls = {
  booking: process.env.BOOKING_SERVICE_URL,
  shop: process.env.SHOP_SERVICE_URL,
  impressions: process.env.IMPRESSIONS_SERVICE_URL,
  assistant: process.env.ASSISTANT_SERVICE_URL
};

async function requestJson(url, options = {}) {
  if (!url) return null;

  const controller = new AbortController();
  const timeoutMs = options.timeoutMs || SERVICE_TIMEOUT_MS;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const { timeoutMs: _timeoutMs, ...fetchOptions } = options;

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(fetchOptions.body ? { 'Content-Type': 'application/json' } : {}),
        ...(fetchOptions.headers || {})
      }
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (_err) {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function postJsonStrict(url, payload) {
  if (!url) {
    throw new Error('Required backend service URL is not configured.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SERVICE_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(body.message || `Backend service returned ${res.status}.`);
    }

    return body;
  } finally {
    clearTimeout(timeout);
  }
}

async function getBookingOptions(lang) {
  const remote = await requestJson(`${serviceUrls.booking}/options?lang=${lang}`);
  return remote || content.booking[lang];
}

async function createBooking(payload) {
  return postJsonStrict(`${serviceUrls.booking}/bookings`, payload);
}

async function getShopCatalog(lang) {
  const remote = await requestJson(`${serviceUrls.shop}/catalog?lang=${lang}`);
  const base = content.shop[lang];
  const data = remote || { ...base, products: content.products };

  return {
    ...data,
    products: data.products.map((product) => ({
      ...product,
      mediaUrl: product.media && product.media.objectName
        ? `/shop/media/${encodeURIComponent(product.media.objectName)}`
        : null
    }))
  };
}

async function createOrder(payload) {
  const remote = await requestJson(`${serviceUrls.shop}/orders`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return remote || { reference: `OR-${Date.now()}` };
}

async function getShopMedia(objectName) {
  if (!serviceUrls.shop || !objectName) return null;

  try {
    const res = await fetch(`${serviceUrls.shop}/media/${encodeURIComponent(objectName)}`, {
      headers: {
        Accept: '*/*'
      }
    });

    if (!res.ok) return null;
    return res;
  } catch (_err) {
    return null;
  }
}

async function getImpressions(lang) {
  const remote = await requestJson(`${serviceUrls.impressions}/impressions?lang=${lang}`);
  const base = content.impressions[lang];
  const data = remote || { ...base, items: content.galleryItems, videos: content.videos };

  return {
    ...data,
    items: data.items.map((item) => ({
      ...item,
      mediaUrl: item.media && item.media.objectName
        ? `/impressions/media/${encodeURIComponent(item.media.objectName)}`
        : null
    }))
  };
}

async function getImpressionMedia(objectName) {
  if (!serviceUrls.impressions || !objectName) return null;

  try {
    const res = await fetch(`${serviceUrls.impressions}/media/${encodeURIComponent(objectName)}`, {
      headers: {
        Accept: '*/*'
      }
    });

    if (!res.ok) return null;
    return res;
  } catch (_err) {
    return null;
  }
}

function wmoToCondition(code) {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Clouds';
  if (code <= 49) return 'Mist';
  if (code <= 59) return 'Drizzle';
  if (code <= 69) return 'Rain';
  if (code <= 79) return 'Snow';
  if (code <= 82) return 'Rain';
  if (code <= 84) return 'Snow';
  return 'Thunderstorm';
}

function wmoToDesc(code, lang) {
  if (lang === 'de') {
    if (code === 0) return 'Klarer Himmel';
    if (code <= 3) return code === 1 ? 'Überwiegend klar' : code === 2 ? 'Teilweise bewölkt' : 'Bedeckt';
    if (code <= 49) return 'Neblig';
    if (code <= 59) return 'Nieselregen';
    if (code <= 69) return code <= 63 ? 'Leichter Regen' : 'Starker Regen';
    if (code <= 79) return 'Schneefall';
    if (code <= 82) return 'Regenschauer';
    return 'Gewitter';
  }

  if (code === 0) return 'Clear Sky';
  if (code <= 3) return code === 1 ? 'Mainly Clear' : code === 2 ? 'Partly Cloudy' : 'Overcast';
  if (code <= 49) return 'Foggy';
  if (code <= 59) return 'Drizzle';
  if (code <= 69) return code <= 63 ? 'Light Rain' : 'Heavy Rain';
  if (code <= 79) return 'Snowfall';
  if (code <= 82) return 'Rain Showers';
  return 'Thunderstorm';
}

function fallbackWeather(lang) {
  return {
    ...content.weatherText[lang],
    current: {
      temp: 12,
      feels: 11,
      humidity: 74,
      wind: 8,
      pressure: 1014,
      condition: 'Clouds',
      description: lang === 'de' ? 'Teilweise bewölkt' : 'Partly Cloudy',
      sunrise: '06:02',
      sunset: '20:18'
    },
    forecast: [0, 1, 2, 3, 4].map((day) => ({
      time: new Date(Date.now() + day * 86400000).toISOString().slice(0, 10),
      condition: day === 0 ? 'Clouds' : 'Clear',
      description: day === 0 ? (lang === 'de' ? 'Teilweise bewölkt' : 'Partly Cloudy') : (lang === 'de' ? 'Klarer Himmel' : 'Clear Sky'),
      max: 14 + day,
      min: 5 + day
    })),
    source: 'fallback'
  };
}

async function getWeather(lang) {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=47.41&longitude=10.28&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=5';
  const data = await requestJson(url);

  if (!data || !data.current || !data.daily) {
    return fallbackWeather(lang);
  }

  const c = data.current;
  const d = data.daily;

  return {
    ...content.weatherText[lang],
    current: {
      temp: Math.round(c.temperature_2m),
      feels: Math.round(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      wind: Math.round(c.wind_speed_10m),
      pressure: Math.round(c.surface_pressure),
      condition: wmoToCondition(c.weather_code),
      description: wmoToDesc(c.weather_code, lang),
      sunrise: new Date(d.sunrise[0]).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      sunset: new Date(d.sunset[0]).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    },
    forecast: d.time.map((time, i) => ({
      time,
      condition: wmoToCondition(d.weather_code[i]),
      description: wmoToDesc(d.weather_code[i], lang),
      max: Math.round(d.temperature_2m_max[i]),
      min: Math.round(d.temperature_2m_min[i])
    })),
    source: 'open-meteo'
  };
}

function localAdvice(input, lang) {
  const lower = input.toLowerCase();
  const stress = /stress|burn|schlaf|ausgebrannt|ruhe|sleep/.test(lower);
  const pain = /rücken|nacken|pain|back|neck|verspann/.test(lower);
  const romance = /hochzeit|romant|anniversary|romance/.test(lower);

  if (lang === 'de') {
    if (romance) {
      return {
        greeting: 'Das klingt nach einem besonderen Anlass, der Ruhe und kleine Rituale verdient.',
        recommendation: {
          duration: 'Wochenende',
          treatments: ['Ayurveda Abhyanga', 'Sauna-Ritual'],
          room: 'Wellness-Penthouse',
          extras: ['Blumenarrangement', 'Weinpaket', 'Halbpension'],
          reasoning: 'Das Penthouse gibt Ihnen viel Privatsphäre, während Ayurveda und Sauna den Aufenthalt entschleunigen. Die Extras setzen bewusst romantische Akzente.',
          total_price: 'ca. 1.070 €'
        }
      };
    }

    return {
      greeting: stress
        ? 'Ihre Beschreibung klingt nach einem Bedürfnis nach echter Entlastung und planbarer Ruhe.'
        : 'Auf Basis Ihrer Wünsche passt ein balancierter Aufenthalt mit Erholung und sanfter Aktivierung.',
      recommendation: {
        duration: pain ? '4 Nächte' : '1 Woche',
        treatments: pain ? ['Klassische Massage', 'Fango-Packung', 'Kneipp-Therapie'] : ['Yoga-Paket', 'Ayurveda Abhyanga', 'Sauna-Ritual'],
        room: 'Superior Suite',
        extras: ['Frühstücksbuffet', 'Geführte Wanderung'],
        reasoning: pain
          ? 'Wärme, Massage und Wasseranwendungen lösen Verspannungen gezielt, ohne den Aufenthalt zu überladen.'
          : 'Yoga, Ayurveda und Sauna unterstützen Regeneration, Schlaf und einen ruhigeren Tagesrhythmus.',
        total_price: pain ? 'ca. 1.255 €' : 'ca. 2.112 €'
      }
    };
  }

  return {
    greeting: stress
      ? 'Your description points to a need for real relief and protected quiet time.'
      : 'Based on your wishes, a balanced stay with recovery and gentle activation fits well.',
    recommendation: {
      duration: pain ? '4 Nights' : '1 Week',
      treatments: pain ? ['Classic Massage', 'Fango Pack', 'Kneipp Therapy'] : ['Yoga Package', 'Ayurveda Abhyanga', 'Sauna Ritual'],
      room: 'Superior Suite',
      extras: ['Breakfast Buffet', 'Guided Hike'],
      reasoning: pain
        ? 'Heat, massage and water therapy target tension without overloading your schedule.'
        : 'Yoga, Ayurveda and sauna rituals support recovery, better sleep and a calmer rhythm.',
      total_price: pain ? 'approx. 1,255 €' : 'approx. 2,112 €'
    }
  };
}

async function getAssistantAdvice(payload) {
  const remote = await requestJson(`${serviceUrls.assistant}/advice`, {
    method: 'POST',
    body: JSON.stringify(payload),
    timeoutMs: ASSISTANT_TIMEOUT_MS
  });

  return remote || localAdvice(payload.input, payload.lang);
}

module.exports = {
  getBookingOptions,
  createBooking,
  getShopCatalog,
  createOrder,
  getShopMedia,
  getImpressions,
  getImpressionMedia,
  getWeather,
  getAssistantAdvice
};
