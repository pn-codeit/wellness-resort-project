const pageText = {
  de: {
    title: 'Urlaub konfigurieren',
    subtitle: 'Gestalten Sie Ihren persönlichen Wellness-Aufenthalt Schritt für Schritt.',
    durationTitle: 'Wie lange möchten Sie bleiben?',
    treatmentsTitle: 'Wählen Sie Ihre Behandlungen',
    roomTitle: 'Unterkunft wählen',
    extrasTitle: 'Extras & Add-ons',
    formTitle: 'Buchung abschließen',
    guestsTitle: 'Gäste',
    roomCountTitle: 'Zimmeranzahl',
    total: 'Voraussichtlicher Gesamtpreis',
    submit: 'Jetzt kostenpflichtig anfragen',
    nightsLabel: 'Nächte',
    included: 'Inkl.',
    labels: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail-Adresse',
      phone: 'Telefon',
      address: 'Straße & Hausnummer',
      city: 'PLZ & Ort',
      arrive: 'Anreisedatum',
      adults: 'Erwachsene',
      children: 'Kinder',
      roomCount: 'Zimmer',
      roomCapacity: 'Bis zu {count} Personen pro Zimmer',
      familyRoomCapacity: '1-2 Erwachsene und 1-2 Kinder pro Zimmer',
      minRooms: 'Mindestens {count} Zimmer für diese Gästezahl'
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
    guestsTitle: 'Guests',
    roomCountTitle: 'Number of rooms',
    total: 'Estimated Total',
    submit: 'Request booking',
    nightsLabel: 'nights',
    included: 'Included',
    labels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone',
      address: 'Street & Number',
      city: 'ZIP & City',
      arrive: 'Arrival Date',
      adults: 'Adults',
      children: 'Children',
      roomCount: 'Rooms',
      roomCapacity: 'Up to {count} guests per room',
      familyRoomCapacity: '1-2 adults and 1-2 children per room',
      minRooms: 'At least {count} rooms for this guest count'
    }
  }
};

const seedDurations = [
  { id: 'weekend', label_de: 'Wochenende', label_en: 'Weekend', nights: 2, price: 380 },
  { id: 'midweek', label_de: '4 Nächte', label_en: '4 Nights', nights: 4, price: 720 },
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
    desc_de: 'Ganzkörper-Ölmassage 90 Min.',
    desc_en: 'Full-body oil massage 90 min.',
    price: 145
  },
  {
    id: 'fango',
    label_de: 'Fango Packung',
    label_en: 'Fango Pack',
    desc_de: 'Wärmebehandlung mit Heilerde',
    desc_en: 'Heat treatment with healing clay',
    price: 75
  },
  {
    id: 'yoga',
    label_de: 'Yoga Paket',
    label_en: 'Yoga Package',
    desc_de: '5 geführte Yoga-Einheiten',
    desc_en: '5 guided yoga sessions',
    price: 120
  },
  {
    id: 'sauna',
    label_de: 'Sauna Ritual',
    label_en: 'Sauna Ritual',
    desc_de: 'Aufguss-Zeremonie & Ruheraum',
    desc_en: 'Infusion ceremony & relaxation room',
    price: 55
  },
  {
    id: 'kneipp',
    label_de: 'Kneipp Therapie',
    label_en: 'Kneipp Therapy',
    desc_de: 'Wassertreten & Güsse',
    desc_en: 'Water treading & affusions',
    price: 45
  }
];

const seedRooms = [
  {
    id: 'standard',
    label_de: 'Panorama Zimmer',
    label_en: 'Panorama Room',
    desc_de: 'Gemütliches Zimmer mit Bergblick, 22 qm',
    desc_en: 'Cozy room with mountain view, 22 sqm',
    capacity: 2,
    adult_capacity: 2,
    child_capacity: 2,
    price_per_night: 159
  },
  {
    id: 'superior',
    label_de: 'Superior Suite',
    label_en: 'Superior Suite',
    desc_de: 'Wohnbereich und Balkon mit Alpenpanorama, 38 qm',
    desc_en: 'Living area and balcony with Alpine panorama, 38 sqm',
    capacity: 2,
    adult_capacity: 2,
    child_capacity: 2,
    price_per_night: 249
  },
  {
    id: 'penthouse',
    label_de: 'Wellness Penthouse',
    label_en: 'Wellness Penthouse',
    desc_de: 'Private Sauna, Whirlpool und Dachterrasse, 65 qm',
    desc_en: 'Private sauna, whirlpool and rooftop terrace, 65 sqm',
    capacity: 2,
    adult_capacity: 2,
    child_capacity: 2,
    price_per_night: 399
  },
  {
    id: 'family',
    label_de: 'Family Zimmer',
    label_en: 'Family Room',
    desc_de: 'Großzügiges Familienzimmer mit Schlafbereich für Kinder, 34 qm',
    desc_en: 'Spacious family room with a sleeping area for children, 34 sqm',
    capacity: 4,
    adult_capacity: 2,
    child_capacity: 2,
    price_per_night: 289
  }
];

const seedExtras = [
  {
    id: 'breakfast',
    label_de: 'Frühstücksbuffet',
    label_en: 'Breakfast Buffet',
    desc_de: 'Bio-Frühstück täglich',
    desc_en: 'Organic breakfast daily',
    price: 0,
    price_per_night: 28
  },
  {
    id: 'dinner',
    label_de: 'Halbpension',
    label_en: 'Half Board',
    desc_de: 'Abendmenü inbegriffen',
    desc_en: 'Evening menu included',
    price: 0,
    price_per_night: 55
  },
  {
    id: 'transfer',
    label_de: 'Airport Transfer',
    label_en: 'Airport Transfer',
    desc_de: 'Ab/zum Flughafen München',
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
    desc_de: '3 ausgewählte Allgäuer Weine',
    desc_en: '3 selected Allgäu wines',
    price: 65,
    price_per_night: 0
  },
  {
    id: 'hiking',
    label_de: 'Geführte Wanderung',
    label_en: 'Guided Hike',
    desc_de: 'Tagesausflug mit Bergführer',
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
