'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    passWord: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (value, options) => {
          var salt = bcrypt.genSaltSync(10);
          var hashedPassword = bcrypt.hashSync(value.passWord, salt);
          value.passWord = hashedPassword;
      }
    }
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.AWB)
  };

  User.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`
  }

  return User;
};