// frontend/src/api.js
import axios from 'axios';

axios.interceptors.request.use(config => {
  const tenantId = localStorage.getItem('tenantId');
  if (tenantId) {
    config.headers['x-tenant-id'] = tenantId;
  }
  return config;
});

export default axios;
