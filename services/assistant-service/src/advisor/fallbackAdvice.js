function pickLabels(items, ids, fallbackById = {}) {
  const byId = new Map((items || []).map((item) => [item.id, item]));
  return ids
    .map((id) => {
      const item = byId.get(id);
      return item ? item.label : fallbackById[id];
    })
    .filter(Boolean);
}

function labelOf(items, id, fallback) {
  const found = (items || []).find((item) => item.id === id);
  return found ? found.label : fallback;
}

function estimateTotal(context, selection) {
  const booking = context.booking || {};
  const duration = (booking.durations || []).find((item) => item.id === selection.durationId);
  const room = (booking.rooms || []).find((item) => item.id === selection.roomId);
  const treatmentIds = new Set(selection.treatmentIds);
  const extraIds = new Set(selection.extraIds);

  if (!duration) return null;

  const treatmentTotal = (booking.treatments || [])
    .filter((item) => treatmentIds.has(item.id))
    .reduce((sum, item) => sum + Number(item.price || 0), 0);
  const extrasTotal = (booking.extras || [])
    .filter((item) => extraIds.has(item.id))
    .reduce((sum, item) => sum + Number(item.price || 0) + Number(item.pricePerNight || 0) * duration.nights, 0);
  const roomTotal = Number(room ? room.pricePerNight || 0 : 0) * duration.nights;

  return Number((Number(duration.price || 0) + roomTotal + treatmentTotal + extrasTotal).toFixed(2));
}

function focusAreasFor(type, lang) {
  const values = {
    stress: {
      de: ['Schlaf', 'Stressabbau', 'ruhiger Rhythmus'],
      en: ['Sleep', 'stress relief', 'calm rhythm']
    },
    pain: {
      de: ['Verspannungen', 'Wärme', 'sanfte Bewegung'],
      en: ['Tension', 'heat', 'gentle movement']
    },
    romance: {
      de: ['Privatsphäre', 'Rituale', 'gemeinsame Zeit'],
      en: ['Privacy', 'rituals', 'time together']
    },
    detox: {
      de: ['Energie', 'leichte Aktivierung', 'Natur'],
      en: ['Energy', 'light activation', 'nature']
    },
    balance: {
      de: ['Erholung', 'Bewegung', 'Wellness'],
      en: ['Recovery', 'movement', 'wellness']
    }
  };

  return values[type][lang === 'en' ? 'en' : 'de'];
}

function scheduleFor(type, lang) {
  const values = {
    stress: {
      de: ['Ankommen mit Sauna-Ritual und früher Ruhezeit.', 'Yoga und Ayurveda mit viel Abstand zwischen den Terminen.', 'Geführte Wanderung als leichter Abschluss in der Natur.'],
      en: ['Arrive with a sauna ritual and early quiet time.', 'Yoga and Ayurveda with enough space between appointments.', 'Finish with a guided hike as gentle time in nature.']
    },
    pain: {
      de: ['Start mit Wärme und Fango, damit der Körper loslassen kann.', 'Massage als zentraler Behandlungstermin am zweiten Tag.', 'Kneipp-Anwendung und kurze Spaziergänge zur sanften Mobilisierung.'],
      en: ['Start with heat and fango so the body can settle.', 'Use the massage as the central treatment on day two.', 'Add Kneipp therapy and short walks for gentle mobility.']
    },
    romance: {
      de: ['Private Anreise mit Blumen und ruhigem Abendessen.', 'Ayurveda und Sauna als gemeinsames Wellness-Ritual.', 'Freier Vormittag ohne Programm vor der Abreise.'],
      en: ['Private arrival with flowers and a quiet dinner.', 'Ayurveda and sauna as a shared wellness ritual.', 'Keep the last morning open before departure.']
    },
    detox: {
      de: ['Leichter Start mit Yoga und viel Wasserzeit.', 'Ayurveda und Kneipp zur Aktivierung ohne Überladung.', 'Wanderung als frischer Abschluss mit Bewegung an der Luft.'],
      en: ['Start lightly with yoga and plenty of water time.', 'Use Ayurveda and Kneipp for activation without overload.', 'End with a guided hike and fresh outdoor movement.']
    },
    balance: {
      de: ['Ruhig ankommen und den ersten Abend bewusst frei halten.', 'Wellness-Behandlungen und Yoga im Wechsel planen.', 'Naturzeit als Abschluss, damit der Aufenthalt nicht nur indoor stattfindet.'],
      en: ['Arrive calmly and keep the first evening open.', 'Alternate wellness treatments with yoga.', 'Close with time in nature so the stay is not only indoors.']
    }
  };

  return values[type][lang === 'en' ? 'en' : 'de'];
}

function fallbackLabels(lang) {
  if (lang === 'en') {
    return {
      treatments: {
        massage: 'Classic Massage',
        ayurveda: 'Ayurveda Abhyanga',
        fango: 'Fango Pack',
        yoga: 'Yoga Package',
        sauna: 'Sauna Ritual',
        kneipp: 'Kneipp Therapy'
      },
      extras: {
        breakfast: 'Breakfast Buffet',
        dinner: 'Half Board',
        flowers: 'Flower Arrangement',
        wine: 'Wine Package',
        hiking: 'Guided Hike'
      }
    };
  }

  return {
    treatments: {
      massage: 'Klassische Massage',
      ayurveda: 'Ayurveda Abhyanga',
      fango: 'Fango-Packung',
      yoga: 'Yoga-Paket',
      sauna: 'Sauna-Ritual',
      kneipp: 'Kneipp-Therapie'
    },
    extras: {
        breakfast: 'Frühstücksbuffet',
      dinner: 'Halbpension',
      flowers: 'Blumenarrangement',
      wine: 'Weinpaket',
        hiking: 'Geführte Wanderung'
    }
  };
}

function buildFallbackAdvice({ input, lang, context }) {
  const lower = input.toLowerCase();
  const stress = /stress|burn|sleep|schlaf|ausgebrannt|ruhe|tired|mued|mude/.test(lower);
  const pain = /back|neck|pain|ruecken|rucken|nacken|verspann/.test(lower);
  const romance = /romant|anniversary|hochzeit|jahrestag|partner/.test(lower);
  const detox = /detox|clean|reinig|energy|energie/.test(lower);
  const type = romance ? 'romance' : pain ? 'pain' : detox ? 'detox' : stress ? 'stress' : 'balance';

  const selection = romance
    ? { durationId: 'weekend', roomId: 'penthouse', treatmentIds: ['ayurveda', 'sauna'], extraIds: ['flowers', 'wine', 'dinner'] }
    : pain
      ? { durationId: 'midweek', roomId: 'superior', treatmentIds: ['massage', 'fango', 'kneipp'], extraIds: ['breakfast'] }
      : detox
        ? { durationId: 'week', roomId: 'standard', treatmentIds: ['yoga', 'ayurveda', 'kneipp'], extraIds: ['breakfast', 'hiking'] }
        : { durationId: stress ? 'week' : 'midweek', roomId: 'superior', treatmentIds: ['yoga', 'ayurveda', 'sauna'], extraIds: ['breakfast', 'hiking'] };

  const booking = context.booking || {};
  const labels = fallbackLabels(lang);
  const total = estimateTotal(context, selection);
  const money = total === null
    ? (lang === 'en' ? 'available in the configurator' : 'im Konfigurator verfügbar')
    : (lang === 'en' ? `approx. ${total.toLocaleString('en-US')} EUR` : `ca. ${total.toLocaleString('de-DE')} EUR`);

  if (lang === 'en') {
    return {
      greeting: romance
        ? 'That sounds like a stay where privacy, rituals and a slower rhythm matter most.'
        : 'Based on your description, I would keep the stay calm, structured and focused on recovery.',
      recommendation: {
        duration: labelOf(booking.durations, selection.durationId, '4 Nights'),
        treatments: pickLabels(booking.treatments, selection.treatmentIds, labels.treatments),
        room: labelOf(booking.rooms, selection.roomId, 'Superior Suite'),
        extras: pickLabels(booking.extras, selection.extraIds, labels.extras),
        focus_areas: focusAreasFor(type, lang),
        schedule: scheduleFor(type, lang),
        reasoning: pain
          ? 'Massage, heat and Kneipp therapy address tension directly while leaving enough quiet time between sessions.'
          : romance
            ? 'The private room setting and small arrival extras make the stay feel personal without making the schedule too full.'
            : 'Yoga, Ayurveda and sauna rituals support sleep, stress relief and a more grounded daily rhythm.',
        total_price: money
      },
      source: 'fallback'
    };
  }

  return {
    greeting: romance
      ? 'Das klingt nach einem Aufenthalt, bei dem Privatsphäre, Rituale und ein ruhiger Rhythmus wichtig sind.'
      : 'Nach Ihrer Beschreibung würde ich den Aufenthalt ruhig, klar strukturiert und erholungsorientiert planen.',
    recommendation: {
      duration: labelOf(booking.durations, selection.durationId, '4 Nächte'),
      treatments: pickLabels(booking.treatments, selection.treatmentIds, labels.treatments),
      room: labelOf(booking.rooms, selection.roomId, 'Superior Suite'),
      extras: pickLabels(booking.extras, selection.extraIds, labels.extras),
      focus_areas: focusAreasFor(type, lang),
      schedule: scheduleFor(type, lang),
      reasoning: pain
        ? 'Massage, Wärme und Kneipp-Anwendungen sprechen Verspannungen gezielt an und lassen trotzdem genug Ruhe zwischen den Terminen.'
        : romance
          ? 'Das private Zimmer und kleine Extras zur Anreise machen den Aufenthalt persönlich, ohne den Zeitplan zu überladen.'
          : 'Yoga, Ayurveda und Sauna-Rituale unterstützen Schlaf, Stressabbau und einen ruhigeren Tagesrhythmus.',
      total_price: money
    },
    source: 'fallback'
  };
}

module.exports = {
  buildFallbackAdvice
};
