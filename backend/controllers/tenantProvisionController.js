const { provisionTenant } = require('../services/tenantProvisioner');

async function createTenant(req, res) {
  const { name, plan } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });

  try {
    const tenant = await provisionTenant({
      name,
      plan: plan || 'basic',
      seedDemo: true
    });
    res.status(201).json(tenant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listTenants(req, res) {
  const { Tenant } = require('../models');
  try {
    const tenants = await Tenant.findAll();
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createTenant, listTenants };
