require('dotenv').config(); const express = require('express'); const cors = require('cors'); const { sequelize } = require('./models'); const tenantResolver = require('./middleware/tenantResolver'); const app = express(); app.use(express.json()); app.use(cors()); app.use(tenantResolver);
app.use('/api/tenants', require('./routes/tenantProvisionRoutes'));
app.get('/api/ping', (req,res)=>res.json({ok:true, tenantId: req.tenantId}));
app.get('/health', async (req,res)=>{ try{ await sequelize.authenticate(); res.status(200).json({status:'ok', time:(new Date()).toISOString()}); }catch(e){ res.status(500).json({status:'error', error:String(e)}); } });
app.use((err,req,res,next)=>{ console.error(err); res.status(500).json({error:err.message}); });
async function start(){ await sequelize.sync(); const PORT = process.env.PORT || 4000; app.listen(PORT, ()=>console.log('backend listening',PORT)); } start();
