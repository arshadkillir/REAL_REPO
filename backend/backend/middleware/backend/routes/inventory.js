const express = require('express');
const router = express.Router();
const { requireProPlan } = require('../middleware/planEnforcement');
const { getInventory } = require('../controllers/inventory');

router.get('/inventory', requireProPlan, getInventory);

module.exports = router;
