'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypeProvider = sequelize.define('TypeProvider', {
    ProviderId: DataTypes.INTEGER,
    ShipmentTypeId: DataTypes.INTEGER
  }, {});
  TypeProvider.associate = function(models) {
    // associations can be defined here
  };
  return TypeProvider;
};