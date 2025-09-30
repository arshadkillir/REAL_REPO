import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('Root element not found: ensure <div id="root"></div> exists in index.html');
}

createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
import React, { useEffect } from 'react';
import { getStripe } from '../utils/stripe';

export default function CheckoutButton() {
  useEffect(() => {
    getStripe().then(stripe => {
      if (!stripe) console.warn('Stripe failed to initialize');
    });
  }, []);

  return <button onClick={() => {/* open checkout using backend session */}}>Checkout</button>;
}
