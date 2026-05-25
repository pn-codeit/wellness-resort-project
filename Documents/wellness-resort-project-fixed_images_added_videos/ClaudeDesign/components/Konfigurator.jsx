
const konfText = {
  de: {
    title: 'Urlaub konfigurieren',
    subtitle: 'Gestalten Sie Ihren persönlichen Wellness-Aufenthalt Schritt für Schritt.',
    steps: ['Dauer', 'Behandlungen', 'Unterkunft', 'Extras', 'Zusammenfassung'],
    next: 'Weiter',
    back: 'Zurück',
    book: 'Jetzt buchen',
    duration_title: 'Wie lange möchten Sie bleiben?',
    duration_options: [
      { id: 'weekend', label: 'Wochenende', nights: 2, price: 380 },
      { id: 'midweek', label: '4 Nächte', nights: 4, price: 720 },
      { id: 'week', label: '1 Woche', nights: 7, price: 1180 },
      { id: 'twoweeks', label: '2 Wochen', nights: 14, price: 2100 },
    ],
    treatments_title: 'Wählen Sie Ihre Behandlungen',
    treatments_sub: 'Mehrfachauswahl möglich',
    treatments: [
      { id: 'massage', label: 'Klassische Massage', desc: 'Entspannungsmassage 60 Min.', price: 95, icon: '🤲' },
      { id: 'ayurveda', label: 'Ayurveda Abhyanga', desc: 'Ganzköper-Ölmassage 90 Min.', price: 145, icon: '🍃' },
      { id: 'fango', label: 'Fango-Packung', desc: 'Wärmebehandlung mit Heilerde', price: 75, icon: '🌋' },
      { id: 'yoga', label: 'Yoga-Paket', desc: '5 geführte Yoga-Einheiten', price: 120, icon: '🧘' },
      { id: 'sauna', label: 'Sauna-Ritual', desc: 'Aufguss-Zeremonie & Ruheraum', price: 55, icon: '🔥' },
      { id: 'kneipp', label: 'Kneipp-Therapie', desc: 'Wassertreten & Güsse', price: 45, icon: '💧' },
    ],
    accomm_title: 'Unterkunft wählen',
    rooms: [
      { id: 'standard', label: 'Panorama-Zimmer', desc: 'Gemütliches Zimmer mit Bergblick, 22 m²', price_per_night: 0, icon: '🏠' },
      { id: 'superior', label: 'Superior Suite', desc: 'Wohnbereich + Balkon mit Alpenpanorama, 38 m²', price_per_night: 60, icon: '🏡' },
      { id: 'penthouse', label: 'Wellness-Penthouse', desc: 'Private Sauna + Whirlpool + Dachterrasse, 65 m²', price_per_night: 140, icon: '✨' },
    ],
    extras_title: 'Extras & Add-ons',
    extras: [
      { id: 'breakfast', label: 'Frühstücksbuffet', desc: 'Bio-Frühstück täglich', price_per_night: 28, icon: '🥐' },
      { id: 'dinner', label: 'Halbpension', desc: 'Abendmenü inbegriffen', price_per_night: 55, icon: '🍽️' },
      { id: 'transfer', label: 'Airport-Transfer', desc: 'Ab/zum Flughafen München', price: 120, icon: '🚗' },
      { id: 'flowers', label: 'Blumenarrangement', desc: 'Willkommensblumen im Zimmer', price: 35, icon: '💐' },
      { id: 'wine', label: 'Weinpaket', desc: '3 ausgewählte Allgäuer Weine', price: 65, icon: '🍷' },
      { id: 'hiking', label: 'Geführte Wanderung', desc: 'Tagesausflug mit Bergführer', price: 85, icon: '🥾' },
    ],
    summary_title: 'Ihre Buchungsübersicht',
    summary_duration: 'Aufenthalt',
    summary_treatments: 'Behandlungen',
    summary_room: 'Zimmer',
    summary_extras: 'Extras',
    summary_total: 'Gesamtpreis',
    nights_label: 'Nächte',
    book_title: 'Buchung abschließen',
    name_label: 'Vor- & Nachname',
    email_label: 'E-Mail-Adresse',
    phone_label: 'Telefon',
    address_label: 'Straße & Hausnummer',
    city_label: 'PLZ & Ort',
    arrive_label: 'Anreisedatum',
    confirm_btn: 'Jetzt kostenpflichtig buchen',
    success_title: 'Buchung eingegangen! 🌿',
    success_msg: 'Vielen Dank! Wir senden Ihnen in Kürze eine Bestätigung per E-Mail. Wir freuen uns auf Ihren Besuch.',
  },
  en: {
    title: 'Plan Your Stay',
    subtitle: 'Build your personal wellness retreat step by step.',
    steps: ['Duration', 'Treatments', 'Accommodation', 'Extras', 'Summary'],
    next: 'Continue',
    back: 'Back',
    book: 'Book Now',
    duration_title: 'How long would you like to stay?',
    duration_options: [
      { id: 'weekend', label: 'Weekend', nights: 2, price: 380 },
      { id: 'midweek', label: '4 Nights', nights: 4, price: 720 },
      { id: 'week', label: '1 Week', nights: 7, price: 1180 },
      { id: 'twoweeks', label: '2 Weeks', nights: 14, price: 2100 },
    ],
    treatments_title: 'Choose Your Treatments',
    treatments_sub: 'Multiple selections possible',
    treatments: [
      { id: 'massage', label: 'Classic Massage', desc: 'Relaxation massage 60 min.', price: 95, icon: '🤲' },
      { id: 'ayurveda', label: 'Ayurveda Abhyanga', desc: 'Full-body oil massage 90 min.', price: 145, icon: '🍃' },
      { id: 'fango', label: 'Fango Pack', desc: 'Heat treatment with healing clay', price: 75, icon: '🌋' },
      { id: 'yoga', label: 'Yoga Package', desc: '5 guided yoga sessions', price: 120, icon: '🧘' },
      { id: 'sauna', label: 'Sauna Ritual', desc: 'Infusion ceremony & relaxation room', price: 55, icon: '🔥' },
      { id: 'kneipp', label: 'Kneipp Therapy', desc: 'Water treading & affusions', price: 45, icon: '💧' },
    ],
    accomm_title: 'Choose Accommodation',
    rooms: [
      { id: 'standard', label: 'Panorama Room', desc: 'Cozy room with mountain view, 22 m²', price_per_night: 0, icon: '🏠' },
      { id: 'superior', label: 'Superior Suite', desc: 'Living area + balcony with Alpine panorama, 38 m²', price_per_night: 60, icon: '🏡' },
      { id: 'penthouse', label: 'Wellness Penthouse', desc: 'Private sauna + whirlpool + rooftop terrace, 65 m²', price_per_night: 140, icon: '✨' },
    ],
    extras_title: 'Extras & Add-ons',
    extras: [
      { id: 'breakfast', label: 'Breakfast Buffet', desc: 'Organic breakfast daily', price_per_night: 28, icon: '🥐' },
      { id: 'dinner', label: 'Half Board', desc: 'Evening menu included', price_per_night: 55, icon: '🍽️' },
      { id: 'transfer', label: 'Airport Transfer', desc: 'To/from Munich Airport', price: 120, icon: '🚗' },
      { id: 'flowers', label: 'Flower Arrangement', desc: 'Welcome flowers in room', price: 35, icon: '💐' },
      { id: 'wine', label: 'Wine Package', desc: '3 selected Allgäu wines', price: 65, icon: '🍷' },
      { id: 'hiking', label: 'Guided Hike', desc: 'Day trip with mountain guide', price: 85, icon: '🥾' },
    ],
    summary_title: 'Your Booking Summary',
    summary_duration: 'Stay',
    summary_treatments: 'Treatments',
    summary_room: 'Room',
    summary_extras: 'Extras',
    summary_total: 'Total',
    nights_label: 'nights',
    book_title: 'Complete Booking',
    name_label: 'Full Name',
    email_label: 'Email Address',
    phone_label: 'Phone',
    address_label: 'Street & Number',
    city_label: 'ZIP & City',
    arrive_label: 'Arrival Date',
    confirm_btn: 'Confirm & Pay',
    success_title: 'Booking received! 🌿',
    success_msg: 'Thank you! We will send you a confirmation by email shortly. We look forward to your visit.',
  }
};

function Konfigurator({ lang }) {
  const t = konfText[lang];
  const [step, setStep] = React.useState(0);
  const [duration, setDuration] = React.useState(null);
  const [treatments, setTreatments] = React.useState([]);
  const [room, setRoom] = React.useState(null);
  const [extras, setExtras] = React.useState([]);
  const [form, setForm] = React.useState({ name:'', email:'', phone:'', address:'', city:'', arrive:'' });
  const [booked, setBooked] = React.useState(false);

  const dur = t.duration_options.find(d => d.id === duration);
  const nights = dur ? dur.nights : 0;

  function calcTotal() {
    let total = 0;
    if (dur) total += dur.price;
    treatments.forEach(tid => {
      const tr = t.treatments.find(x => x.id === tid);
      if (tr) total += tr.price;
    });
    if (room) {
      const r = t.rooms.find(x => x.id === room);
      if (r) total += r.price_per_night * nights;
    }
    extras.forEach(eid => {
      const ex = t.extras.find(x => x.id === eid);
      if (!ex) return;
      if (ex.price_per_night) total += ex.price_per_night * nights;
      else if (ex.price) total += ex.price;
    });
    return total;
  }

  function toggleTreatment(id) {
    setTreatments(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }
  function toggleExtra(id) {
    setExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const canNext = [
    !!duration,
    true,
    !!room,
    true,
    Object.values(form).every(v => v.trim()),
  ][step];

  function handleBook() {
    if (Object.values(form).every(v => v.trim())) setBooked(true);
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1px solid oklch(80% 0.05 145)',
    borderRadius: '8px', fontFamily: 'var(--font-sans)',
    fontSize: '14px', color: 'var(--text)',
    background: 'white', outline: 'none',
    transition: 'border-color 0.2s',
  };

  if (booked) {
    return (
      <div className="page-enter" style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '48px 32px' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🌿</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', color: 'var(--green-deep)', marginBottom: '16px' }}>{t.success_title}</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '15px' }}>{t.success_msg}</p>
          <button onClick={() => { setBooked(false); setStep(0); setDuration(null); setTreatments([]); setRoom(null); setExtras([]); }} style={{
            marginTop: '32px', background: 'var(--green-deep)', color: 'var(--cream)',
            border: 'none', cursor: 'pointer', padding: '12px 32px', borderRadius: '24px',
            fontFamily: 'var(--font-sans)', fontSize: '14px',
          }}>← {lang === 'de' ? 'Neue Buchung' : 'New Booking'}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--cream)', padding: 'calc(var(--nav-h) + 48px) 24px 80px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,5vw,52px)', color: 'var(--green-deep)', marginBottom: '10px' }}>{t.title}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '15px' }}>{t.subtitle}</p>

        {/* Progress steps */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '48px', overflowX: 'auto' }}>
          {t.steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < t.steps.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: i < step ? 'var(--green-mid)' : i === step ? 'var(--green-deep)' : 'var(--cream-dark)',
                  border: i === step ? '2px solid var(--green-deep)' : '2px solid transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i <= step ? 'white' : 'var(--stone-light)',
                  fontSize: '12px', fontWeight: 600, flexShrink: 0,
                  transition: 'all 0.3s',
                }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '11px', color: i === step ? 'var(--green-deep)' : 'var(--text-muted)', fontWeight: i === step ? 500 : 400, whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < t.steps.length - 1 && (
                <div style={{ height: '2px', flex: 1, background: i < step ? 'var(--green-mid)' : 'var(--cream-dark)', margin: '0 4px', marginBottom: '22px', transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', border: '1px solid oklch(88% 0.04 145)', minHeight: '320px' }}>

          {/* Step 0: Duration */}
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--green-deep)', marginBottom: '28px' }}>{t.duration_title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                {t.duration_options.map(d => (
                  <button key={d.id} onClick={() => setDuration(d.id)} style={{
                    background: duration === d.id ? 'var(--green-deep)' : 'var(--cream-dark)',
                    border: `2px solid ${duration === d.id ? 'var(--green-deep)' : 'transparent'}`,
                    borderRadius: '14px', padding: '24px 20px',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s',
                    transform: duration === d.id ? 'scale(1.02)' : 'scale(1)',
                  }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: duration === d.id ? 'var(--gold)' : 'var(--green-deep)', marginBottom: '6px' }}>{d.label}</div>
                    <div style={{ fontSize: '13px', color: duration === d.id ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginBottom: '12px' }}>{d.nights} {t.nights_label}</div>
                    <div style={{ fontSize: '20px', fontWeight: 600, color: duration === d.id ? 'white' : 'var(--green-mid)' }}>ab {d.price} €</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Treatments */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--green-deep)', marginBottom: '6px' }}>{t.treatments_title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>{t.treatments_sub}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                {t.treatments.map(tr => (
                  <button key={tr.id} onClick={() => toggleTreatment(tr.id)} style={{
                    background: treatments.includes(tr.id) ? 'oklch(93% 0.04 145)' : 'var(--cream-dark)',
                    border: `2px solid ${treatments.includes(tr.id) ? 'var(--green-mid)' : 'transparent'}`,
                    borderRadius: '12px', padding: '18px 20px',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s', display: 'flex', gap: '14px', alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '24px' }}>{tr.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{tr.label}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{tr.desc}</div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--green-mid)' }}>+ {tr.price} €</div>
                    </div>
                    {treatments.includes(tr.id) && <span style={{ color: 'var(--green-mid)', fontWeight: 700 }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Room */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--green-deep)', marginBottom: '28px' }}>{t.accomm_title}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {t.rooms.map(r => (
                  <button key={r.id} onClick={() => setRoom(r.id)} style={{
                    background: room === r.id ? 'oklch(93% 0.04 145)' : 'var(--cream-dark)',
                    border: `2px solid ${room === r.id ? 'var(--green-mid)' : 'transparent'}`,
                    borderRadius: '14px', padding: '22px 24px',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '20px',
                  }}>
                    <span style={{ fontSize: '32px' }}>{r.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--green-deep)', marginBottom: '4px' }}>{r.label}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{r.desc}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      {r.price_per_night > 0 ? (
                        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--green-mid)' }}>+ {r.price_per_night} €/Nacht</div>
                      ) : (
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Inkl.</div>
                      )}
                    </div>
                    {room === r.id && <span style={{ color: 'var(--green-mid)', fontSize: '20px' }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Extras */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--green-deep)', marginBottom: '28px' }}>{t.extras_title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                {t.extras.map(ex => (
                  <button key={ex.id} onClick={() => toggleExtra(ex.id)} style={{
                    background: extras.includes(ex.id) ? 'oklch(93% 0.04 145)' : 'var(--cream-dark)',
                    border: `2px solid ${extras.includes(ex.id) ? 'var(--green-mid)' : 'transparent'}`,
                    borderRadius: '12px', padding: '18px 20px',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s', display: 'flex', gap: '14px', alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '24px' }}>{ex.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{ex.label}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{ex.desc}</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--green-mid)' }}>
                        {ex.price_per_night ? `+ ${ex.price_per_night} €/${lang === 'de' ? 'Nacht' : 'night'}` : `+ ${ex.price} €`}
                      </div>
                    </div>
                    {extras.includes(ex.id) && <span style={{ color: 'var(--green-mid)', fontWeight: 700 }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Summary + Booking form */}
          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--green-deep)', marginBottom: '28px' }}>{t.summary_title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Summary */}
                <div>
                  <div style={{ background: 'var(--cream-dark)', borderRadius: '12px', padding: '20px' }}>
                    {dur && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid oklch(88% 0.04 145)' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{t.summary_duration}: {dur.label}</span>
                        <span style={{ fontWeight: 600, fontSize: '14px' }}>{dur.price} €</span>
                      </div>
                    )}
                    {treatments.length > 0 && treatments.map(tid => {
                      const tr = t.treatments.find(x => x.id === tid);
                      return tr ? (
                        <div key={tid} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid oklch(88% 0.04 145)' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{tr.icon} {tr.label}</span>
                          <span style={{ fontWeight: 600, fontSize: '14px' }}>+ {tr.price} €</span>
                        </div>
                      ) : null;
                    })}
                    {room && (() => {
                      const r = t.rooms.find(x => x.id === room);
                      return r && r.price_per_night > 0 ? (
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid oklch(88% 0.04 145)' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{r.icon} {r.label}</span>
                          <span style={{ fontWeight: 600, fontSize: '14px' }}>+ {r.price_per_night * nights} €</span>
                        </div>
                      ) : null;
                    })()}
                    {extras.map(eid => {
                      const ex = t.extras.find(x => x.id === eid);
                      if (!ex) return null;
                      const price = ex.price_per_night ? ex.price_per_night * nights : ex.price;
                      return (
                        <div key={eid} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid oklch(88% 0.04 145)' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{ex.icon} {ex.label}</span>
                          <span style={{ fontWeight: 600, fontSize: '14px' }}>+ {price} €</span>
                        </div>
                      );
                    })}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0', marginTop: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--green-deep)', fontWeight: 600 }}>{t.summary_total}</span>
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--green-deep)', fontWeight: 600 }}>{calcTotal()} €</span>
                    </div>
                  </div>
                </div>

                {/* Booking form */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--green-deep)', marginBottom: '20px' }}>{t.book_title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { key: 'name', label: t.name_label, type: 'text' },
                      { key: 'email', label: t.email_label, type: 'email' },
                      { key: 'phone', label: t.phone_label, type: 'tel' },
                      { key: 'address', label: t.address_label, type: 'text' },
                      { key: 'city', label: t.city_label, type: 'text' },
                      { key: 'arrive', label: t.arrive_label, type: 'date' },
                    ].map(field => (
                      <div key={field.key}>
                        <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>{field.label}</label>
                        <input
                          type={field.type}
                          value={form[field.key]}
                          onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'var(--green-mid)'}
                          onBlur={e => e.target.style.borderColor = 'oklch(80% 0.05 145)'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px' }}>
          <button onClick={() => setStep(s => s - 1)} disabled={step === 0} style={{
            background: 'none', border: '1px solid var(--green-pale)',
            color: step === 0 ? 'var(--stone-light)' : 'var(--green-mid)',
            fontFamily: 'var(--font-sans)', fontSize: '14px',
            padding: '12px 28px', borderRadius: '24px', cursor: step === 0 ? 'not-allowed' : 'pointer',
            opacity: step === 0 ? 0.4 : 1, transition: 'all 0.2s',
          }}>← {t.back}</button>

          {/* Price indicator */}
          {calcTotal() > 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              <span style={{ color: 'var(--green-deep)', fontWeight: 600, fontSize: '18px' }}>{calcTotal()} €</span>
              <span style={{ marginLeft: '6px' }}>{lang === 'de' ? 'bisher' : 'so far'}</span>
            </div>
          )}

          {step < 4 ? (
            <button onClick={() => setStep(s => s + 1)} disabled={!canNext} style={{
              background: canNext ? 'var(--green-deep)' : 'var(--cream-dark)',
              color: canNext ? 'white' : 'var(--stone-light)',
              border: 'none', fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500,
              padding: '12px 32px', borderRadius: '24px',
              cursor: canNext ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}>{t.next} →</button>
          ) : (
            <button onClick={handleBook} disabled={!canNext} style={{
              background: canNext ? 'var(--gold)' : 'var(--cream-dark)',
              color: canNext ? '#1a2a1a' : 'var(--stone-light)',
              border: 'none', fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
              padding: '14px 36px', borderRadius: '24px',
              cursor: canNext ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}>{t.confirm_btn}</button>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Konfigurator });
