'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: DataTypes.STRING
  }, {});
  Provider.associate = function(models) {
    Provider.hasMany(models.TypeProvider)
    // associations can be defined here
  };
  return Provider;
};