const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET); // Load from .env

// 🧾 Fetch latest invoice ID for a Stripe customer
async function fetchLatestInvoice(customerId) {
  try {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 1,
      status: 'paid'
    });

    const latest = invoices.data[0];
    return latest?.id || null;
  } catch (err) {
    console.error('Stripe invoice fetch error:', err.message);
    return null;
  }
}

module.exports = { fetchLatestInvoice };
