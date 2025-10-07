const express = require("express");
const router = express.Router();

// minimal placeholder endpoints; replace with real logic
router.get("/", (req, res) => res.json({ ok: true, msg: "tenant root" }));
router.get("/health", (req, res) => res.json({ ok: true, service: "tenant" }));

module.exports = router;
