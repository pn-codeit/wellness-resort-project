
const kiText = {
  de: {
    title: 'KI-Wellness-Berater',
    subtitle: 'Beschreiben Sie Ihre Stimmung, Ihre Ziele oder Ihre Beschwerden — unser KI-Berater empfiehlt Ihnen passende Wellness-Pakete und Behandlungen.',
    placeholder: 'Wie fühlen Sie sich heute? Was erhoffen Sie sich von Ihrem Aufenthalt? (z.B. „Ich bin sehr gestresst und brauche Ruhe" oder „Ich möchte meinen Körper entgiften und neue Energie tanken")',
    send: 'Beratung starten',
    thinking: 'Berater denkt nach…',
    clear: 'Neue Beratung',
    example_title: 'Beispiel-Eingaben:',
    examples: [
      'Ich bin total ausgebrannt und habe seit Wochen nicht richtig geschlafen.',
      'Ich möchte mich körperlich reinigen und mit mehr Energie nach Hause fahren.',
      'Ich leide unter Rückenschmerzen und Verspannungen im Nackenbereich.',
      'Wir feiern unseren Hochzeitstag und suchen etwas Romantisches.',
    ],
    packages_title: 'Empfohlene Pakete',
    book_cta: 'Paket buchen',
  },
  en: {
    title: 'AI Wellness Advisor',
    subtitle: 'Describe your mood, goals or concerns — our AI advisor will recommend the perfect wellness packages and treatments for you.',
    placeholder: 'How are you feeling today? What do you hope to get out of your stay? (e.g. "I\'m very stressed and need rest" or "I want to detox and recharge my energy")',
    send: 'Get Advice',
    thinking: 'Advisor is thinking…',
    clear: 'New Consultation',
    example_title: 'Example inputs:',
    examples: [
      'I\'m completely burnt out and haven\'t slept properly in weeks.',
      'I want to cleanse my body and go home with more energy.',
      'I suffer from back pain and tension in my neck.',
      'We\'re celebrating our anniversary and looking for something romantic.',
    ],
    packages_title: 'Recommended Packages',
    book_cta: 'Book Package',
  }
};

const GEMINI_KEY = 'AIzaSyCZODbjdzFN-nPYbgCHXHfXn5E-MCsvEbg';

function KIBerater({ lang, setPage }) {
  const t = kiText[lang];
  const [input, setInput] = React.useState('');
  const [response, setResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const chatEndRef = React.useRef(null);

  async function getAdvice() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);

    const systemPrompt = lang === 'de'
      ? `Du bist ein einfühlsamer Wellness-Berater des Serenity Resorts in Oberstdorf, Allgäu. 
Das Resort bietet folgende Behandlungen an: Klassische Massage (95€), Ayurveda Abhyanga (145€), Fango-Packung (75€), Yoga-Paket (120€), Sauna-Ritual (55€), Kneipp-Therapie (45€).
Unterkunftsoptionen: Panorama-Zimmer (inkl.), Superior Suite (+60€/Nacht), Wellness-Penthouse (+140€/Nacht).
Aufenthaltsdauer: Wochenende (380€), 4 Nächte (720€), 1 Woche (1180€), 2 Wochen (2100€).
Extras: Frühstücksbuffet (28€/Nacht), Halbpension (55€/Nacht), Airport-Transfer (120€), Blumenarrangement (35€), Weinpaket (65€), Geführte Wanderung (85€).

Analysiere die Stimmung und Bedürfnisse des Gastes. Antworte auf Deutsch mit:
1. Einem einfühlsamen, persönlichen Einleitungssatz (1-2 Sätze)
2. Einer konkreten Empfehlung (Aufenthaltsdauer + 2-3 Behandlungen + Unterkunft + passende Extras)
3. Einer kurzen Begründung warum diese Kombination ideal ist (2-3 Sätze)
4. Einem geschätzten Gesamtpreis

Formatiere die Antwort als JSON:
{
  "greeting": "...",
  "recommendation": {
    "duration": "...",
    "treatments": ["...", "..."],
    "room": "...",
    "extras": ["..."],
    "reasoning": "...",
    "total_price": "..."
  }
}`
      : `You are an empathetic wellness advisor at Serenity Resort in Oberstdorf, Allgäu.
The resort offers: Classic Massage (€95), Ayurveda Abhyanga (€145), Fango Pack (€75), Yoga Package (€120), Sauna Ritual (€55), Kneipp Therapy (€45).
Accommodation: Panorama Room (incl.), Superior Suite (+€60/night), Wellness Penthouse (+€140/night).
Stay duration: Weekend (€380), 4 Nights (€720), 1 Week (€1,180), 2 Weeks (€2,100).
Extras: Breakfast Buffet (€28/night), Half Board (€55/night), Airport Transfer (€120), Flower Arrangement (€35), Wine Package (€65), Guided Hike (€85).

Analyze the guest's mood and needs. Reply in English with:
1. An empathetic, personal opening sentence (1-2 sentences)
2. A concrete recommendation (stay duration + 2-3 treatments + accommodation + fitting extras)
3. A brief explanation of why this combination is ideal (2-3 sentences)
4. An estimated total price

Format as JSON:
{
  "greeting": "...",
  "recommendation": {
    "duration": "...",
    "treatments": ["...", "..."],
    "room": "...",
    "extras": ["..."],
    "reasoning": "...",
    "total_price": "..."
  }
}`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: systemPrompt + '\n\nGast-Eingabe: ' + input }] }
            ],
            generationConfig: { temperature: 0.8, maxOutputTokens: 800 }
          })
        }
      );
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setResponse(parsed);
      } else {
        setResponse({ raw: text });
      }
    } catch(e) {
      setError(lang === 'de' ? 'Fehler beim Verbinden mit dem KI-Berater. Bitte versuchen Sie es erneut.' : 'Error connecting to AI advisor. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, oklch(28% 0.08 145) 0%, oklch(36% 0.09 160) 100%)',
        padding: '60px 32px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        <svg style={{ position:'absolute', right:'-40px', top:'-40px', opacity:0.07, pointerEvents:'none' }} width="400" height="400" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="200" fill="white"/>
          <ellipse cx="200" cy="200" rx="120" ry="200" fill="white" transform="rotate(30,200,200)"/>
        </svg>
        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
              background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', marginTop: '4px',
            }}>✨</div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,4vw,48px)', color: 'white', fontWeight: 300, lineHeight: 1.15, marginBottom: '12px' }}>{t.title}</h1>
              <p style={{ color: 'var(--green-pale)', fontSize: '15px', lineHeight: 1.7, maxWidth: '600px' }}>{t.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Input area */}
        {!response && (
          <div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.placeholder}
              rows={5}
              style={{
                width: '100%', padding: '18px 20px',
                border: '2px solid oklch(82% 0.06 145)',
                borderRadius: '16px', fontFamily: 'var(--font-sans)',
                fontSize: '15px', color: 'var(--text)',
                background: 'white', outline: 'none',
                resize: 'vertical', lineHeight: 1.6,
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--green-mid)'}
              onBlur={e => e.target.style.borderColor = 'oklch(82% 0.06 145)'}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button onClick={getAdvice} disabled={loading || !input.trim()} style={{
                background: input.trim() ? 'var(--green-deep)' : 'var(--cream-dark)',
                color: input.trim() ? 'white' : 'var(--stone-light)',
                border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 500,
                padding: '13px 36px', borderRadius: '28px',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s',
              }}>
                {loading ? (
                  <>
                    <span style={{
                      width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white', borderRadius: '50%',
                      display: 'inline-block', animation: 'spin 0.8s linear infinite',
                    }}></span>
                    {t.thinking}
                  </>
                ) : <>✨ {t.send}</>}
              </button>
            </div>

            {/* Examples */}
            <div style={{ marginTop: '36px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 500 }}>{t.example_title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {t.examples.map((ex, i) => (
                  <button key={i} onClick={() => setInput(ex)} style={{
                    background: 'white', border: '1px solid oklch(85% 0.04 145)',
                    borderRadius: '10px', padding: '12px 16px',
                    cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text)',
                    transition: 'all 0.2s', lineHeight: 1.5,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green-mid)'; e.currentTarget.style.background = 'oklch(95% 0.03 145)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'oklch(85% 0.04 145)'; e.currentTarget.style.background = 'white'; }}>
                    „{ex}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: '#fee', border: '1px solid #fcc', borderRadius: '12px', padding: '16px 20px', color: '#a00', fontSize: '14px', marginTop: '16px' }}>
            {error}
          </div>
        )}

        {/* Response */}
        {response && !loading && (
          <div style={{ animation: 'fadeSlideIn 0.5s ease forwards' }}>
            {/* Input recap */}
            <div style={{
              background: 'oklch(94% 0.03 145)', borderRadius: '12px',
              padding: '16px 20px', marginBottom: '24px',
              borderLeft: '3px solid var(--green-mid)',
            }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6 }}>„{input}"</p>
            </div>

            {/* Greeting */}
            {response.greeting && (
              <div style={{ display: 'flex', gap: '14px', marginBottom: '28px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  background: 'var(--green-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px',
                }}>✨</div>
                <div style={{
                  background: 'white', border: '1px solid oklch(88% 0.04 145)',
                  borderRadius: '4px 16px 16px 16px', padding: '16px 20px', flex: 1,
                }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', color: 'var(--green-deep)', lineHeight: 1.7, fontStyle: 'italic' }}>
                    {response.greeting}
                  </p>
                </div>
              </div>
            )}

            {/* Recommendation card */}
            {response.recommendation && (
              <div style={{
                background: 'white', border: '1px solid oklch(85% 0.06 145)',
                borderRadius: '20px', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(30,60,30,0.08)',
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, var(--green-deep), var(--green-mid))',
                  padding: '20px 28px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'white', fontWeight: 400 }}>{t.packages_title}</h3>
                  {response.recommendation.total_price && (
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--gold)', fontWeight: 600 }}>
                      {response.recommendation.total_price}
                    </span>
                  )}
                </div>

                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    {[
                      { label: lang === 'de' ? 'Aufenthalt' : 'Stay', value: response.recommendation.duration, icon: '📅' },
                      { label: lang === 'de' ? 'Zimmer' : 'Room', value: response.recommendation.room, icon: '🏡' },
                    ].map((item, i) => (
                      <div key={i} style={{ background: 'var(--cream-dark)', borderRadius: '12px', padding: '14px 16px' }}>
                        <div style={{ fontSize: '20px', marginBottom: '6px' }}>{item.icon}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{item.label}</div>
                        <div style={{ fontWeight: 500, fontSize: '14px', color: 'var(--green-deep)' }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  {response.recommendation.treatments?.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                        {lang === 'de' ? 'Behandlungen' : 'Treatments'}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {response.recommendation.treatments.map((tr, i) => (
                          <span key={i} style={{
                            background: 'oklch(88% 0.06 145)',
                            color: 'var(--green-deep)', fontSize: '13px', fontWeight: 500,
                            padding: '6px 14px', borderRadius: '20px',
                          }}>🌿 {tr}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {response.recommendation.extras?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                        Extras
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {response.recommendation.extras.map((ex, i) => (
                          <span key={i} style={{
                            background: 'oklch(92% 0.04 85)',
                            color: 'oklch(50% 0.08 85)', fontSize: '13px',
                            padding: '6px 14px', borderRadius: '20px',
                          }}>✦ {ex}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {response.recommendation.reasoning && (
                    <div style={{
                      background: 'oklch(95% 0.04 145)', borderRadius: '12px',
                      padding: '16px 18px', marginBottom: '24px',
                    }}>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                        {response.recommendation.reasoning}
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => setPage('konfigurator')} style={{
                      flex: 1, background: 'var(--gold)', color: '#1a2a1a',
                      border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
                      padding: '13px', borderRadius: '24px',
                      transition: 'background 0.2s',
                    }}>{t.book_cta}</button>
                    <button onClick={() => { setResponse(null); setInput(''); }} style={{
                      background: 'var(--cream-dark)', color: 'var(--text-muted)',
                      border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-sans)', fontSize: '14px',
                      padding: '13px 24px', borderRadius: '24px',
                      transition: 'background 0.2s',
                    }}>{t.clear}</button>
                  </div>
                </div>
              </div>
            )}

            {/* Raw fallback */}
            {response.raw && (
              <div style={{ background: 'white', border: '1px solid oklch(85% 0.04 145)', borderRadius: '16px', padding: '24px', whiteSpace: 'pre-wrap', fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>
                {response.raw}
                <button onClick={() => { setResponse(null); setInput(''); }} style={{
                  marginTop: '16px', display: 'block',
                  background: 'var(--cream-dark)', color: 'var(--text-muted)',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: '13px',
                  padding: '10px 22px', borderRadius: '20px',
                }}>{t.clear}</button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

Object.assign(window, { KIBerater });
