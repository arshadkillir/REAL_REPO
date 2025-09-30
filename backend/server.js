require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // ensure ./models exports sequelize
const { injectTenant } = require('./middleware/tenantLoader'); // optional
const tenantResolver = require('./middleware/tenantResolver'); // optional

const app = express();

// Stripe webhook raw body parser for that specific route
app.use((req, res, next) => {
  if (req.originalUrl === '/api/billing/webhook') {
    bodyParser.raw({ type: '*/*' })(req, res, (err) => {
      if (err) return next(err);
      req.rawBody = req.body;
      next();
    });
  } else {
    bodyParser.json()(req, res, next);
  }
});

// CORS
app.use(cors());

// Optional tenant resolver and injector (keep order: resolver -> injector)
if (typeof tenantResolver === 'function') app.use(tenantResolver);
if (typeof injectTenant === 'function') app.use(injectTenant);

// Health check
app.get('/health', (req, res) =>
  res.json({ ok: true, timestamp: new Date().toISOString() })
);

// Mock endpoint for tenant-status (useful for frontend dev)
app.get('/tenant-status.json', (req, res) => {
  res.json([
    { id: 't1', name: 'Outlet Abu Dhabi', status: 'online', devices: 4, plan: 'Pro', last_seen: '2025-09-30T08:12:00Z' },
    { id: 't2', name: 'Outlet Dubai', status: 'offline', devices: 0, plan: 'Starter', last_seen: '2025-09-29T22:45:00Z' }
  ]);
});

// Mount routes (ensure these route modules export an express Router)
app.use('/api/tenants', require('./routes/tenantRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/billing', require('./routes/billingRoutes'));
app.use('/webhook', require('./routes/webhook')); // separate webhook router if needed

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });
global.io = io;

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('join-tenant', (tenantId) => socket.join(`tenant_${tenantId}`));
  socket.on('disconnect', () => console.log('socket disconnected', socket.id));
});

// Optional seed logic
async function seedIfEmpty() {
  try {
    const seed = require('./seed');
    if (typeof seed === 'function') await seed();
  } catch (e) {
    console.error('Seed error (continuing):', e);
  }
}

// Start server (sync DB, seed, then listen)
async function start() {
  try {
    if (sequelize && typeof sequelize.sync === 'function') {
      await sequelize.sync();
    }
    await seedIfEmpty();
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
