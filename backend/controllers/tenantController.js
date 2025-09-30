const { createTenantSchema } = require('../services/schemaCreator');
const { injectDashboard } = require('../services/dashboardInjector');
const { logEvent } = require('../services/eventLogger');

exports.createTenant = async (req, res) => {
  const { name, slug, theme, plan } = req.body;

  if (!slug || !name) {
    return res.status(400).json({ error: 'slug and name required' });
  }

  try {
    await createTenantSchema(slug);
    await injectDashboard(slug, theme, plan);
    await logEvent('tenant_created', slug);

    res.status(201).json({ message: `Tenant ${slug} created.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
