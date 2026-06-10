function summarizeBooking(booking) {
  if (!booking) return null;

  return {
    durations: (booking.durations || []).map((item) => ({
      id: item.id,
      label: item.label,
      nights: item.nights,
      price: item.price
    })),
    rooms: (booking.rooms || []).map((item) => ({
      id: item.id,
      label: item.label,
      pricePerNight: item.pricePerNight,
      description: item.desc
    })),
    treatments: (booking.treatments || []).map((item) => ({
      id: item.id,
      label: item.label,
      price: item.price,
      description: item.desc
    })),
    extras: (booking.extras || []).map((item) => ({
      id: item.id,
      label: item.label,
      price: item.price || 0,
      pricePerNight: item.pricePerNight || 0,
      description: item.desc
    }))
  };
}

function summarizeShop(shop) {
  if (!shop) return null;

  return {
    products: (shop.products || []).slice(0, 12).map((item) => ({
      name: item.name_en || item.name_de,
      category: item.cat_en || item.cat_de,
      price: item.price,
      description: item.desc_en || item.desc_de
    }))
  };
}

function summarizeImpressions(impressions) {
  if (!impressions) return null;

  return {
    categories: impressions.categories || [],
    highlights: (impressions.items || []).slice(0, 9).map((item) => item.label_en || item.label_de),
    videos: (impressions.videos || []).map((item) => item.title_en || item.title_de)
  };
}

function buildResortContext(resortData) {
  return {
    resort: {
      name: 'Serenity Wellness Resort',
      location: 'Oberstdorf, Allgaeu',
      focus: [
        'spa and wellness',
        'Ayurveda and massage',
        'yoga and meditation',
        'thermal pools and sauna rituals',
        'alpine nature experiences',
        'regional wellness products'
      ]
    },
    booking: summarizeBooking(resortData.booking),
    shop: summarizeShop(resortData.shop),
    impressions: summarizeImpressions(resortData.impressions)
  };
}

module.exports = {
  buildResortContext
};
