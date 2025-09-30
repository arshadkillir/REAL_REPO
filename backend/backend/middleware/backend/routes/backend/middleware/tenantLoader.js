const { Tenant } = require('../models');

// 🔍 Inject tenant into request
async function injectTenant(req, res, next) {
  const tenantId = req.headers['x-tenant-id'];
  if (!tenantId) return res.status(400).json({ error: 'Missing tenant ID' });

  try {
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

    req.tenant = tenant;
    next();
  } catch (err) {
    console.error('Tenant injection error:', err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { injectTenant };
