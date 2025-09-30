import React from 'react';

export default function BillingWidget() {
  return (
    <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ color: '#9ca3af', fontSize: 13 }}>Plan: <strong style={{ color: '#fff', marginLeft: 6 }}>Starter</strong></div>
      <button className="button" onClick={() => alert('Open billing modal')}>
        Upgrade
      </button>
    </div>
  );
}
