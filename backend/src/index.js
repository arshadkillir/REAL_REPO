require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
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

// Attach optional external health-route module if present
try {
  const hr = require('./health-route');
  if (typeof hr === 'function') { hr(app); }
} catch (e) {
  console.error('attachHealth failed', e && e.message);
}

// TEMP: add /XR2 health endpoint for quick testing (idempotent)
try {
  if (typeof app !== 'undefined' && app && !app._xr2_temp_added) {
    app.get('/XR2', function (req, res) { res.status(200).send('ok'); });
    app._xr2_temp_added = true;
    console.log('TEMP: /XR2 route added');
  }
} catch (e) {
  console.error('TEMP: failed to add /XR2', e && e.message);
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));

module.exports = app;
