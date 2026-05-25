
function App() {
  const [page, setPage] = React.useState('home');
  const [lang, setLang] = React.useState('de');
  const [cart, setCart] = React.useState([]);

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  // Page transition key forces re-mount animation
  const pageKey = page + lang;

  function renderPage() {
    switch (page) {
      case 'home':         return <Home key={pageKey} lang={lang} setPage={setPage} />;
      case 'konfigurator': return <Konfigurator key={pageKey} lang={lang} setPage={setPage} />;
      case 'shop':         return <Shop key={pageKey} lang={lang} cart={cart} setCart={setCart} />;
      case 'impressionen': return <Impressionen key={pageKey} lang={lang} />;
      case 'wetter':       return <Wetter key={pageKey} lang={lang} />;
      case 'ki':           return <KIBerater key={pageKey} lang={lang} setPage={setPage} />;
      default:             return <Home key={pageKey} lang={lang} setPage={setPage} />;
    }
  }

  return (
    <>
      <Nav page={page} setPage={setPage} lang={lang} setLang={setLang} cartCount={cartCount} />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
