'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'AddressId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Addresses',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'AddressId')
  }
};
