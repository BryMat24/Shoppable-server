'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.User, { through: models.Wishlist, as: "Wishlists" });
    }
  }
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title is required"
        },
        notEmpty: {
          msg: "title is required"
        },
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imageUrl is required"
        },
        notEmpty: {
          msg: "imageUrl is required"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price is required"
        },
        notEmpty: {
          msg: "price is required"
        },
        min: {
          args: [[0]],
          msg: "price cannot be negative"
        }
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "weight is required"
        },
        notEmpty: {
          msg: "weight is required"
        },
        min: {
          args: [[0]],
          msg: "weight cannot be negative"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "stock is required"
        },
        notEmpty: {
          msg: "stock is required"
        },
        min: {
          args: [[0]],
          msg: "stock cannot be negative"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description is required"
        },
        notEmpty: {
          msg: "description is required"
        },
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "rating is required"
        },
        notEmpty: {
          msg: "rating is required"
        },
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};