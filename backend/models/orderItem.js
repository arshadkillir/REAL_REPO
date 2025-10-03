module.exports = (sequelize, DataTypes) => sequelize.define('OrderItem', {
  id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
  orderId:{type:DataTypes.INTEGER},
  menuItemId:{type:DataTypes.INTEGER,allowNull:true},
  name:{type:DataTypes.STRING},
  quantity:{type:DataTypes.INTEGER,defaultValue:1},
  price:{type:DataTypes.FLOAT,defaultValue:0}
},{ timestamps:true });