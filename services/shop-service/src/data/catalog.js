const pageText = {
  de: {
    title: 'Wellness Shop',
    subtitle: 'Bringen Sie das Serenity-Gefuehl nach Hause.',
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
    categories: ['Alle', 'Pflege', 'Aromatherapie', 'Nahrung', 'Zubehoer']
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

const seedProducts = [
  {
    id: 1,
    name_de: 'Alpenkraeuter Badeoel',
    name_en: 'Alpine Herb Bath Oil',
    cat_de: 'Pflege',
    cat_en: 'Care',
    price: 34.9,
    desc_de: 'Regenerierendes Badeoel mit Latschenkiefer, Arnika und Alpenrose',
    desc_en: 'Regenerating bath oil with mountain pine, arnica and alpine rose',
    color: '#8aab6e',
    object_name: 'shop/products/1-alpine-herb-bath-oil.svg'
  },
  {
    id: 2,
    name_de: 'Bergkristall Gesichtscreme',
    name_en: 'Mountain Crystal Face Cream',
    cat_de: 'Pflege',
    cat_en: 'Care',
    price: 58,
    desc_de: 'Tiefenwirksame Feuchtigkeitspflege mit Gletscherwasser',
    desc_en: 'Deep-acting moisturiser with glacial water',
    color: '#a8c5d8',
    object_name: 'shop/products/2-mountain-crystal-face-cream.svg'
  },
  {
    id: 3,
    name_de: 'Lavendel Duftkerze',
    name_en: 'Lavender Scented Candle',
    cat_de: 'Aromatherapie',
    cat_en: 'Aromatherapy',
    price: 24.9,
    desc_de: 'Handgegossene Sojakerze, 40 Std. Brenndauer',
    desc_en: 'Hand-poured soy candle, 40h burn time',
    color: '#c5a8d8',
    object_name: 'shop/products/3-lavender-scented-candle.svg'
  },
  {
    id: 4,
    name_de: 'Allgaeuer Kraeutertee Set',
    name_en: 'Allgaeu Herbal Tea Set',
    cat_de: 'Nahrung',
    cat_en: 'Nutrition',
    price: 29.5,
    desc_de: '6 Sorten alpine Heilkraeuter, biologisch zertifiziert',
    desc_en: '6 varieties of alpine medicinal herbs, organically certified',
    color: '#b8d4a0',
    object_name: 'shop/products/4-allgaeu-herbal-tea-set.svg'
  },
  {
    id: 5,
    name_de: 'Aetherisches Oel Trio',
    name_en: 'Essential Oil Trio',
    cat_de: 'Aromatherapie',
    cat_en: 'Aromatherapy',
    price: 42,
    desc_de: 'Bergkiefer, Eukalyptus und Zirbe, 3 x 10 ml',
    desc_en: 'Mountain pine, eucalyptus and arolla pine, 3 x 10 ml',
    color: '#a8d4b8',
    object_name: 'shop/products/5-essential-oil-trio.svg'
  },
  {
    id: 6,
    name_de: 'Basalt-Massagestein Set',
    name_en: 'Basalt Massage Stone Set',
    cat_de: 'Zubehoer',
    cat_en: 'Accessories',
    price: 68,
    desc_de: '8 natuerliche Basaltsteine fuer Hot-Stone-Massagen',
    desc_en: '8 natural basalt stones for hot stone massages',
    color: '#9a9a9a',
    object_name: 'shop/products/6-basalt-massage-stone-set.svg'
  },
  {
    id: 7,
    name_de: 'Birkenwasser Shampoo',
    name_en: 'Birch Water Shampoo',
    cat_de: 'Pflege',
    cat_en: 'Care',
    price: 21.9,
    desc_de: 'Mildes Naturshampoo fuer kraeftiges, glaenzendes Haar',
    desc_en: 'Mild natural shampoo for strong, glossy hair',
    color: '#d4c4a0',
    object_name: 'shop/products/7-birch-water-shampoo.svg'
  },
  {
    id: 8,
    name_de: 'Himalaya Salzkristall Lampe',
    name_en: 'Himalayan Salt Crystal Lamp',
    cat_de: 'Zubehoer',
    cat_en: 'Accessories',
    price: 49.9,
    desc_de: 'Authentische Salzlampe, ca. 2-3 kg, mit Kabel',
    desc_en: 'Authentic salt lamp, approx. 2-3 kg, with cable',
    color: '#e8b89a',
    object_name: 'shop/products/8-himalayan-salt-crystal-lamp.svg'
  },
  {
    id: 9,
    name_de: 'Moringa Superfood Pulver',
    name_en: 'Moringa Superfood Powder',
    cat_de: 'Nahrung',
    cat_en: 'Nutrition',
    price: 27.8,
    desc_de: '200 g Bio-Moringapulver, kaltgepresst und roh',
    desc_en: '200 g organic moringa powder, cold-pressed and raw',
    color: '#9abb7a',
    object_name: 'shop/products/9-moringa-superfood-powder.svg'
  }
];

function getPageText(lang) {
  return pageText[lang === 'en' ? 'en' : 'de'];
}

module.exports = {
  getPageText,
  seedProducts
};
