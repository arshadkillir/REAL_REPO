const express = require('express');
const router = express.Router();

// placeholder for inventoryRoutes — replace with real handlers
router.get('/', (req, res) => res.json({ ok: true, route: 'inventoryRoutes' }));
router.get('/health', (req, res) => res.json({ ok: true, route: 'inventoryRoutes', ts: (new Date()).toISOString() }));

module.exports = router;
