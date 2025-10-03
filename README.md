POS SaaS - Complete scaffold with Stripe Checkout (test mode)

Quick start:
1. Extract ZIP
2. Copy backend .env: cp backend/.env.example backend/.env and set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET (from Stripe test account).
3. Copy frontend .env: cp frontend/.env.example frontend/.env and set VITE_STRIPE_PUBLISHABLE_KEY
4. docker compose up --build
5. Visit http://localhost:3000 and go to Subscriptions to create a checkout session (test keys)

Webhook handling:
- For local development, use Stripe CLI or ngrok to forward webhook events to http://localhost:4000/api/billing/webhook
- The webhook endpoint verifies signature and updates the tenant's features when checkout completes.

Notes:
- Price IDs in billingController are placeholders (price_1_basic_demo, price_1_pro_demo). Replace them with real Price IDs from your Stripe account.
