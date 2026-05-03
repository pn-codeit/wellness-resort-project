const navItems = {
  de: [
    { id: 'home', href: '/', label: 'Start' },
    { id: 'configurator', href: '/configurator', label: 'Urlaub konfigurieren' },
    { id: 'shop', href: '/shop', label: 'Shop' },
    { id: 'impressions', href: '/impressions', label: 'Impressionen' },
    { id: 'weather', href: '/weather', label: 'Wetter' },
    { id: 'assistant', href: '/assistant', label: 'KI-Berater' }
  ],
  en: [
    { id: 'home', href: '/', label: 'Home' },
    { id: 'configurator', href: '/configurator', label: 'Plan Your Stay' },
    { id: 'shop', href: '/shop', label: 'Shop' },
    { id: 'impressions', href: '/impressions', label: 'Gallery' },
    { id: 'weather', href: '/weather', label: 'Weather' },
    { id: 'assistant', href: '/assistant', label: 'AI Advisor' }
  ]
};

const home = {
  de: {
    heroSub: 'Oberstdorf, Allgäu',
    heroTitle: 'Wo Natur und Stille sich begegnen',
    ctaPrimary: 'Urlaub konfigurieren',
    ctaSecondary: 'Entdecken',
    featuresTitle: 'Ein Ort für Körper und Geist',
    features: [
      { icon: 'leaf', title: 'Naturtherapie', desc: 'Kräuterbäder, Waldbaden und alpine Heilpflanzenkuren inmitten der Allgäuer Berge.' },
      { icon: 'water', title: 'Wasserwelten', desc: 'Thermalbecken, Kneipp-Pfade und ein Infinity-Pool mit Bergpanorama.' },
      { icon: 'yoga', title: 'Yoga & Meditation', desc: 'Tägliche Kurse für alle Levels, vom Morgenritual bis zur Mondmeditation.' },
      { icon: 'spa', title: 'Ayurveda & TCM', desc: 'Ganzheitliche Behandlungen nach jahrtausendealten Traditionen.' },
      { icon: 'mountain', title: 'Alpine Erlebnisse', desc: 'Geführte Wanderungen, Bergkräutertouren und Sonnenaufgangswanderungen.' },
      { icon: 'dining', title: 'Kulinarik', desc: 'Regionale Bio-Küche, Ayurveda-Menüs und stille Genussabende.' }
    ],
    ctaTitle: 'Ihr persönlicher Rückzugsort',
    ctaText: 'Konfigurieren Sie jetzt Ihren individuellen Wellness-Aufenthalt, abgestimmt auf Ihre Bedürfnisse.',
    ctaButton: 'Jetzt gestalten'
  },
  en: {
    heroSub: 'Oberstdorf, Allgäu',
    heroTitle: 'Where Nature and Silence Meet',
    ctaPrimary: 'Plan Your Stay',
    ctaSecondary: 'Discover',
    featuresTitle: 'A Place for Body and Mind',
    features: [
      { icon: 'leaf', title: 'Nature Therapy', desc: 'Herbal baths, forest bathing and alpine medicinal plant cures in the heart of the Allgäu.' },
      { icon: 'water', title: 'Water Worlds', desc: 'Thermal pools, Kneipp paths and an infinity pool with mountain panorama.' },
      { icon: 'yoga', title: 'Yoga & Meditation', desc: 'Daily classes for all levels, from morning rituals to moonlit meditation.' },
      { icon: 'spa', title: 'Ayurveda & TCM', desc: 'Holistic treatments following millennia-old traditions.' },
      { icon: 'mountain', title: 'Alpine Experiences', desc: 'Guided hikes, mountain herb tours and sunrise walks.' },
      { icon: 'dining', title: 'Cuisine', desc: 'Regional organic cooking, Ayurveda menus and quiet evenings of indulgence.' }
    ],
    ctaTitle: 'Your Personal Retreat',
    ctaText: 'Configure your individual wellness stay now, tailored to your personal needs.',
    ctaButton: 'Start Planning'
  }
};

const booking = {
  de: {
    title: 'Urlaub konfigurieren',
    subtitle: 'Gestalten Sie Ihren persönlichen Wellness-Aufenthalt Schritt für Schritt.',
    durationTitle: 'Wie lange möchten Sie bleiben?',
    treatmentsTitle: 'Wählen Sie Ihre Behandlungen',
    roomTitle: 'Unterkunft wählen',
    extrasTitle: 'Extras & Add-ons',
    formTitle: 'Buchung abschließen',
    total: 'Voraussichtlicher Gesamtpreis',
    submit: 'Jetzt kostenpflichtig anfragen',
    nightsLabel: 'Nächte',
    included: 'Inkl.',
    labels: {
      name: 'Vor- & Nachname',
      email: 'E-Mail-Adresse',
      phone: 'Telefon',
      address: 'Straße & Hausnummer',
      city: 'PLZ & Ort',
      arrive: 'Anreisedatum'
    },
    durations: [
      { id: 'weekend', label: 'Wochenende', nights: 2, price: 380 },
      { id: 'midweek', label: '4 Nächte', nights: 4, price: 720 },
      { id: 'week', label: '1 Woche', nights: 7, price: 1180 },
      { id: 'twoweeks', label: '2 Wochen', nights: 14, price: 2100 }
    ],
    treatments: [
      { id: 'massage', label: 'Klassische Massage', desc: 'Entspannungsmassage 60 Min.', price: 95 },
      { id: 'ayurveda', label: 'Ayurveda Abhyanga', desc: 'Ganzkörper-Ölmassage 90 Min.', price: 145 },
      { id: 'fango', label: 'Fango-Packung', desc: 'Wärmebehandlung mit Heilerde', price: 75 },
      { id: 'yoga', label: 'Yoga-Paket', desc: '5 geführte Yoga-Einheiten', price: 120 },
      { id: 'sauna', label: 'Sauna-Ritual', desc: 'Aufguss-Zeremonie & Ruheraum', price: 55 },
      { id: 'kneipp', label: 'Kneipp-Therapie', desc: 'Wassertreten & Güsse', price: 45 }
    ],
    rooms: [
      { id: 'standard', label: 'Panorama-Zimmer', desc: 'Gemütliches Zimmer mit Bergblick, 22 m²', pricePerNight: 0 },
      { id: 'superior', label: 'Superior Suite', desc: 'Wohnbereich und Balkon mit Alpenpanorama, 38 m²', pricePerNight: 60 },
      { id: 'penthouse', label: 'Wellness-Penthouse', desc: 'Private Sauna, Whirlpool und Dachterrasse, 65 m²', pricePerNight: 140 }
    ],
    extras: [
      { id: 'breakfast', label: 'Frühstücksbuffet', desc: 'Bio-Frühstück täglich', pricePerNight: 28 },
      { id: 'dinner', label: 'Halbpension', desc: 'Abendmenü inbegriffen', pricePerNight: 55 },
      { id: 'transfer', label: 'Airport-Transfer', desc: 'Ab/zum Flughafen München', price: 120 },
      { id: 'flowers', label: 'Blumenarrangement', desc: 'Willkommensblumen im Zimmer', price: 35 },
      { id: 'wine', label: 'Weinpaket', desc: '3 ausgewählte Allgäuer Weine', price: 65 },
      { id: 'hiking', label: 'Geführte Wanderung', desc: 'Tagesausflug mit Bergführer', price: 85 }
    ]
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
    },
    durations: [
      { id: 'weekend', label: 'Weekend', nights: 2, price: 380 },
      { id: 'midweek', label: '4 Nights', nights: 4, price: 720 },
      { id: 'week', label: '1 Week', nights: 7, price: 1180 },
      { id: 'twoweeks', label: '2 Weeks', nights: 14, price: 2100 }
    ],
    treatments: [
      { id: 'massage', label: 'Classic Massage', desc: 'Relaxation massage 60 min.', price: 95 },
      { id: 'ayurveda', label: 'Ayurveda Abhyanga', desc: 'Full-body oil massage 90 min.', price: 145 },
      { id: 'fango', label: 'Fango Pack', desc: 'Heat treatment with healing clay', price: 75 },
      { id: 'yoga', label: 'Yoga Package', desc: '5 guided yoga sessions', price: 120 },
      { id: 'sauna', label: 'Sauna Ritual', desc: 'Infusion ceremony & relaxation room', price: 55 },
      { id: 'kneipp', label: 'Kneipp Therapy', desc: 'Water treading & affusions', price: 45 }
    ],
    rooms: [
      { id: 'standard', label: 'Panorama Room', desc: 'Cozy room with mountain view, 22 m²', pricePerNight: 0 },
      { id: 'superior', label: 'Superior Suite', desc: 'Living area and balcony with Alpine panorama, 38 m²', pricePerNight: 60 },
      { id: 'penthouse', label: 'Wellness Penthouse', desc: 'Private sauna, whirlpool and rooftop terrace, 65 m²', pricePerNight: 140 }
    ],
    extras: [
      { id: 'breakfast', label: 'Breakfast Buffet', desc: 'Organic breakfast daily', pricePerNight: 28 },
      { id: 'dinner', label: 'Half Board', desc: 'Evening menu included', pricePerNight: 55 },
      { id: 'transfer', label: 'Airport Transfer', desc: 'To/from Munich Airport', price: 120 },
      { id: 'flowers', label: 'Flower Arrangement', desc: 'Welcome flowers in room', price: 35 },
      { id: 'wine', label: 'Wine Package', desc: '3 selected Allgäu wines', price: 65 },
      { id: 'hiking', label: 'Guided Hike', desc: 'Day trip with mountain guide', price: 85 }
    ]
  }
};

const shop = {
  de: {
    title: 'Wellness Shop',
    subtitle: 'Bringen Sie das Serenity-Gefühl nach Hause.',
    cartTitle: 'Warenkorb',
    checkoutTitle: 'Kasse',
    add: 'In den Warenkorb',
    total: 'Gesamt',
    submit: 'Kaufen',
    empty: 'Ihr Warenkorb ist leer.',
    labels: {
      name: 'Vor- & Nachname',
      email: 'E-Mail',
      address: 'Lieferadresse',
      city: 'PLZ & Ort'
    },
    categories: ['Alle', 'Pflege', 'Aromatherapie', 'Nahrung', 'Zubehör']
  },
  en: {
    title: 'Wellness Shop',
    subtitle: 'Bring the Serenity feeling home.',
    cartTitle: 'Shopping Cart',
    checkoutTitle: 'Checkout',
    add: 'Add to Cart',
    total: 'Total',
    submit: 'Buy Now',
    empty: 'Your cart is empty.',
    labels: {
      name: 'Full Name',
      email: 'Email',
      address: 'Delivery Address',
      city: 'ZIP & City'
    },
    categories: ['All', 'Care', 'Aromatherapy', 'Nutrition', 'Accessories']
  }
};

const products = [
  { id: 1, name_de: 'Alpenkräuter Badeöl', name_en: 'Alpine Herb Bath Oil', cat_de: 'Pflege', cat_en: 'Care', price: 34.9, desc_de: 'Regenerierendes Badeöl mit Latschenkiefer, Arnika und Alpenrose', desc_en: 'Regenerating bath oil with mountain pine, arnica and alpine rose', color: '#8aab6e' },
  { id: 2, name_de: 'Bergkristall Gesichtscreme', name_en: 'Mountain Crystal Face Cream', cat_de: 'Pflege', cat_en: 'Care', price: 58, desc_de: 'Tiefenwirksame Feuchtigkeitspflege mit Gletscherwasser', desc_en: 'Deep-acting moisturiser with glacial water', color: '#a8c5d8' },
  { id: 3, name_de: 'Lavendel Duftkerze', name_en: 'Lavender Scented Candle', cat_de: 'Aromatherapie', cat_en: 'Aromatherapy', price: 24.9, desc_de: 'Handgegossene Sojakerze, 40 Std. Brenndauer', desc_en: 'Hand-poured soy candle, 40h burn time', color: '#c5a8d8' },
  { id: 4, name_de: 'Allgäuer Kräutertee Set', name_en: 'Allgäu Herbal Tea Set', cat_de: 'Nahrung', cat_en: 'Nutrition', price: 29.5, desc_de: '6 Sorten alpine Heilkräuter, biologisch zertifiziert', desc_en: '6 varieties of alpine medicinal herbs, organically certified', color: '#b8d4a0' },
  { id: 5, name_de: 'Ätherisches Öl Trio', name_en: 'Essential Oil Trio', cat_de: 'Aromatherapie', cat_en: 'Aromatherapy', price: 42, desc_de: 'Bergkiefer, Eukalyptus und Zirbe, 3 x 10 ml', desc_en: 'Mountain pine, eucalyptus and arolla pine, 3 x 10 ml', color: '#a8d4b8' },
  { id: 6, name_de: 'Basalt-Massagestein Set', name_en: 'Basalt Massage Stone Set', cat_de: 'Zubehör', cat_en: 'Accessories', price: 68, desc_de: '8 natürliche Basaltsteine für Hot-Stone-Massagen', desc_en: '8 natural basalt stones for hot stone massages', color: '#9a9a9a' },
  { id: 7, name_de: 'Birkenwasser Shampoo', name_en: 'Birch Water Shampoo', cat_de: 'Pflege', cat_en: 'Care', price: 21.9, desc_de: 'Mildes Naturshampoo für kräftiges, glänzendes Haar', desc_en: 'Mild natural shampoo for strong, glossy hair', color: '#d4c4a0' },
  { id: 8, name_de: 'Himalaya Salzkristall Lampe', name_en: 'Himalayan Salt Crystal Lamp', cat_de: 'Zubehör', cat_en: 'Accessories', price: 49.9, desc_de: 'Authentische Salzlampe, ca. 2-3 kg, mit Kabel', desc_en: 'Authentic salt lamp, approx. 2-3 kg, with cable', color: '#e8b89a' },
  { id: 9, name_de: 'Moringa Superfood Pulver', name_en: 'Moringa Superfood Powder', cat_de: 'Nahrung', cat_en: 'Nutrition', price: 27.8, desc_de: '200 g Bio-Moringapulver, kaltgepresst und roh', desc_en: '200 g organic moringa powder, cold-pressed and raw', color: '#9abb7a' }
];

const impressions = {
  de: {
    title: 'Impressionen',
    subtitle: 'Erleben Sie die Atmosphäre des Serenity Resorts.',
    photosTitle: 'Bildergalerie',
    videosTitle: 'Filme & Einblicke',
    categories: ['Alle', 'Spa & Wellness', 'Natur', 'Kulinarik', 'Zimmer']
  },
  en: {
    title: 'Gallery',
    subtitle: 'Experience the atmosphere of Serenity Resort.',
    photosTitle: 'Photo Gallery',
    videosTitle: 'Films & Insights',
    categories: ['All', 'Spa & Wellness', 'Nature', 'Cuisine', 'Rooms']
  }
};

const galleryItems = [
  { id: 1, cat_de: 'Spa & Wellness', cat_en: 'Spa & Wellness', label_de: 'Infinity Pool', label_en: 'Infinity Pool', color1: '#6ab0c8', color2: '#4a8fa8' },
  { id: 2, cat_de: 'Natur', cat_en: 'Nature', label_de: 'Allgäuer Bergpanorama', label_en: 'Allgäu Mountain Panorama', color1: '#7aaa6a', color2: '#3a7a3a' },
  { id: 3, cat_de: 'Spa & Wellness', cat_en: 'Spa & Wellness', label_de: 'Kräuter-Dampfbad', label_en: 'Herbal Steam Bath', color1: '#a8c4b8', color2: '#688a80' },
  { id: 4, cat_de: 'Kulinarik', cat_en: 'Cuisine', label_de: 'Bio-Frühstücksbuffet', label_en: 'Organic Breakfast Buffet', color1: '#d4b878', color2: '#a88a48' },
  { id: 5, cat_de: 'Zimmer', cat_en: 'Rooms', label_de: 'Panorama-Suite', label_en: 'Panorama Suite', color1: '#c4b0a0', color2: '#9a8070' },
  { id: 6, cat_de: 'Natur', cat_en: 'Nature', label_de: 'Morgenspaziergang', label_en: 'Morning Walk', color1: '#b8d4a0', color2: '#78a460' },
  { id: 7, cat_de: 'Spa & Wellness', cat_en: 'Spa & Wellness', label_de: 'Ayurveda-Massageraum', label_en: 'Ayurveda Massage Room', color1: '#d4c0a0', color2: '#a89070' },
  { id: 8, cat_de: 'Kulinarik', cat_en: 'Cuisine', label_de: 'Gourmet-Abendmenü', label_en: 'Gourmet Evening Menu', color1: '#d4a898', color2: '#a87868' },
  { id: 9, cat_de: 'Zimmer', cat_en: 'Rooms', label_de: 'Wellness-Penthouse', label_en: 'Wellness Penthouse', color1: '#b0bcd4', color2: '#7888a8' }
];

const videos = [
  { id: 'meditation', youtubeId: 'wNjC5zT7WF8', title_de: 'Meditationsretreat im Allgäu', title_en: 'Meditation Retreat in Allgäu', desc_de: 'Eine Woche innere Ruhe und Achtsamkeit im Herzen der Alpen.', desc_en: 'A week of inner peace and mindfulness in the heart of the Alps.' },
  { id: 'yoga', youtubeId: 'DXeKMkPdToo', title_de: 'Yoga am Alpsee', title_en: 'Yoga by the Alpsee Lake', desc_de: 'Morgenritual mit Sonnengruß und Atemübungen in der Natur.', desc_en: 'Morning ritual with sun salutation and breathing exercises in nature.' },
  { id: 'herbs', youtubeId: 'H-xZHv1FzUo', title_de: 'Kräuterwanderung Oberstdorf', title_en: 'Herb Hike Oberstdorf', desc_de: 'Mit unserem Naturführer durch alpine Heilpflanzenlandschaften.', desc_en: 'With our nature guide through alpine medicinal plant landscapes.' }
];

const weatherText = {
  de: {
    title: 'Aktuelles Wetter',
    subtitle: 'Oberstdorf, Allgäu · Live-Wetterdaten',
    feels: 'Gefühlt',
    humidity: 'Luftfeuchtigkeit',
    wind: 'Wind',
    pressure: 'Luftdruck',
    sunrise: 'Sonnenaufgang',
    sunset: 'Sonnenuntergang',
    forecastTitle: '5-Tage-Vorschau',
    tipTitle: 'Wellness-Tipp für heute',
    days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    tips: {
      Clear: 'Perfektes Wetter für eine geführte Alpenwanderung und Sonnenmeditation auf der Bergwiese.',
      Clouds: 'Bewölktes Wetter lädt zum Verweilen ein, ideal für Ayurveda-Behandlungen oder ein Kräuterbad.',
      Rain: 'Regentage sind Spa-Tage. Genießen Sie Thermalbäder und eine heiße Fango-Packung.',
      Snow: 'Winterzauber: Schneespaziergang, Alpenmilch am Kamin oder ein Saunaaufguss mit Tannenöl.',
      Thunderstorm: 'Perfekte Zeit für innere Einkehr, Meditation und wohltuende Massagen im geschützten Rahmen.',
      Drizzle: 'Leichter Nieselregen passt zu einem stillen Spaziergang oder einer Teestunde im Wintergarten.',
      Mist: 'Nebel bringt Ruhe in die Alpenlandschaft, ideal für Waldspaziergänge und Achtsamkeit.'
    }
  },
  en: {
    title: 'Current Weather',
    subtitle: 'Oberstdorf, Allgäu · Live Weather Data',
    feels: 'Feels like',
    humidity: 'Humidity',
    wind: 'Wind',
    pressure: 'Pressure',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    forecastTitle: '5-Day Forecast',
    tipTitle: "Today's Wellness Tip",
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    tips: {
      Clear: 'Perfect weather for a guided alpine hike and sun meditation on the mountain meadow.',
      Clouds: 'Cloudy weather invites you indoors, ideal for Ayurveda treatments or a long herbal bath.',
      Rain: 'Rainy days are spa days. Enjoy thermal pools and a hot fango pack.',
      Snow: 'Winter magic: a snow walk, alpine milk by the fireplace or a sauna infusion with pine oil.',
      Thunderstorm: 'Perfect time for inner contemplation, meditation and soothing massages in a sheltered setting.',
      Drizzle: 'Light drizzle pairs well with a quiet walk or a tea hour in the winter garden.',
      Mist: 'Fog brings calm to the Alpine landscape, ideal for forest walks and mindfulness.'
    }
  }
};

const assistant = {
  de: {
    title: 'KI-Wellness-Berater',
    subtitle: 'Beschreiben Sie Ihre Stimmung, Ihre Ziele oder Ihre Beschwerden. Unser KI-Berater empfiehlt passende Wellness-Pakete und Behandlungen.',
    placeholder: 'Wie fühlen Sie sich heute? Was erhoffen Sie sich von Ihrem Aufenthalt?',
    send: 'Beratung starten',
    examplesTitle: 'Beispiel-Eingaben:',
    examples: [
      'Ich bin ausgebrannt und habe seit Wochen nicht richtig geschlafen.',
      'Ich möchte mich körperlich reinigen und mit mehr Energie nach Hause fahren.',
      'Ich leide unter Rückenschmerzen und Verspannungen im Nackenbereich.',
      'Wir feiern unseren Hochzeitstag und suchen etwas Romantisches.'
    ],
    packagesTitle: 'Empfohlenes Paket',
    bookCta: 'Paket buchen'
  },
  en: {
    title: 'AI Wellness Advisor',
    subtitle: 'Describe your mood, goals or concerns. Our AI advisor will recommend suitable wellness packages and treatments.',
    placeholder: 'How are you feeling today? What do you hope to get out of your stay?',
    send: 'Get Advice',
    examplesTitle: 'Example inputs:',
    examples: [
      "I'm burnt out and have not slept properly in weeks.",
      'I want to detox and return home with more energy.',
      'I suffer from back pain and tension in my neck.',
      "We're celebrating our anniversary and looking for something romantic."
    ],
    packagesTitle: 'Recommended Package',
    bookCta: 'Book Package'
  }
};

module.exports = {
  navItems,
  home,
  booking,
  shop,
  products,
  impressions,
  galleryItems,
  videos,
  weatherText,
  assistant
};
