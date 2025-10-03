require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USERNAME || 'posuser',
  password: process.env.DB_PASSWORD || 'changeme',
  database: process.env.DB_DATABASE || 'pos_dev'
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/ping', (req, res) => res.json({ pong: true }));

const port = process.env.PORT || 4000;

/* compatibility route added by automation: respond to /v1/ for frontend proxy */
app.get('/v1/', function(req, res) {
  res.json({ status: 'ok', message: 'v1 root' });
});

app.listen(port, () => console.log(`Backend listening on ${port}`));


try { require('./health-route')(app); } catch(e) { console.error('attachHealth failed', e && e.message); }


