'use strict';
module.exports = (sequelize, DataTypes) => {
  const TypeProvider = sequelize.define('TypeProvider', {
    ProviderId: DataTypes.INTEGER,
    ShipmentTypeId: DataTypes.INTEGER
  }, {});
  TypeProvider.associate = function(models) {
    TypeProvider.hasMany(models.AWB)
    TypeProvider.belongsTo(models.Provider)
    TypeProivder.belongsTo(models.ShipmentType)
    // associations can be defined here
  };
  return TypeProvider;
};