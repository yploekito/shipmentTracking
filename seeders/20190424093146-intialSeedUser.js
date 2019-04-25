'use strict';
const fs = require('fs')
let data = fs.readFileSync('./seeders/dataSeed.csv', 'utf8').split('\r\n').map(function(row){return row.split(',')})
data = data.slice(1)
console.log(data)


module.exports = {
  up: (queryInterface, Sequelize) => {
    let dataInsert = []
    for( let i = 0; i < data.length; i++){
      let currentData = data[i]
      dataInsert.push({
        firstName : currentData[0],
        lastName : currentData[1],
        userName : currentData[2],
        passWord : currentData[3],
        role : currentData[4],
        createdAt : new Date(),
        updatedAt : new Date()
      })
    }
    return queryInterface.bulkInsert('Users', dataInsert, {});
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
