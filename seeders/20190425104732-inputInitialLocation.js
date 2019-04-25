'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Locations', [{
      currentLocation: 'Gateway Jakarta',
      area: 'Jakarta',
      AWBId : '1',
      createdAt : new Date,
      updatedAt : new Date
    },{
      currentLocation: 'Gateway Bandung',
      area: 'Bandung',
      AWBId : '2',
      createdAt : new Date,
      updatedAt : new Date
    },{
      currentLocation: 'Gateway Semarang',
      area: 'Semarang',
      AWBId : '3',
      createdAt : new Date,
      updatedAt : new Date
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
