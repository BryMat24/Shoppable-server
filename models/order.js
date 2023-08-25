'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User);
      Order.hasMany(models.OrderDetail);
      Order.belongsTo(models.Address)
    }
  }
  Order.init({
    paymentStatus: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "UserId cannot be empty"
        },
        notNull: {
          msg: "UserId cannot be empty"
        }
      }
    },
    AddressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "AddressId cannot be empty"
        },
        notNull: {
          msg: "AddressId cannot be empty"
        }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Total price cannot be empty"
        },
        notNull: {
          msg: "Total price cannot be empty"
        },
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};