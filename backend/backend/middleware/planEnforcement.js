// 🔐 Middleware: Require Pro Plan
function requireProPlan(req, res, next) {
  if (req.tenant?.plan !== 'pro') {
    return res.status(403).json({ error: 'Upgrade to Pro required' });
  }
  next();
}

module.exports = { requireProPlan };
