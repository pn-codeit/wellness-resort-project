require('dotenv').config();

const express = require('express');
const path = require('path');
const pagesRouter = require('./routes/pages');
const actionsRouter = require('./routes/actions');

const app = express();
const port = Number(process.env.PORT || 8080);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'frontend-web' });
});

app.use('/', pagesRouter);
app.use('/', actionsRouter);

app.use((req, res) => {
  const content = require('./data/content');
  res.status(404).render('error', {
    lang: 'de',
    langSwitch: 'en',
    navItems: content.navItems.de,
    page: '404',
    title: 'Seite nicht gefunden',
    message: `Die Seite ${req.path} existiert nicht.`
  });
});

app.use((err, _req, res, _next) => {
  const content = require('./data/content');
  console.error(err);
  res.status(500).render('error', {
    lang: 'de',
    langSwitch: 'en',
    navItems: content.navItems.de,
    page: 'error',
    title: 'Fehler',
    message: 'Die Anfrage konnte gerade nicht verarbeitet werden.'
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`frontend-web listening on http://localhost:${port}`);
  });
}

module.exports = app;
