
const wetterText = {
  de: {
    title: 'Aktuelles Wetter',
    subtitle: 'Oberstdorf, Allgäu · Live-Wetterdaten',
    feels: 'Gefühlt',
    humidity: 'Luftfeuchtigkeit',
    wind: 'Wind',
    pressure: 'Luftdruck',
    visibility: 'Sicht',
    sunrise: 'Sonnenaufgang',
    sunset: 'Sonnenuntergang',
    forecast_title: '5-Tage-Vorschau',
    days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    loading: 'Wetterdaten werden geladen…',
    error: 'Wetterdaten konnten nicht geladen werden.',
    tip_title: 'Wellness-Tipp für heute',
    tips: {
      Clear: 'Perfektes Wetter für eine geführte Alpenwanderung! Nutzen Sie den klaren Himmel für Sonnenmeditation auf der Bergwiese.',
      Clouds: 'Bewölktes Wetter lädt zum Verweilen im Innenbereich ein — ideal für Ayurveda-Behandlungen oder ein langes Kräuterbad.',
      Rain: 'Regentage sind Spa-Tage. Genießen Sie unsere Thermalbäder und lassen Sie sich mit einer heißen Fango-Packung verwöhnen.',
      Snow: 'Winterzauber! Ein Schneespaziergang gefolgt von heißer Alpenmilch am Kamin — oder ein Saunaaufguss mit Tannenöl.',
      Thunderstorm: 'Perfekte Zeit für innere Einkehr — Meditation, Atemübungen und wohltuende Massagen im geschützten Rahmen.',
      Drizzle: 'Leichter Nieselregen? Wunderschön für einen stillen Spaziergang mit Regenjacke — oder gemütliche Teestunde im Wintergarten.',
      Mist: 'Nebel bringt Magie in die Alpenlandschaft. Ideal für stille Waldspaziergänge und Achtsamkeitsübungen in der Natur.',
    },
  },
  en: {
    title: 'Current Weather',
    subtitle: 'Oberstdorf, Allgäu · Live Weather Data',
    feels: 'Feels like',
    humidity: 'Humidity',
    wind: 'Wind',
    pressure: 'Pressure',
    visibility: 'Visibility',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    forecast_title: '5-Day Forecast',
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    loading: 'Loading weather data…',
    error: 'Weather data could not be loaded.',
    tip_title: "Today's Wellness Tip",
    tips: {
      Clear: 'Perfect weather for a guided alpine hike! Take advantage of the clear sky for sun meditation on the mountain meadow.',
      Clouds: 'Cloudy weather invites you to linger indoors — ideal for Ayurveda treatments or a long herbal bath.',
      Rain: 'Rainy days are spa days. Enjoy our thermal pools and indulge in a hot fango pack.',
      Snow: 'Winter magic! A snow walk followed by hot alpine milk by the fireplace — or a sauna infusion with pine oil.',
      Thunderstorm: 'Perfect time for inner contemplation — meditation, breathing exercises and soothing massages in a sheltered setting.',
      Drizzle: 'Light drizzle? Beautiful for a quiet walk in a rain jacket — or a cozy tea hour in the winter garden.',
      Mist: 'Fog brings magic to the Alpine landscape. Ideal for quiet forest walks and mindfulness exercises in nature.',
    },
  }
};

// Weather icon SVGs
function WeatherIcon({ code, size = 80 }) {
  const isDay = true;
  const s = size;
  if (code === 'Clear') return (
    <svg width={s} height={s} viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="16" fill="#f5c842" opacity="0.95"/>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <line key={i} x1="40" y1="40"
          x2={40 + 28*Math.cos(deg*Math.PI/180)}
          y2={40 + 28*Math.sin(deg*Math.PI/180)}
          stroke="#f5c842" strokeWidth="3" strokeLinecap="round"
          transform={`rotate(0,40,40)`}
          style={{transformOrigin:'40px 40px'}}
        />
      ))}
    </svg>
  );
  if (code === 'Rain' || code === 'Drizzle') return (
    <svg width={s} height={s} viewBox="0 0 80 80">
      <ellipse cx="38" cy="30" rx="20" ry="12" fill="#8ca8c0"/>
      <ellipse cx="52" cy="32" rx="14" ry="10" fill="#a0bcd4"/>
      <line x1="28" y1="50" x2="24" y2="62" stroke="#6a9ab8" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="38" y1="52" x2="34" y2="64" stroke="#6a9ab8" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="48" y1="50" x2="44" y2="62" stroke="#6a9ab8" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
  if (code === 'Snow') return (
    <svg width={s} height={s} viewBox="0 0 80 80">
      <ellipse cx="38" cy="28" rx="18" ry="11" fill="#c4d8e8"/>
      <ellipse cx="52" cy="30" rx="13" ry="9" fill="#d8eaf8"/>
      <text x="23" y="56" fontSize="22" fill="#a0c0e0">❄</text>
      <text x="42" y="58" fontSize="16" fill="#a0c0e0">❄</text>
    </svg>
  );
  if (code === 'Thunderstorm') return (
    <svg width={s} height={s} viewBox="0 0 80 80">
      <ellipse cx="38" cy="26" rx="20" ry="12" fill="#708090"/>
      <ellipse cx="52" cy="28" rx="14" ry="10" fill="#8090a0"/>
      <polygon points="42,38 34,52 40,52 36,66 50,46 43,46" fill="#f5c842"/>
    </svg>
  );
  if (code === 'Mist') return (
    <svg width={s} height={s} viewBox="0 0 80 80">
      <rect x="12" y="28" width="56" height="5" rx="2.5" fill="#b0c4d8" opacity="0.7"/>
      <rect x="18" y="38" width="44" height="5" rx="2.5" fill="#b0c4d8" opacity="0.55"/>
      <rect x="10" y="48" width="50" height="5" rx="2.5" fill="#b0c4d8" opacity="0.4"/>
    </svg>
  );
  // Clouds / default
  return (
    <svg width={s} height={s} viewBox="0 0 80 80">
      <circle cx="32" cy="38" r="10" fill="#c4d4e4"/>
      <circle cx="44" cy="34" r="13" fill="#d4e4f4"/>
      <circle cx="55" cy="39" r="9" fill="#c4d4e4"/>
      <rect x="22" y="38" width="42" height="12" rx="6" fill="#d4e4f4"/>
    </svg>
  );
}

function Wetter({ lang }) {
  const t = wetterText[lang];
  const [weather, setWeather] = React.useState(null);
  const [forecast, setForecast] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const API_KEY = '4f0b5e5e5e5e5e5e5e5e5e5e5e5e5e5e'; // placeholder — using Open-Meteo (no key needed)

  React.useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        // Open-Meteo API — free, no key needed, real data
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=47.41&longitude=10.28&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=5'
        );
        const data = await res.json();
        const c = data.current;
        const d = data.daily;

        function wmoToCondition(code) {
          if (code === 0) return 'Clear';
          if (code <= 3) return 'Clouds';
          if (code <= 49) return 'Mist';
          if (code <= 59) return 'Drizzle';
          if (code <= 69) return 'Rain';
          if (code <= 79) return 'Snow';
          if (code <= 82) return 'Rain';
          if (code <= 84) return 'Snow';
          return 'Thunderstorm';
        }
        function wmoToDesc_de(code) {
          if (code === 0) return 'Klarer Himmel';
          if (code <= 3) return code === 1 ? 'Überwiegend klar' : code === 2 ? 'Teilweise bewölkt' : 'Bedeckt';
          if (code <= 49) return 'Neblig';
          if (code <= 59) return 'Nieselregen';
          if (code <= 69) return code <= 63 ? 'Leichter Regen' : 'Starker Regen';
          if (code <= 79) return 'Schneefall';
          if (code <= 82) return 'Regenschauer';
          return 'Gewitter';
        }
        function wmoToDesc_en(code) {
          if (code === 0) return 'Clear Sky';
          if (code <= 3) return code === 1 ? 'Mainly Clear' : code === 2 ? 'Partly Cloudy' : 'Overcast';
          if (code <= 49) return 'Foggy';
          if (code <= 59) return 'Drizzle';
          if (code <= 69) return code <= 63 ? 'Light Rain' : 'Heavy Rain';
          if (code <= 79) return 'Snowfall';
          if (code <= 82) return 'Rain Showers';
          return 'Thunderstorm';
        }

        setWeather({
          temp: Math.round(c.temperature_2m),
          feels: Math.round(c.apparent_temperature),
          humidity: c.relative_humidity_2m,
          wind: Math.round(c.wind_speed_10m),
          pressure: Math.round(c.surface_pressure),
          visibility: c.visibility ? (c.visibility / 1000).toFixed(1) : '—',
          condition: wmoToCondition(c.weather_code),
          desc_de: wmoToDesc_de(c.weather_code),
          desc_en: wmoToDesc_en(c.weather_code),
          sunrise: new Date(d.sunrise[0]).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
          sunset: new Date(d.sunset[0]).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
        });

        setForecast(d.time.map((time, i) => ({
          time,
          condition: wmoToCondition(d.weather_code[i]),
          desc_de: wmoToDesc_de(d.weather_code[i]),
          desc_en: wmoToDesc_en(d.weather_code[i]),
          max: Math.round(d.temperature_2m_max[i]),
          min: Math.round(d.temperature_2m_min[i]),
        })));

        setLoading(false);
      } catch(e) {
        setError(true); setLoading(false);
      }
    }
    load();
  }, []);

  const statBox = (label, value, unit='') => (
    <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '16px 20px', minWidth: '120px' }}>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: '20px', fontWeight: 600, color: 'white' }}>{value}<span style={{ fontSize: '13px', marginLeft: '2px', opacity: 0.7 }}>{unit}</span></div>
    </div>
  );

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Hero weather card */}
      <div style={{
        background: 'linear-gradient(135deg, oklch(30% 0.09 210) 0%, oklch(38% 0.10 175) 100%)',
        padding: '60px 32px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <svg style={{ position:'absolute', right:0, top:0, opacity:0.08, pointerEvents:'none' }} width="400" height="300" viewBox="0 0 400 300">
          <circle cx="350" cy="50" r="180" fill="white"/>
          <circle cx="100" cy="250" r="120" fill="white"/>
        </svg>

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '6px' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', fontSize: '16px', letterSpacing: '0.08em' }}>
              {t.subtitle}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,4vw,44px)', color: 'white', marginBottom: '40px' }}>{t.title}</h1>

          {loading && <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>{t.loading}</div>}
          {error && <div style={{ color: 'rgba(255,200,100,0.9)', fontSize: '16px' }}>{t.error}</div>}

          {weather && !loading && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '36px', flexWrap: 'wrap' }}>
                <WeatherIcon code={weather.condition} size={100} />
                <div>
                  <div style={{ fontSize: 'clamp(56px,10vw,88px)', fontWeight: 300, color: 'white', lineHeight: 1, fontFamily: 'var(--font-serif)' }}>
                    {weather.temp}°C
                  </div>
                  <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', marginTop: '6px' }}>
                    {lang === 'de' ? weather.desc_de : weather.desc_en}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {statBox(t.feels, `${weather.feels}°C`)}
                {statBox(t.humidity, `${weather.humidity}`, '%')}
                {statBox(t.wind, `${weather.wind}`, ' km/h')}
                {statBox(t.pressure, `${weather.pressure}`, ' hPa')}
                {statBox(t.sunrise, weather.sunrise)}
                {statBox(t.sunset, weather.sunset)}
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* 5-day forecast */}
        {forecast.length > 0 && (
          <>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--green-deep)', marginBottom: '24px' }}>{t.forecast_title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '56px' }}>
              {forecast.map((day, i) => {
                const date = new Date(day.time);
                const dayName = t.days[date.getDay()];
                const dateStr = `${date.getDate()}.${date.getMonth()+1}.`;
                return (
                  <div key={i} style={{
                    background: i === 0 ? 'var(--green-deep)' : 'white',
                    border: '1px solid oklch(88% 0.04 145)',
                    borderRadius: '14px', padding: '18px 12px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: i === 0 ? 'var(--gold)' : 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>{dayName}</div>
                    <div style={{ fontSize: '11px', color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--stone-light)', marginBottom: '10px' }}>{dateStr}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                      <WeatherIcon code={day.condition} size={40} />
                    </div>
                    <div style={{ fontSize: '11px', color: i === 0 ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginBottom: '8px', lineHeight: 1.3 }}>
                      {lang === 'de' ? day.desc_de : day.desc_en}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: i === 0 ? 'white' : 'var(--green-deep)' }}>{day.max}°</span>
                      <span style={{ fontSize: '14px', color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--stone-light)' }}>{day.min}°</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Wellness tip */}
        {weather && (
          <div style={{
            background: 'linear-gradient(135deg, var(--green-deep), var(--green-mid))',
            borderRadius: '20px', padding: '32px 36px',
            display: 'flex', gap: '24px', alignItems: 'flex-start',
          }}>
            <div style={{ fontSize: '40px', flexShrink: 0 }}>🌿</div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--gold)', marginBottom: '12px' }}>{t.tip_title}</h3>
              <p style={{ color: 'var(--green-pale)', lineHeight: 1.7, fontSize: '15px' }}>
                {t.tips[weather.condition] || t.tips['Clouds']}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Wetter });
