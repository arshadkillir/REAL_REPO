import React, { useEffect, useState } from 'react';
import { fetchTenants } from '../api.js';

export default function Orders() {
  const [tenants, setTenants] = useState(null);

  useEffect(() => {
    fetchTenants().then(data => setTenants(data)).catch(() => setTenants([]));
  }, []);

  return (
    <div>
      <h2>Tenant Dashboard</h2>
      <p className="small">Live tenant status and outlets</p>

      <div className="panel" style={{ marginTop: 12 }}>
        {tenants === null && <div>Loading…</div>}
        {Array.isArray(tenants) && tenants.length === 0 && <div>No tenants found. Add /tenant-status.json to test.</div>}
        {Array.isArray(tenants) && tenants.length > 0 && (
          <table className="table" style={{ marginTop: 8 }}>
            <thead>
              <tr>
                <th>Outlet</th>
                <th>Status</th>
                <th>Active Devices</th>
                <th>Plan</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id || t.name}>
                  <td>{t.name}</td>
                  <td><span className="badge">{t.status}</span></td>
                  <td>{t.devices || 0}</td>
                  <td>{t.plan || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { fetchTenants } from '../api.js';

export default function Orders() {
  const [tenants, setTenants] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchTenants()
      .then((data) => {
        if (!mounted) return;
        setTenants(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error('fetchTenants error', err);
        setError('Failed to load tenant data');
        setTenants([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2>Tenant Dashboard</h2>
      <p className="small">Live tenant status and outlets</p>

      <div className="panel" style={{ marginTop: 12 }}>
        {loading && <div>Loading…</div>}
        {!loading && error && <div style={{ color: 'crimson' }}>{error}</div>}
        {!loading && !error && Array.isArray(tenants) && tenants.length === 0 && (
          <div>No tenants found. Ensure your backend serves /tenant-status.json or update VITE_API_URL.</div>
        )}
        {!loading && Array.isArray(tenants) && tenants.length > 0 && (
          <table className="table" style={{ marginTop: 8 }}>
            <thead>
              <tr>
                <th>Outlet</th>
                <th>Status</th>
                <th>Active Devices</th>
                <th>Plan</th>
                <th>Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id || t.name}>
                  <td>{t.name}</td>
                  <td><span className="badge">{t.status || 'unknown'}</span></td>
                  <td>{t.devices ?? 0}</td>
                  <td>{t.plan || '—'}</td>
                  <td className="kv">{t.last_seen || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
