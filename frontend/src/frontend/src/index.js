import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import axios from 'axios';

// 🌐 Global tenant header injection
axios.interceptors.request.use(config => {
  const tenantId = localStorage.getItem('tenantId');
  if (tenantId) {
    config.headers['x-tenant-id'] = tenantId;
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
