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
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "street cannot be empty"
        },
        notEmpty: {
          msg: "street cannot be empty"
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "city cannot be empty"
        },
        notEmpty: {
          msg: "city cannot be empty"
        }
      }
    },
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "country is required"
        },
        notEmpty: {
          msg: "country is required"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};