import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '', // set VITE_API_BASE in .env for backend proxy
  timeout: 10000
});

export async function fetchTenants() {
  const resp = await api.get('/tenant-status.json').catch(() => null);
  return resp ? resp.data : [];
}

export default api;
