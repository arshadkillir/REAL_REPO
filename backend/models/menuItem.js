module.exports = (sequelize, DataTypes) => sequelize.define('MenuItem', {
  id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
  name:{type:DataTypes.STRING,allowNull:false},
  price:{type:DataTypes.FLOAT,defaultValue:0},
  tenantId:{type:DataTypes.INTEGER}
},{ timestamps:true });