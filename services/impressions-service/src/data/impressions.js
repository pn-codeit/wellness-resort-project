const pageText = {
  de: {
    title: 'Impressionen',
    subtitle: 'Erleben Sie die Atmosphaere des Serenity Resorts.',
    photosTitle: 'Bildergalerie',
    videosTitle: 'Filme & Einblicke',
    categories: ['Alle', 'Spa & Wellness', 'Natur', 'Kulinarik', 'Zimmer', 'Gästefotos']
  },
  en: {
    title: 'Gallery',
    subtitle: 'Experience the atmosphere of Serenity Resort.',
    photosTitle: 'Photo Gallery',
    videosTitle: 'Films & Insights',
    categories: ['All', 'Spa & Wellness', 'Nature', 'Cuisine', 'Rooms', 'Guest Photos']
  }
};

const galleryItems = [
  {
    id: 'infinity-pool',
    cat_de: 'Spa & Wellness',
    cat_en: 'Spa & Wellness',
    label_de: 'Infinity Pool',
    label_en: 'Infinity Pool',
    color1: '#6ab0c8',
    color2: '#4a8fa8',
    objectName: 'impressions/photos/Infinity-pool.jpeg'
  },
  {
    id: 'mountain-panorama',
    cat_de: 'Natur',
    cat_en: 'Nature',
    label_de: 'Allgaeuer Bergpanorama',
    label_en: 'Allgaeu Mountain Panorama',
    color1: '#7aaa6a',
    color2: '#3a7a3a',
    objectName: 'impressions/photos/BG.png'
  },
  {
    id: 'herbal-steam',
    cat_de: 'Spa & Wellness',
    cat_en: 'Spa & Wellness',
    label_de: 'Kraeuter-Dampfbad',
    label_en: 'Herbal Steam Room',
    color1: '#a8c4b8',
    color2: '#688a80',
    objectName: 'impressions/photos/steamroom.png'
  },
  {
    id: 'breakfast-buffet',
    cat_de: 'Kulinarik',
    cat_en: 'Cuisine',
    label_de: 'Bio-Fruehstuecksbuffet',
    label_en: 'Organic Breakfast Buffet',
    color1: '#d4b878',
    color2: '#a88a48',
    objectName: 'impressions/photos/breakfast.png'
  },
  {
    id: 'panorama-suite',
    cat_de: 'Zimmer',
    cat_en: 'Rooms',
    label_de: 'Panorama-Suite',
    label_en: 'Panorama Suite',
    color1: '#c4b0a0',
    color2: '#9a8070',
    objectName: 'impressions/photos/PM-suit.png'
  },
  {
    id: 'morning-walk',
    cat_de: 'Natur',
    cat_en: 'Nature',
    label_de: 'Morgenspaziergang',
    label_en: 'Morning Walk',
    color1: '#b8d4a0',
    color2: '#78a460',
    objectName: 'impressions/photos/morningwalk.png'
  },
  {
    id: 'ayurveda-room',
    cat_de: 'Spa & Wellness',
    cat_en: 'Spa & Wellness',
    label_de: 'Ayurveda-Massageraum',
    label_en: 'Ayurveda Massage Room',
    color1: '#d4c0a0',
    color2: '#a89070',
    objectName: 'impressions/photos/massage-room.png'
  },
  {
    id: 'gourmet-dinner',
    cat_de: 'Kulinarik',
    cat_en: 'Cuisine',
    label_de: 'Gourmet-Abendmenue',
    label_en: 'Gourmet Evening Menu',
    color1: '#d4a898',
    color2: '#a87868',
    objectName: 'impressions/photos/evening-dinner.png'
  },
  {
    id: 'wellness-penthouse',
    cat_de: 'Zimmer',
    cat_en: 'Rooms',
    label_de: 'Wellness-Penthouse',
    label_en: 'Wellness Penthouse',
    color1: '#b0bcd4',
    color2: '#7888a8',
    objectName: 'impressions/photos/penthouse-suit.png'
  }
];

const videos = [
  {
    id: 'meditation',
    youtubeId: 'TCizr_csYVo',
    title_de: 'Meditationsretreat im Allgaeu',
    title_en: 'Meditation Retreat in Allgaeu',
    desc_de: 'Eine Woche innere Ruhe und Achtsamkeit im Herzen der Alpen.',
    desc_en: 'A week of inner peace and mindfulness in the heart of the Alps.'
  },
  {
    id: 'yoga',
    youtubeId: 'Rw62QzYEqZE',
    title_de: 'Yoga am Alpsee',
    title_en: 'Yoga by the Alpsee Lake',
    desc_de: 'Morgenritual mit Sonnengruss und Atemuebungen in der Natur.',
    desc_en: 'Morning ritual with sun salutation and breathing exercises in nature.'
  },
  {
    id: 'herbs',
    youtubeId: 'Kj7_nXbZca0',
    title_de: 'Kraeuterwanderung Oberstdorf',
    title_en: 'Herb Hike Oberstdorf',
    desc_de: 'Mit unserem Naturfuehrer durch alpine Heilpflanzenlandschaften.',
    desc_en: 'With our nature guide through alpine medicinal plant landscapes.'
  }
];

function getPageText(lang) {
  return pageText[lang === 'en' ? 'en' : 'de'];
}

module.exports = {
  galleryItems,
  getPageText,
  videos
};
