const bcrypt = require('bcryptjs'); module.exports.hash = (p)=>bcrypt.hash(p,10); module.exports.compare = (p,h)=>bcrypt.compare(p,h);
