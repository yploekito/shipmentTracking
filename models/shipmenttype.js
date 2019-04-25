'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShipmentType = sequelize.define('ShipmentType', {
    name: DataTypes.STRING
  }, {});
  ShipmentType.associate = function(models) {
    ShipmentType.hasMany(models.TypeProvider)
    // associations can be defined here
  };
  return ShipmentType;
};