const SERVICE_TIMEOUT_MS = Number(process.env.SERVICE_TIMEOUT_MS || 2500);

const serviceUrls = {
  booking: process.env.BOOKING_SERVICE_URL,
  shop: process.env.SHOP_SERVICE_URL,
  impressions: process.env.IMPRESSIONS_SERVICE_URL
};

async function requestJson(url) {
  if (!url) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SERVICE_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (_err) {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchResortData(lang) {
  const queryLang = lang === 'en' ? 'en' : 'de';
  const [booking, shop, impressions] = await Promise.all([
    requestJson(`${serviceUrls.booking}/options?lang=${queryLang}`),
    requestJson(`${serviceUrls.shop}/catalog?lang=${queryLang}`),
    requestJson(`${serviceUrls.impressions}/impressions?lang=${queryLang}`)
  ]);

  return {
    booking,
    shop,
    impressions,
    sources: {
      booking: Boolean(booking),
      shop: Boolean(shop),
      impressions: Boolean(impressions)
    }
  };
}

module.exports = {
  fetchResortData
};
