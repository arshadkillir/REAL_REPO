/** backend/middleware/tenantResolver.js
 * Simple tenant resolver middleware for header, host, or query-based tenant selection.
 * Saves as UTF-8 without BOM.
 */
module.exports = function tenantResolver(req, res, next) {
  try {
    let tenantId = null;
    if (req.headers['x-tenant-id']) {
      tenantId = String(req.headers['x-tenant-id']).trim();
    } else if (req.query && req.query.tenant) {
      tenantId = String(req.query.tenant).trim();
    } else if (req.headers.host) {
      const host = req.headers.host.split(':')[0];
      const parts = host.split('.');
      if (parts.length > 2) tenantId = parts[0];
    }
    if (!tenantId) tenantId = 'default';
    req.tenant = { id: tenantId };
    if (!global.tenants) global.tenants = {};
    global.tenants[tenantId] = global.tenants[tenantId] || { id: tenantId };
    next();
  } catch (err) {
    console.error('tenantResolver error', err);
    res.status(500).json({ error: 'Tenant resolution failed' });
  }
};
