'use strict';
module.exports = (sequelize, DataTypes) => {
  const AWB = sequelize.define('AWB', {
    UserId: DataTypes.INTEGER,
    TypeProviderId: DataTypes.INTEGER,
    finalLocationArea: DataTypes.STRING
  }, {});
  AWB.associate = function(models) {
    // associations can be defined here
  };
  return AWB;
};