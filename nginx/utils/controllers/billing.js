const { fetchLatestInvoice } = require('../utils/stripeInvoice');

exports.getInvoiceOverlay = async (req, res) => {
  const { tenant } = req;

  try {
    const invoiceId = await fetchLatestInvoice(tenant.stripeCustomerId);
    const invoiceUrl = invoiceId
      ? `https://dashboard.stripe.com/invoices/${invoiceId}`
      : null;

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
