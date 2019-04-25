'use strict';
module.exports = (sequelize, DataTypes) => {
  const AWB = sequelize.define('AWB', {
    UserId: DataTypes.INTEGER,
    TypeProviderId: DataTypes.INTEGER,
    finalLocationArea: DataTypes.STRING,
    status: DataTypes.STRING,
    finalLocation: DataTypes.STRING

  }, {});
  AWB.associate = function(models) {
    AWB.hasMany(models.Location)
    AWB.belongsTo(models.TypeProvider)
    // associations can be defined here
    AWB.belongsTo(models.User)
  };

  AWB.prototype.updateStatus= function(newStatus){
    this.status=newStatus
  }
  return AWB;
};