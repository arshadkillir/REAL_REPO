module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
  email:{type:DataTypes.STRING,unique:true,allowNull:false},
  passwordHash:{type:DataTypes.STRING},
  name:{type:DataTypes.STRING},
  role:{type:DataTypes.STRING,defaultValue:'staff'},
  tenantId:{type:DataTypes.INTEGER}
},{ timestamps:true });