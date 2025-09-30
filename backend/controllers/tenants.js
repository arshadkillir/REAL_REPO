// backend/routes/tenants.js
const express = require('express');
const router = express.Router();
const { createTenant } = require('../controllers/tenants');

router.post('/api/tenants', createTenant);

module.exports = router;
