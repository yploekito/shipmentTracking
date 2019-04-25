'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TypeProviders', [{
      ProviderId: 1,
      ShipmentTypeId: 1,
      createdAt: new Date,
      updatedAt: new Date
    },{
      ProviderId: 1,
      ShipmentTypeId: 2,
      createdAt: new Date,
      updatedAt: new Date
    },{
      ProviderId: 2,
      ShipmentTypeId: 1,
      createdAt: new Date,
      updatedAt: new Date
    },{
      ProviderId: 2,
      ShipmentTypeId: 2,
      createdAt: new Date,
      updatedAt: new Date
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
