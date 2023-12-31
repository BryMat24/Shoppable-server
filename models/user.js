'use strict';
const bcrypt = require('bcryptjs');

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsToMany(models.Product, { through: models.Cart, as: "Carts" });
            User.belongsToMany(models.Product, { through: models.Wishlist, as: "Products" });
            User.hasMany(models.Order);
            User.hasMany(models.Address);
        }
    }
    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Email is required'
                },
                notNull: {
                    msg: 'Email is required'
                },
                isEmail: {
                    msg: "Invalid email format"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password is required'
                },
                notNull: {
                    msg: 'Password is required'
                },
                len: {
                    args: [8],
                    msg: "Password length minimum 8 characters"
                }
            }
        },
        isVerified: DataTypes.BOOLEAN,
        emailToken: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Email token is required'
                },
                notNull: {
                    msg: 'Email token is required'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'User',
    });

    User.beforeCreate((instance) => {
        const salt = bcrypt.genSaltSync(10);
        instance.password = bcrypt.hashSync(instance.password, salt);
    })

    return User;
};