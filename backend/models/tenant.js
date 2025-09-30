module.exports = (sequelize, DataTypes) => sequelize.define('Tenant', {
  id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
  name:{type:DataTypes.STRING},
  slug:{type:DataTypes.STRING,unique:true},
  plan:{type:DataTypes.STRING,defaultValue:'basic'},
  subscriptionStatus:{type:DataTypes.STRING,defaultValue:'inactive'},
  features:{type:DataTypes.JSON,defaultValue:{dinein:true,takeaway:true,delivery:false,inventory:false,purchases:false,accounting:false,kds:false,aggregators:false}},
  active:{type:DataTypes.BOOLEAN,defaultValue:false}
},{ timestamps:true });