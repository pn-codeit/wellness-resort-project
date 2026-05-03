
const impressText = {
  de: {
    title: 'Impressionen',
    subtitle: 'Erleben Sie die Atmosphäre des Serenity Resorts.',
    photos_title: 'Bildergalerie',
    videos_title: 'Filme & Einblicke',
    categories: ['Alle', 'Spa & Wellness', 'Natur', 'Kulinarik', 'Zimmer'],
  },
  en: {
    title: 'Gallery',
    subtitle: 'Experience the atmosphere of Serenity Resort.',
    photos_title: 'Photo Gallery',
    videos_title: 'Films & Insights',
    categories: ['All', 'Spa & Wellness', 'Nature', 'Cuisine', 'Rooms'],
  }
};

const GALLERY_ITEMS = [
  { id: 1, cat_de: 'Spa & Wellness', cat_en: 'Spa & Wellness', label_de: 'Infinity Pool', label_en: 'Infinity Pool', color1: '#6ab0c8', color2: '#4a8fa8', shape: 'pool' },
  { id: 2, cat_de: 'Natur', cat_en: 'Nature', label_de: 'Allgäuer Bergpanorama', label_en: 'Allgäu Mountain Panorama', color1: '#7aaa6a', color2: '#3a7a3a', shape: 'mountain' },
  { id: 3, cat_de: 'Spa & Wellness', cat_en: 'Spa & Wellness', label_de: 'Kräuter-Dampfbad', label_en: 'Herbal Steam Bath', color1: '#a8c4b8', color2: '#688a80', shape: 'steam' },
  { id: 4, cat_de: 'Kulinarik', cat_en: 'Cuisine', label_de: 'Bio-Frühstücksbuffet', label_en: 'Organic Breakfast Buffet', color1: '#d4b878', color2: '#a88a48', shape: 'food' },
  { id: 5, cat_de: 'Zimmer', cat_en: 'Rooms', label_de: 'Panorama-Suite', label_en: 'Panorama Suite', color1: '#c4b0a0', color2: '#9a8070', shape: 'room' },
  { id: 6, cat_de: 'Natur', cat_en: 'Nature', label_de: 'Morgenspaziergang', label_en: 'Morning Walk', color1: '#b8d4a0', color2: '#78a460', shape: 'forest' },
  { id: 7, cat_de: 'Spa & Wellness', cat_en: 'Spa & Wellness', label_de: 'Ayurveda-Massageraum', label_en: 'Ayurveda Massage Room', color1: '#d4c0a0', color2: '#a89070', shape: 'massage' },
  { id: 8, cat_de: 'Kulinarik', cat_en: 'Cuisine', label_de: 'Gourmet-Abendmenü', label_en: 'Gourmet Evening Menu', color1: '#d4a898', color2: '#a87868', shape: 'dinner' },
  { id: 9, cat_de: 'Zimmer', cat_en: 'Rooms', label_de: 'Wellness-Penthouse', label_en: 'Wellness Penthouse', color1: '#b0bcd4', color2: '#7888a8', shape: 'penthouse' },
];

const VIDEOS = [
  {
    id: 'a1b2c3d4e5f',
    youtube_id: 'wNjC5zT7WF8',
    title_de: 'Meditationsretreat im Allgäu',
    title_en: 'Meditation Retreat in Allgäu',
    desc_de: 'Eine Woche innere Ruhe und Achtsamkeit im Herzen der Alpen.',
    desc_en: 'A week of inner peace and mindfulness in the heart of the Alps.',
  },
  {
    id: 'b2c3d4e5f6a',
    youtube_id: 'DXeKMkPdToo',
    title_de: 'Yoga am Alpsee',
    title_en: 'Yoga by the Alpsee Lake',
    desc_de: 'Morgenritual mit Sonnengruß und Atemübungen in der Natur.',
    desc_en: 'Morning ritual with sun salutation and breathing exercises in nature.',
  },
  {
    id: 'c3d4e5f6a7b',
    youtube_id: 'H-xZHv1FzUo',
    title_de: 'Kräuterwanderung Oberstdorf',
    title_en: 'Herb Hike Oberstdorf',
    desc_de: 'Mit unserem Naturführer durch alpine Heilpflanzenlandschaften.',
    desc_en: 'With our nature guide through alpine medicinal plant landscapes.',
  },
];

function GalleryPlaceholder({ item }) {
  return (
    <div style={{
      width: '100%', paddingBottom: '70%', position: 'relative',
      background: `linear-gradient(135deg, ${item.color1}55, ${item.color2}88)`,
      borderRadius: '12px 12px 0 0', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ opacity: 0.5 }}>
          {item.shape === 'pool' && <>
            <ellipse cx="30" cy="38" rx="22" ry="10" fill={item.color1}/>
            <rect x="8" y="28" width="44" height="10" fill={item.color2} opacity="0.6"/>
            <rect x="15" y="15" width="30" height="18" rx="4" fill={item.color1} opacity="0.5"/>
          </>}
          {item.shape === 'mountain' && <>
            <polygon points="30,8 8,50 52,50" fill={item.color2} opacity="0.6"/>
            <polygon points="45,18 28,50 58,50" fill={item.color1} opacity="0.5"/>
            <rect x="0" y="50" width="60" height="10" fill={item.color1} opacity="0.3"/>
          </>}
          {item.shape === 'steam' && <>
            <ellipse cx="30" cy="46" rx="18" ry="8" fill={item.color1} opacity="0.5"/>
            <path d="M22,38 Q20,28 22,20 Q24,28 22,38Z" fill={item.color2} opacity="0.5"/>
            <path d="M30,35 Q28,25 30,15 Q32,25 30,35Z" fill={item.color2} opacity="0.6"/>
            <path d="M38,38 Q36,28 38,20 Q40,28 38,38Z" fill={item.color2} opacity="0.5"/>
          </>}
          {item.shape === 'food' && <>
            <circle cx="30" cy="28" r="18" fill={item.color1} opacity="0.5"/>
            <circle cx="30" cy="28" r="12" fill={item.color2} opacity="0.5"/>
            <rect x="12" y="44" width="36" height="4" rx="2" fill={item.color2} opacity="0.4"/>
          </>}
          {item.shape === 'room' && <>
            <rect x="8" y="18" width="44" height="32" rx="4" fill={item.color1} opacity="0.4"/>
            <rect x="14" y="24" width="14" height="20" rx="2" fill={item.color2} opacity="0.5"/>
            <rect x="32" y="24" width="14" height="20" rx="2" fill={item.color2} opacity="0.5"/>
            <rect x="8" y="14" width="44" height="6" rx="2" fill={item.color2} opacity="0.4"/>
          </>}
          {item.shape === 'forest' && <>
            <ellipse cx="20" cy="30" rx="10" ry="16" fill={item.color2} opacity="0.5"/>
            <ellipse cx="35" cy="25" rx="12" ry="18" fill={item.color1} opacity="0.6"/>
            <ellipse cx="48" cy="32" rx="9" ry="14" fill={item.color2} opacity="0.4"/>
            <rect x="5" y="46" width="50" height="8" fill={item.color2} opacity="0.3"/>
          </>}
          {(item.shape === 'massage' || item.shape === 'dinner' || item.shape === 'penthouse') && <>
            <rect x="10" y="15" width="40" height="30" rx="6" fill={item.color1} opacity="0.4"/>
            <circle cx="30" cy="30" r="10" fill={item.color2} opacity="0.5"/>
          </>}
        </svg>
        <span style={{ fontSize: '11px', color: item.color2, fontFamily: 'monospace', opacity: 0.7, textAlign: 'center', padding: '0 8px' }}>
          {item.shape} · photo
        </span>
      </div>
    </div>
  );
}

function Impressionen({ lang }) {
  const t = impressText[lang];
  const [filter, setFilter] = React.useState(0);
  const [lightbox, setLightbox] = React.useState(null);

  const cats_de = ['Alle', 'Spa & Wellness', 'Natur', 'Kulinarik', 'Zimmer'];
  const cats_en = ['All', 'Spa & Wellness', 'Nature', 'Cuisine', 'Rooms'];
  const cats = lang === 'de' ? cats_de : cats_en;

  const filtered = filter === 0 ? GALLERY_ITEMS : GALLERY_ITEMS.filter(item =>
    (lang === 'de' ? item.cat_de : item.cat_en) === cats[filter]
  );

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,5vw,52px)', color: 'var(--green-deep)', marginBottom: '10px' }}>{t.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '40px' }}>{t.subtitle}</p>

        {/* Photo Gallery */}
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--green-deep)', marginBottom: '20px' }}>{t.photos_title}</h2>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {cats.map((c, i) => (
            <button key={i} onClick={() => setFilter(i)} style={{
              background: filter === i ? 'var(--green-deep)' : 'white',
              color: filter === i ? 'white' : 'var(--text-muted)',
              border: `1px solid ${filter === i ? 'var(--green-deep)' : 'oklch(85% 0.04 145)'}`,
              borderRadius: '20px', padding: '7px 18px',
              cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s',
            }}>{c}</button>
          ))}
        </div>

        {/* Masonry-ish grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '72px' }}>
          {filtered.map(item => (
            <div key={item.id} onClick={() => setLightbox(item)} style={{
              borderRadius: '12px', overflow: 'hidden',
              border: '1px solid oklch(88% 0.04 145)',
              cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              background: 'white',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(30,60,30,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
              <GalleryPlaceholder item={item} />
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: '11px', color: 'var(--stone-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  {lang === 'de' ? item.cat_de : item.cat_en}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--green-deep)' }}>
                  {lang === 'de' ? item.label_de : item.label_en}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Videos */}
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--green-deep)', marginBottom: '28px' }}>{t.videos_title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
          {VIDEOS.map(v => (
            <div key={v.id} style={{
              borderRadius: '16px', overflow: 'hidden',
              border: '1px solid oklch(88% 0.04 145)',
              background: 'white',
              boxShadow: '0 4px 16px rgba(30,60,30,0.06)',
            }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  src={`https://www.youtube.com/embed/${v.youtube_id}?rel=0&modestbranding=1`}
                  title={lang === 'de' ? v.title_de : v.title_en}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div style={{ padding: '18px 20px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--green-deep)', marginBottom: '8px' }}>
                  {lang === 'de' ? v.title_de : v.title_en}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {lang === 'de' ? v.desc_de : v.desc_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }} onClick={() => setLightbox(null)}>
          <div style={{ maxWidth: '700px', width: '100%' }} onClick={e => e.stopPropagation()}>
            <GalleryPlaceholder item={lightbox} />
            <div style={{ background: 'white', padding: '20px 24px', borderRadius: '0 0 16px 16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--stone-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                {lang === 'de' ? lightbox.cat_de : lightbox.cat_en}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--green-deep)' }}>
                {lang === 'de' ? lightbox.label_de : lightbox.label_en}
              </div>
            </div>
            <button onClick={() => setLightbox(null)} style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(255,255,255,0.2)', border: 'none',
              color: 'white', fontSize: '22px', width: '40px', height: '40px',
              borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Impressionen });
