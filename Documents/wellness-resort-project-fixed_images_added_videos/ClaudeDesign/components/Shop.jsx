
const shopText = {
  de: {
    title: 'Wellness Shop',
    subtitle: 'Bringen Sie das Serenity-Gefühl nach Hause.',
    cart_title: 'Warenkorb',
    cart_empty: 'Ihr Warenkorb ist leer.',
    add_to_cart: 'In den Warenkorb',
    added: 'Hinzugefügt ✓',
    checkout: 'Zur Kasse',
    total: 'Gesamt',
    checkout_title: 'Kasse',
    name_label: 'Vor- & Nachname',
    email_label: 'E-Mail',
    address_label: 'Lieferadresse',
    city_label: 'PLZ & Ort',
    buy_btn: 'Kaufen',
    success_title: 'Bestellung eingegangen! 🌿',
    success_msg: 'Vielen Dank für Ihre Bestellung. Sie erhalten in Kürze eine Bestätigung.',
    filters: ['Alle', 'Pflege', 'Aromatherapie', 'Nahrung', 'Zubehör'],
    qty: 'Menge',
    items: 'Artikel',
    continue: 'Weiter einkaufen',
  },
  en: {
    title: 'Wellness Shop',
    subtitle: 'Bring the Serenity feeling home.',
    cart_title: 'Shopping Cart',
    cart_empty: 'Your cart is empty.',
    add_to_cart: 'Add to Cart',
    added: 'Added ✓',
    checkout: 'Checkout',
    total: 'Total',
    checkout_title: 'Checkout',
    name_label: 'Full Name',
    email_label: 'Email',
    address_label: 'Delivery Address',
    city_label: 'ZIP & City',
    buy_btn: 'Buy Now',
    success_title: 'Order received! 🌿',
    success_msg: 'Thank you for your order. You will receive a confirmation shortly.',
    filters: ['All', 'Care', 'Aromatherapy', 'Nutrition', 'Accessories'],
    qty: 'Qty',
    items: 'items',
    continue: 'Continue shopping',
  }
};

const PRODUCTS = [
  { id: 1, name_de: 'Alpenkräuter Badeöl', name_en: 'Alpine Herb Bath Oil', cat_de: 'Pflege', cat_en: 'Care', price: 34.90, desc_de: 'Regenerierendes Badeöl mit Latschenkiefer, Arnika & Alpenrose', desc_en: 'Regenerating bath oil with mountain pine, arnica & alpine rose', color: '#8aab6e' },
  { id: 2, name_de: 'Bergkristall Gesichtscreme', name_en: 'Mountain Crystal Face Cream', cat_de: 'Pflege', cat_en: 'Care', price: 58.00, desc_de: 'Tiefenwirksame Feuchtigkeitspflege mit Gletscherwasser', desc_en: 'Deep-acting moisturiser with glacial water', color: '#a8c5d8' },
  { id: 3, name_de: 'Lavendel Duftkerze', name_en: 'Lavender Scented Candle', cat_de: 'Aromatherapie', cat_en: 'Aromatherapy', price: 24.90, desc_de: 'Hand gegossene Sojakerze, 40 Std. Brenndauer', desc_en: 'Hand-poured soy candle, 40h burn time', color: '#c5a8d8' },
  { id: 4, name_de: 'Allgäuer Kräutertee Set', name_en: 'Allgäu Herbal Tea Set', cat_de: 'Nahrung', cat_en: 'Nutrition', price: 29.50, desc_de: '6 Sorten alpine Heilkräuter, biologisch zertifiziert', desc_en: '6 varieties of alpine medicinal herbs, organically certified', color: '#b8d4a0' },
  { id: 5, name_de: 'Ätherisches Öl Trio', name_en: 'Essential Oil Trio', cat_de: 'Aromatherapie', cat_en: 'Aromatherapy', price: 42.00, desc_de: 'Bergkiefer, Eukalyptus & Zirbe — 3 × 10 ml', desc_en: 'Mountain pine, eucalyptus & arolla pine — 3 × 10 ml', color: '#a8d4b8' },
  { id: 6, name_de: 'Basalt-Massagestein Set', name_en: 'Basalt Massage Stone Set', cat_de: 'Zubehör', cat_en: 'Accessories', price: 68.00, desc_de: '8 natürliche Basaltsteine für Hot-Stone-Massagen', desc_en: '8 natural basalt stones for hot stone massages', color: '#9a9a9a' },
  { id: 7, name_de: 'Birkenwasser Shampoo', name_en: 'Birch Water Shampoo', cat_de: 'Pflege', cat_en: 'Care', price: 21.90, desc_de: 'Mildes Naturshampoo für kräftiges, glänzendes Haar', desc_en: 'Mild natural shampoo for strong, glossy hair', color: '#d4c4a0' },
  { id: 8, name_de: 'Himalaya Salzkristall Lampe', name_en: 'Himalayan Salt Crystal Lamp', cat_de: 'Zubehör', cat_en: 'Accessories', price: 49.90, desc_de: 'Authentische Salzlampe, ca. 2–3 kg, mit Kabel', desc_en: 'Authentic salt lamp, approx. 2–3 kg, with cable', color: '#e8b89a' },
  { id: 9, name_de: 'Moringa Superfood Pulver', name_en: 'Moringa Superfood Powder', cat_de: 'Nahrung', cat_en: 'Nutrition', price: 27.80, desc_de: '200 g Bio-Moringapulver, kaltgepresst & roh', desc_en: '200 g organic moringa powder, cold-pressed & raw', color: '#9abb7a' },
];

function ProductCard({ product, lang, onAdd, isAdded }) {
  const name = lang === 'de' ? product.name_de : product.name_en;
  const desc = lang === 'de' ? product.desc_de : product.desc_en;
  const t = shopText[lang];

  return (
    <div style={{
      background: 'white', borderRadius: '16px',
      border: '1px solid oklch(88% 0.04 145)',
      overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s',
      display: 'flex', flexDirection: 'column',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(30,60,30,0.10)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
      {/* Product image placeholder */}
      <div style={{
        height: '180px',
        background: `linear-gradient(135deg, ${product.color}33, ${product.color}66)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <rect x="10" y="20" width="60" height="45" rx="8" fill={product.color} opacity="0.4"/>
          <rect x="20" y="10" width="40" height="20" rx="4" fill={product.color} opacity="0.6"/>
          <circle cx="40" cy="40" r="12" fill={product.color} opacity="0.8"/>
        </svg>
        <div style={{
          position: 'absolute', bottom: '8px', right: '8px',
          background: 'white', borderRadius: '12px',
          padding: '3px 10px', fontSize: '12px', fontWeight: 600,
          color: 'var(--green-deep)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>{product.price.toFixed(2)} €</div>
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '11px', color: 'var(--stone-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
          {lang === 'de' ? product.cat_de : product.cat_en}
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', color: 'var(--green-deep)', marginBottom: '8px', lineHeight: 1.3 }}>{name}</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>{desc}</p>
        <button onClick={() => onAdd(product)} style={{
          marginTop: '16px',
          background: isAdded ? 'oklch(93% 0.04 145)' : 'var(--green-deep)',
          color: isAdded ? 'var(--green-mid)' : 'white',
          border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
          padding: '10px 20px', borderRadius: '20px',
          transition: 'all 0.2s',
        }}>{isAdded ? t.added : t.add_to_cart}</button>
      </div>
    </div>
  );
}

function Shop({ lang, cart, setCart }) {
  const t = shopText[lang];
  const [filter, setFilter] = React.useState(0);
  const [justAdded, setJustAdded] = React.useState({});
  const [showCart, setShowCart] = React.useState(false);
  const [showCheckout, setShowCheckout] = React.useState(false);
  const [form, setForm] = React.useState({ name:'', email:'', address:'', city:'' });
  const [ordered, setOrdered] = React.useState(false);

  const cats_de = ['Alle', 'Pflege', 'Aromatherapie', 'Nahrung', 'Zubehör'];
  const cats_en = ['All', 'Care', 'Aromatherapy', 'Nutrition', 'Accessories'];
  const cats = lang === 'de' ? cats_de : cats_en;

  const filtered = filter === 0 ? PRODUCTS : PRODUCTS.filter(p =>
    (lang === 'de' ? p.cat_de : p.cat_en) === cats[filter]
  );

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(x => x.id === product.id);
      if (existing) return prev.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...product, qty: 1 }];
    });
    setJustAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setJustAdded(prev => ({ ...prev, [product.id]: false })), 1500);
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(x => x.id !== id));
  }

  function changeQty(id, delta) {
    setCart(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x));
  }

  const total = cart.reduce((sum, x) => sum + x.price * x.qty, 0);

  function handleOrder() {
    if (Object.values(form).every(v => v.trim())) {
      setOrdered(true);
      setCart([]);
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1px solid oklch(80% 0.05 145)',
    borderRadius: '8px', fontFamily: 'var(--font-sans)',
    fontSize: '14px', color: 'var(--text)',
    background: 'white', outline: 'none', marginBottom: '10px',
  };

  if (ordered) {
    return (
      <div className="page-enter" style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '48px 32px' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px' }}>🛍️</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '34px', color: 'var(--green-deep)', marginBottom: '14px' }}>{t.success_title}</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{t.success_msg}</p>
          <button onClick={() => { setOrdered(false); setShowCheckout(false); setShowCart(false); setForm({ name:'', email:'', address:'', city:'' }); }} style={{
            marginTop: '28px', background: 'var(--green-deep)', color: 'var(--cream)',
            border: 'none', cursor: 'pointer', padding: '12px 32px', borderRadius: '24px',
            fontFamily: 'var(--font-sans)', fontSize: '14px',
          }}>← {t.continue}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,4vw,48px)', color: 'var(--green-deep)', lineHeight: 1.1 }}>{t.title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '8px' }}>{t.subtitle}</p>
          </div>
          <button onClick={() => { setShowCart(true); setShowCheckout(false); }} style={{
            flexShrink: 0,
            background: 'var(--green-deep)', color: 'white',
            border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: '14px',
            padding: '12px 24px', borderRadius: '24px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>🛒</span> {t.cart_title}
            {cart.length > 0 && (
              <span style={{
                background: 'var(--gold)', color: '#1a2a1a',
                borderRadius: '50%', width: '20px', height: '20px',
                fontSize: '11px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{cart.reduce((s,x) => s+x.qty, 0)}</span>
            )}
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '36px', flexWrap: 'wrap' }}>
          {cats.map((c, i) => (
            <button key={i} onClick={() => setFilter(i)} style={{
              background: filter === i ? 'var(--green-deep)' : 'white',
              color: filter === i ? 'white' : 'var(--text-muted)',
              border: `1px solid ${filter === i ? 'var(--green-deep)' : 'oklch(85% 0.04 145)'}`,
              borderRadius: '20px', padding: '7px 18px',
              cursor: 'pointer', fontSize: '13px',
              transition: 'all 0.2s',
            }}>{c}</button>
          ))}
        </div>

        {/* Product grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} lang={lang} onAdd={addToCart} isAdded={!!justAdded[p.id]} />
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex', justifyContent: 'flex-end',
        }} onClick={() => setShowCart(false)}>
          <div style={{
            width: 'min(420px, 100vw)',
            background: 'white', height: '100%',
            overflowY: 'auto', padding: '32px 24px',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', color: 'var(--green-deep)' }}>{t.cart_title}</h2>
              <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
            </div>

            {cart.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '48px' }}>{t.cart_empty}</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex', gap: '14px', alignItems: 'center',
                    padding: '14px 0', borderBottom: '1px solid oklch(90% 0.03 145)',
                  }}>
                    <div style={{
                      width: '52px', height: '52px', borderRadius: '10px', flexShrink: 0,
                      background: `${item.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="28" height="28" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="20" fill={item.color} opacity="0.7"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>
                        {lang === 'de' ? item.name_de : item.name_en}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => changeQty(item.id, -1)} style={{ background: 'var(--cream-dark)', border: 'none', width: '22px', height: '22px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                        <span style={{ fontSize: '13px', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} style={{ background: 'var(--cream-dark)', border: 'none', width: '22px', height: '22px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--green-deep)' }}>{(item.price * item.qty).toFixed(2)} €</div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--stone-light)', fontSize: '11px', cursor: 'pointer', marginTop: '4px' }}>✕</button>
                    </div>
                  </div>
                ))}
                <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--green-pale)', marginTop: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--green-deep)' }}>{t.total}</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: 'var(--green-deep)' }}>{total.toFixed(2)} €</span>
                </div>
                <button onClick={() => { setShowCart(false); setShowCheckout(true); }} style={{
                  width: '100%', background: 'var(--gold)', color: '#1a2a1a',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600,
                  padding: '14px', borderRadius: '24px', marginTop: '8px',
                  transition: 'background 0.2s',
                }}>{t.checkout}</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout modal */}
      {showCheckout && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2100,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }} onClick={() => setShowCheckout(false)}>
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '40px', width: '100%', maxWidth: '480px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.2)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--green-deep)' }}>{t.checkout_title}</h2>
              <button onClick={() => setShowCheckout(false)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
            </div>
            <div style={{ marginBottom: '16px', padding: '12px', background: 'var(--cream-dark)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{cart.reduce((s,x)=>s+x.qty,0)} {t.items}</span>
              <span style={{ fontWeight: 700, color: 'var(--green-deep)' }}>{total.toFixed(2)} €</span>
            </div>
            {[
              { key: 'name', label: t.name_label, type: 'text' },
              { key: 'email', label: t.email_label, type: 'email' },
              { key: 'address', label: t.address_label, type: 'text' },
              { key: 'city', label: t.city_label, type: 'text' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} style={inputStyle} />
              </div>
            ))}
            <button onClick={handleOrder} disabled={!Object.values(form).every(v => v.trim())} style={{
              width: '100%', marginTop: '8px',
              background: Object.values(form).every(v => v.trim()) ? 'var(--gold)' : 'var(--cream-dark)',
              color: Object.values(form).every(v => v.trim()) ? '#1a2a1a' : 'var(--stone-light)',
              border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700,
              padding: '14px', borderRadius: '24px',
              transition: 'all 0.2s',
            }}>{t.buy_btn}</button>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Shop, PRODUCTS });
