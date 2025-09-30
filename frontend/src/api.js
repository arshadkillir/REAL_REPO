import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export async function fetchTenants() {
  try {
    // if you want local file fallback, request /tenant-status.json when API_BASE is empty
    const url = API_BASE ? '/tenant-status.json' : '/tenant-status.json';
    const resp = await api.get(url);
    return resp.data;
  } catch (err) {
    // try fallback to direct file fetch (useful during front-end-only dev)
    try {
      const fallback = await fetch('/tenant-status.json');
      if (fallback.ok) return await fallback.json();
    } catch (e) {}
    throw err;
  }
}

export default api;
