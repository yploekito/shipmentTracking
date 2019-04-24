'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShipmentType = sequelize.define('ShipmentType', {
    name: DataTypes.STRING
  }, {});
  ShipmentType.associate = function(models) {
    // associations can be defined here
  };
  return ShipmentType;
};