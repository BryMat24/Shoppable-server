'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product);
    }
  }
  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      min: {
        args: [[0]],
        msg: "Quantity cannot be negative"
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });

  Cart.beforeUpdate(async (instance) => {
    if (instance.quantity === 0) {
      await instance.destroy();
    }
  })

  return Cart;
};