// simple seed runner (idempotent)
const { sequelize } = require('./models'); (async ()=>{ try{ const seed = require('./seed'); await seed(); process.exit(0); }catch(e){ console.error(e); process.exit(1); } })();
