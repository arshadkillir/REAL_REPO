const { Tenant } = require('../models');

// 🧾 Branded Invoice Overlay
exports.getInvoiceOverlay = async (req, res) => {
  const { tenantId } = req.params;

  try {
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Optional: Replace with actual Stripe invoice ID if stored
    const invoiceId = tenant.lastInvoiceId || 'inv_123';
    const invoiceUrl = `https://dashboard.stripe.com/invoices/${invoiceId}`;

    res.json({
      outlet: tenant.name,
      logo: `/assets/${tenant.slug}-logo.png`,
      plan: tenant.plan,
      invoiceUrl
    });
  } catch (err) {
    console.error('Invoice overlay error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
exports.getInvoiceOverlay = async (req, res) => {
  const { tenantId } = req.params;

  try {
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

    const invoiceId = tenant.lastInvoiceId || 'inv_123'; // Replace with real logic
    const invoiceUrl = `https://dashboard.stripe.com/invoices/${invoiceId}`;

    res.json({
      outlet: tenant.name,
      logo: `/assets/${tenant.slug}-logo.png`,
      plan: tenant.plan,
      invoiceUrl
    });
  } catch (err) {
    console.error('Invoice overlay error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
