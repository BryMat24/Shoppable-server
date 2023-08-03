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
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};