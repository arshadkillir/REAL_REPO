const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const { Tenant } = require('../models');

// 🎯 Create Checkout Session
async function createCheckoutSession(req, res) {
  try {
    const { tenantId, plan, email } = req.body;
    if (!tenantId || !plan) {
      return res.status(400).json({ error: 'tenantId and plan required' });
    }

    const priceMapping = {
      basic: 'price_1_basic_demo',
      pro: 'price_1_pro_demo'
    };

    const domain = process.env.FRONTEND_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [{
        price: priceMapping[plan] || priceMapping.basic,
        quantity: 1
      }],
      success_url: `${domain}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/?canceled=true`,
      metadata: { tenantId: String(tenantId), plan }
    });

    res.json({ id: session.id, url: session.url });
  } catch (e) {
    console.error('Stripe checkout error:', e);
    res.status(500).json({ error: e.message });
  }
}
