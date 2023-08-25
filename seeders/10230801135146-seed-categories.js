'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../db/categories.json');

    data.forEach((el) => {
      delete el.id;
      el.updatedAt = new Date();
      el.createdAt = new Date();
    })

    await queryInterface.bulkInsert('Categories', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories');
  }
};
