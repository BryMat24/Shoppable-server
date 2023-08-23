'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.User)
      Address.hasOne(models.Order)
    }
  }
  Address.init({
    streetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};