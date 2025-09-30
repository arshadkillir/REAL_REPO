import React from 'react';

export default function Subscriptions() {
  return (
    <div>
      <h2>Subscriptions</h2>
      <p className="small">Stripe billing links, plan details, and upgrade history.</p>

      <div className="panel" style={{ marginTop: 12 }}>
        <p className="kv">No subscriptions wired. Use Stripe keys in backend and VITE_API_BASE in .env to connect.</p>
      </div>
    </div>
  );
}
