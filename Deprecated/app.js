require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Page routes
app.get('/', (req, res) => res.render('home', { page: 'home' }));
app.get('/configurator', (req, res) =>
  res.render('configurator', { page: 'configurator', title: 'Wellness Configurator' })
);
app.get('/booking', (req, res) =>
  res.render('booking', { page: 'booking', title: 'Booking' })
);
app.get('/impressions', (req, res) => res.render('impressions', { page: 'impressions' }));
app.get('/weather', (req, res) => res.render('weather', { page: 'weather' }));
app.get('/assistant', (req, res) => res.render('assistant', { page: 'assistant' }));

// API routes
app.use(require('./routes/assistant'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
