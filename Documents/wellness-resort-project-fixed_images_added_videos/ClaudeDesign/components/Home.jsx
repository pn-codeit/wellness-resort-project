
const homeText = {
  de: {
    hero_sub: 'Oberstdorf, Allgäu',
    hero_title: 'Wo Natur und\nStille sich begegnen',
    hero_cta1: 'Urlaub konfigurieren',
    hero_cta2: 'Entdecken',
    features_title: 'Ein Ort für Körper und Geist',
    features: [
      { icon: '🌿', title: 'Naturtherapie', desc: 'Kräuterbäder, Waldbaden und alpine Heilpflanzenkuren inmitten der Allgäuer Berge.' },
      { icon: '💧', title: 'Wasserwelten', desc: 'Thermalbecken, Kneipp-Pfade und ein 25m-Infinity-Pool mit Bergpanorama.' },
      { icon: '🧘', title: 'Yoga & Meditation', desc: 'Tägliche Kurse für alle Levels — vom Morgenritual bis zur Mondmeditation.' },
      { icon: '🍃', title: 'Ayurveda & TCM', desc: 'Ganzheitliche Behandlungen nach jahrtausendealten Traditionen.' },
      { icon: '🏔️', title: 'Alpine Erlebnisse', desc: 'Geführte Wanderungen, Bergkräutertouren und Sonnenaufgangswanderungen.' },
      { icon: '🍽️', title: 'Kulinarik', desc: 'Regionale Bio-Küche, Ayurveda-Menüs und stille Genussabende.' },
    ],
    cta_title: 'Ihr persönlicher Rückzugsort',
    cta_sub: 'Konfigurieren Sie jetzt Ihren individuellen Wellness-Aufenthalt — abgestimmt auf Ihre Bedürfnisse.',
    cta_btn: 'Jetzt gestalten',
  },
  en: {
    hero_sub: 'Oberstdorf, Allgäu',
    hero_title: 'Where Nature and\nSilence Meet',
    hero_cta1: 'Plan Your Stay',
    hero_cta2: 'Discover',
    features_title: 'A Place for Body and Mind',
    features: [
      { icon: '🌿', title: 'Nature Therapy', desc: 'Herbal baths, forest bathing and alpine medicinal plant cures in the heart of the Allgäu.' },
      { icon: '💧', title: 'Water Worlds', desc: 'Thermal pools, Kneipp paths and a 25m infinity pool with mountain panorama.' },
      { icon: '🧘', title: 'Yoga & Meditation', desc: 'Daily classes for all levels — from morning rituals to moonlit meditation.' },
      { icon: '🍃', title: 'Ayurveda & TCM', desc: 'Holistic treatments following millennia-old traditions.' },
      { icon: '🏔️', title: 'Alpine Experiences', desc: 'Guided hikes, mountain herb tours and sunrise walks.' },
      { icon: '🍽️', title: 'Cuisine', desc: 'Regional organic cooking, Ayurveda menus and quiet evenings of indulgence.' },
    ],
    cta_title: 'Your Personal Retreat',
    cta_sub: 'Configure your individual wellness stay now — tailored to your personal needs.',
    cta_btn: 'Start Planning',
  }
};

function Home({ lang, setPage }) {
  const t = homeText[lang];

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* HERO */}
      <section style={{
        minHeight: '92vh',
        background: 'linear-gradient(160deg, oklch(20% 0.07 150) 0%, oklch(28% 0.09 145) 50%, oklch(24% 0.06 160) 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', padding: '60px 24px',
        textAlign: 'center',
      }}>
        {/* Background leaf pattern */}
        <svg style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', opacity:0.06, pointerEvents:'none' }}
          viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="120" cy="80" rx="80" ry="180" fill="oklch(60% 0.10 148)" transform="rotate(-30 120 80)"/>
          <ellipse cx="700" cy="100" rx="60" ry="150" fill="oklch(60% 0.10 148)" transform="rotate(20 700 100)"/>
          <ellipse cx="60" cy="420" rx="50" ry="130" fill="oklch(55% 0.09 148)" transform="rotate(15 60 420)"/>
          <ellipse cx="750" cy="450" rx="70" ry="160" fill="oklch(55% 0.09 148)" transform="rotate(-20 750 450)"/>
          <ellipse cx="400" cy="560" rx="90" ry="50" fill="oklch(50% 0.08 148)" transform="rotate(5 400 560)"/>
          <ellipse cx="250" cy="200" rx="40" ry="100" fill="oklch(65% 0.08 148)" transform="rotate(-45 250 200)"/>
          <ellipse cx="580" cy="300" rx="45" ry="110" fill="oklch(62% 0.08 148)" transform="rotate(35 580 300)"/>
        </svg>

        <div style={{ position:'relative', zIndex:1, maxWidth:'720px' }}>
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            color: 'var(--gold)', fontSize: '18px', letterSpacing: '0.12em',
            marginBottom: '24px', opacity: 0.9,
          }}>{t.hero_sub}</p>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontWeight: 300,
            fontSize: 'clamp(44px, 8vw, 88px)', lineHeight: 1.12,
            color: 'var(--cream)', letterSpacing: '0.01em',
            marginBottom: '40px', whiteSpace: 'pre-line',
          }}>{t.hero_title}</h1>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setPage('konfigurator')} style={{
              background: 'var(--gold)',
              color: '#1a2a1a',
              border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontWeight: 500,
              fontSize: '15px', letterSpacing: '0.04em',
              padding: '14px 36px', borderRadius: '30px',
              transition: 'all 0.25s',
            }} onMouseEnter={e => e.target.style.background='var(--gold-light)'}
               onMouseLeave={e => e.target.style.background='var(--gold)'}>
              {t.hero_cta1}
            </button>
            <button onClick={() => setPage('impressionen')} style={{
              background: 'transparent',
              color: 'var(--cream)',
              border: '1px solid rgba(255,255,255,0.35)', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontWeight: 400,
              fontSize: '15px', letterSpacing: '0.04em',
              padding: '14px 36px', borderRadius: '30px',
              transition: 'all 0.25s',
            }} onMouseEnter={e => { e.target.style.background='rgba(255,255,255,0.08)'; }}
               onMouseLeave={e => { e.target.style.background='transparent'; }}>
              {t.hero_cta2}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          opacity: 0.4,
        }}>
          <div style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, transparent, var(--cream))',
          }}></div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{
        padding: '100px 32px',
        background: 'var(--cream)',
        maxWidth: '1200px', margin: '0 auto',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400,
          fontSize: 'clamp(32px, 4vw, 52px)',
          color: 'var(--green-deep)', textAlign: 'center',
          marginBottom: '64px', letterSpacing: '0.02em',
        }}>{t.features_title}</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {t.features.map((f, i) => (
            <div key={i} style={{
              background: i % 2 === 0 ? 'var(--cream-dark)' : 'white',
              border: '1px solid oklch(88% 0.04 145)',
              borderRadius: '16px', padding: '36px 32px',
              transition: 'transform 0.25s, box-shadow 0.25s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(30,60,30,0.10)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-serif)', fontWeight: 500,
                fontSize: '22px', color: 'var(--green-deep)',
                marginBottom: '12px', letterSpacing: '0.02em',
              }}>{f.title}</h3>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '14px',
                color: 'var(--text-muted)', lineHeight: 1.7,
              }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, var(--green-deep) 0%, var(--green-mid) 100%)',
        padding: '80px 32px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 300,
          fontSize: 'clamp(28px, 4vw, 48px)',
          color: 'var(--cream)', marginBottom: '20px',
          letterSpacing: '0.02em',
        }}>{t.cta_title}</h2>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '16px',
          color: 'var(--green-pale)', maxWidth: '560px',
          margin: '0 auto 36px', lineHeight: 1.7,
        }}>{t.cta_sub}</p>
        <button onClick={() => setPage('konfigurator')} style={{
          background: 'var(--gold)', color: '#1a2a1a',
          border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', fontWeight: 500,
          fontSize: '15px', letterSpacing: '0.04em',
          padding: '14px 40px', borderRadius: '30px',
          transition: 'all 0.25s',
        }} onMouseEnter={e => e.target.style.background='var(--gold-light)'}
           onMouseLeave={e => e.target.style.background='var(--gold)'}>
          {t.cta_btn}
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: 'oklch(18% 0.05 145)',
        padding: '40px 32px',
        textAlign: 'center',
        color: 'var(--stone-light)',
        fontFamily: 'var(--font-sans)',
        fontSize: '13px',
        lineHeight: 1.8,
      }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--gold)', marginBottom: '8px' }}>
          Serenity Resort
        </p>
        <p>Oberstdorfer Str. 42 · 87561 Oberstdorf · Allgäu</p>
        <p style={{ marginTop: '4px', opacity: 0.5 }}>© 2026 Serenity Resort GmbH</p>
      </footer>
    </div>
  );
}

Object.assign(window, { Home, homeText });
