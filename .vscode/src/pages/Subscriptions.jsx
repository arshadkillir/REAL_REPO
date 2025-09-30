import React from 'react';
import BillingWidget from '../components/BillingWidget';

export default function Subscriptions() {
  return (
    <div style={{ padding: 32 }}>
      <h2>Subscription Details</h2>
      <BillingWidget />
    </div>
  );
}
