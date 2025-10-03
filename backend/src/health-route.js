module.exports = function attachHealth(app) {
  try {
    if (!app || typeof app.get !== "function") return;
    app.get("/_health", (req, res) => res.status(200).json({ ok: true }));
    app.get("/", (req, res) => res.status(200).send("pos-backend running"));
  } catch (e) {
    console.error("health-route attach failed", e && e.message);
  }
};
