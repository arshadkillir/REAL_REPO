// backend/routes/webhook.js
const express = require('express');
const router = express.Router();
const { handleWebhookRaw } = require('../controllers/billing');

router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhookRaw);

module.exports = router;
