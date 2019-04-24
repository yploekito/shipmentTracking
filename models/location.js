'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    currentLocation: DataTypes.STRING,
    area: DataTypes.STRING,
    AWBId: DataTypes.INTEGER
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};