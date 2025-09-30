module.exports = (sequelize, DataTypes) => sequelize.define('Order', {
  id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
  type:{type:DataTypes.STRING,defaultValue:'dinein'},
  tableId:{type:DataTypes.INTEGER,allowNull:true},
  customerName:{type:DataTypes.STRING},
  status:{type:DataTypes.STRING,defaultValue:'open'},
  total:{type:DataTypes.FLOAT,defaultValue:0},
  tenantId:{type:DataTypes.INTEGER}
},{ timestamps:true });