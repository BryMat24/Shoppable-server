'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../db/products.json');

    data.forEach((el) => {
      delete el.id;
      el.updatedAt = new Date();
      el.createdAt = new Date();
    })

    await queryInterface.bulkInsert('Products', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products');
  }
};
