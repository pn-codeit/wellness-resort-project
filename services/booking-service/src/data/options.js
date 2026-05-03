const pageText = {
  de: {
    title: 'Urlaub konfigurieren',
    subtitle: 'Gestalten Sie Ihren persoenlichen Wellness-Aufenthalt Schritt fuer Schritt.',
    durationTitle: 'Wie lange moechten Sie bleiben?',
    treatmentsTitle: 'Waehlen Sie Ihre Behandlungen',
    roomTitle: 'Unterkunft waehlen',
    extrasTitle: 'Extras & Add-ons',
    formTitle: 'Buchung abschliessen',
    total: 'Voraussichtlicher Gesamtpreis',
    submit: 'Jetzt kostenpflichtig anfragen',
    nightsLabel: 'Naechte',
    included: 'Inkl.',
    labels: {
      name: 'Vor- & Nachname',
      email: 'E-Mail-Adresse',
      phone: 'Telefon',
      address: 'Strasse & Hausnummer',
      city: 'PLZ & Ort',
      arrive: 'Anreisedatum'
    }
  },
  en: {
    title: 'Plan Your Stay',
    subtitle: 'Build your personal wellness retreat step by step.',
    durationTitle: 'How long would you like to stay?',
    treatmentsTitle: 'Choose Your Treatments',
    roomTitle: 'Choose Accommodation',
    extrasTitle: 'Extras & Add-ons',
    formTitle: 'Complete Booking',
    total: 'Estimated Total',
    submit: 'Request booking',
    nightsLabel: 'nights',
    included: 'Included',
    labels: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone',
      address: 'Street & Number',
      city: 'ZIP & City',
      arrive: 'Arrival Date'
    }
  }
};

const seedDurations = [
  { id: 'weekend', label_de: 'Wochenende', label_en: 'Weekend', nights: 2, price: 380 },
  { id: 'midweek', label_de: '4 Naechte', label_en: '4 Nights', nights: 4, price: 720 },
  { id: 'week', label_de: '1 Woche', label_en: '1 Week', nights: 7, price: 1180 },
  { id: 'twoweeks', label_de: '2 Wochen', label_en: '2 Weeks', nights: 14, price: 2100 }
];

const seedTreatments = [
  {
    id: 'massage',
    label_de: 'Klassische Massage',
    label_en: 'Classic Massage',
    desc_de: 'Entspannungsmassage 60 Min.',
    desc_en: 'Relaxation massage 60 min.',
    price: 95
  },
  {
    id: 'ayurveda',
    label_de: 'Ayurveda Abhyanga',
    label_en: 'Ayurveda Abhyanga',
    desc_de: 'Ganzkoerper-Oelmassage 90 Min.',
    desc_en: 'Full-body oil massage 90 min.',
    price: 145
  },
  {
    id: 'fango',
    label_de: 'Fango-Packung',
    label_en: 'Fango Pack',
    desc_de: 'Waermebehandlung mit Heilerde',
    desc_en: 'Heat treatment with healing clay',
    price: 75
  },
  {
    id: 'yoga',
    label_de: 'Yoga-Paket',
    label_en: 'Yoga Package',
    desc_de: '5 gefuehrte Yoga-Einheiten',
    desc_en: '5 guided yoga sessions',
    price: 120
  },
  {
    id: 'sauna',
    label_de: 'Sauna-Ritual',
    label_en: 'Sauna Ritual',
    desc_de: 'Aufguss-Zeremonie & Ruheraum',
    desc_en: 'Infusion ceremony & relaxation room',
    price: 55
  },
  {
    id: 'kneipp',
    label_de: 'Kneipp-Therapie',
    label_en: 'Kneipp Therapy',
    desc_de: 'Wassertreten & Guesse',
    desc_en: 'Water treading & affusions',
    price: 45
  }
];

const seedRooms = [
  {
    id: 'standard',
    label_de: 'Panorama-Zimmer',
    label_en: 'Panorama Room',
    desc_de: 'Gemuetliches Zimmer mit Bergblick, 22 qm',
    desc_en: 'Cozy room with mountain view, 22 sqm',
    price_per_night: 0
  },
  {
    id: 'superior',
    label_de: 'Superior Suite',
    label_en: 'Superior Suite',
    desc_de: 'Wohnbereich und Balkon mit Alpenpanorama, 38 qm',
    desc_en: 'Living area and balcony with Alpine panorama, 38 sqm',
    price_per_night: 60
  },
  {
    id: 'penthouse',
    label_de: 'Wellness-Penthouse',
    label_en: 'Wellness Penthouse',
    desc_de: 'Private Sauna, Whirlpool und Dachterrasse, 65 qm',
    desc_en: 'Private sauna, whirlpool and rooftop terrace, 65 sqm',
    price_per_night: 140
  }
];

const seedExtras = [
  {
    id: 'breakfast',
    label_de: 'Fruehstuecksbuffet',
    label_en: 'Breakfast Buffet',
    desc_de: 'Bio-Fruehstueck taeglich',
    desc_en: 'Organic breakfast daily',
    price: 0,
    price_per_night: 28
  },
  {
    id: 'dinner',
    label_de: 'Halbpension',
    label_en: 'Half Board',
    desc_de: 'Abendmenue inbegriffen',
    desc_en: 'Evening menu included',
    price: 0,
    price_per_night: 55
  },
  {
    id: 'transfer',
    label_de: 'Airport-Transfer',
    label_en: 'Airport Transfer',
    desc_de: 'Ab/zum Flughafen Muenchen',
    desc_en: 'To/from Munich Airport',
    price: 120,
    price_per_night: 0
  },
  {
    id: 'flowers',
    label_de: 'Blumenarrangement',
    label_en: 'Flower Arrangement',
    desc_de: 'Willkommensblumen im Zimmer',
    desc_en: 'Welcome flowers in room',
    price: 35,
    price_per_night: 0
  },
  {
    id: 'wine',
    label_de: 'Weinpaket',
    label_en: 'Wine Package',
    desc_de: '3 ausgewaehlte Allgaeuer Weine',
    desc_en: '3 selected Allgaeu wines',
    price: 65,
    price_per_night: 0
  },
  {
    id: 'hiking',
    label_de: 'Gefuehrte Wanderung',
    label_en: 'Guided Hike',
    desc_de: 'Tagesausflug mit Bergfuehrer',
    desc_en: 'Day trip with mountain guide',
    price: 85,
    price_per_night: 0
  }
];

function getPageText(lang) {
  return pageText[lang === 'en' ? 'en' : 'de'];
}

module.exports = {
  getPageText,
  seedDurations,
  seedExtras,
  seedRooms,
  seedTreatments
};
