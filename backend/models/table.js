module.exports = (sequelize, DataTypes) => sequelize.define('Table', {
  id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
  name:{type:DataTypes.STRING,allowNull:false},
  capacity:{type:DataTypes.INTEGER,defaultValue:4},
  status:{type:DataTypes.STRING,defaultValue:'available'},
  tenantId:{type:DataTypes.INTEGER}
},{ timestamps:true });