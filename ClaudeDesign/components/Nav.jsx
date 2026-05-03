
const NAV_ITEMS = {
  de: [
    { id: 'home',         label: 'Start' },
    { id: 'konfigurator', label: 'Urlaub konfigurieren' },
    { id: 'shop',         label: 'Shop' },
    { id: 'impressionen', label: 'Impressionen' },
    { id: 'wetter',       label: 'Wetter' },
    { id: 'ki',           label: 'KI-Berater' },
  ],
  en: [
    { id: 'home',         label: 'Home' },
    { id: 'konfigurator', label: 'Plan Your Stay' },
    { id: 'shop',         label: 'Shop' },
    { id: 'impressionen', label: 'Gallery' },
    { id: 'wetter',       label: 'Weather' },
    { id: 'ki',           label: 'AI Advisor' },
  ]
};

function Nav({ page, setPage, lang, setLang, cartCount }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const items = NAV_ITEMS[lang];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      height: 'var(--nav-h)',
      background: 'rgba(22,38,22,0.96)',
      backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Logo */}
      <button onClick={() => setPage('home')} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <ellipse cx="14" cy="14" rx="13" ry="13" fill="none" stroke="oklch(72% 0.12 85)" strokeWidth="1.2"/>
          <path d="M14 4 C14 4 8 10 8 16 C8 19.3 10.7 22 14 22 C17.3 22 20 19.3 20 16 C20 10 14 4 14 4Z" fill="oklch(60% 0.10 148)" opacity="0.7"/>
          <path d="M14 8 C14 8 10 13 10 16.5 C10 18.4 11.8 20 14 20 C16.2 20 18 18.4 18 16.5 C18 13 14 8 14 8Z" fill="oklch(72% 0.12 85)" opacity="0.8"/>
        </svg>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '22px',
          fontWeight: 400,
          color: 'var(--cream)',
          letterSpacing: '0.04em',
        }}>Serenity</span>
      </button>

      {/* Desktop nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {items.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            background: page === item.id ? 'rgba(255,255,255,0.10)' : 'none',
            border: 'none',
            borderBottom: page === item.id ? '2px solid var(--gold)' : '2px solid transparent',
            cursor: 'pointer',
            color: page === item.id ? 'var(--cream)' : 'var(--stone-light)',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '0.03em',
            padding: '6px 14px',
            borderRadius: 'var(--r) var(--r) 0 0',
            transition: 'all 0.2s',
            position: 'relative',
          }}>
            {item.id === 'shop' && cartCount > 0 ? (
              <span style={{ position: 'relative' }}>
                {item.label}
                <span style={{
                  position: 'absolute', top: '-8px', right: '-14px',
                  background: 'var(--gold)', color: '#1a2a1a',
                  borderRadius: '50%', width: '16px', height: '16px',
                  fontSize: '10px', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{cartCount}</span>
              </span>
            ) : item.label}
          </button>
        ))}
        {/* Lang toggle */}
        <div style={{
          marginLeft: '16px',
          display: 'flex', gap: '2px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '20px', padding: '3px',
        }}>
          {['de','en'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              background: lang === l ? 'var(--gold)' : 'none',
              border: 'none', cursor: 'pointer',
              color: lang === l ? '#1a2a1a' : 'var(--stone-light)',
              fontFamily: 'var(--font-sans)',
              fontSize: '11px', fontWeight: 600,
              padding: '3px 10px', borderRadius: '16px',
              transition: 'all 0.2s',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>{l}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

Object.assign(window, { Nav });
