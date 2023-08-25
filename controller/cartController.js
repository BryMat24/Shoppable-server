const { Cart, Product, User } = require('../models');

class Controller {
    static async getAllCartItems(req, res, next) {
        try {
            const carts = await Cart.findAll({
                include: Product,
                where: {
                    UserId: req.user.id
                }
            });
            res.status(200).json(carts);
        } catch (err) {
            next(err);
        }
    }

    static async addToCart(req, res, next) {
        try {
            const { quantity } = req.body;
            const productId = req.params.ProductId;
            const product = await Product.findByPk(productId);
            if (!product) throw { name: "NotFound" }

            const cart = await Cart.findOne({
                where: {
                    ProductId: productId,
                    UserId: req.user.id
                }
            })

            if (cart) {
                const currentProductQuantity = quantity ? quantity : cart.quantity + 1;
                await cart.update({ quantity: currentProductQuantity })
            } else if (!cart) {
                await Cart.create({
                    UserId: req.user.id,
                    ProductId: productId,
                    quantity
                })
            }

            res.status(201).json({ message: "Product has been added to cart" })
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async deleteFromCart(req, res, next) {
        try {
            const productId = req.params.ProductId;
            const product = await Product.findByPk(productId);
            if (!product) throw { name: "NotFound" }

            await Cart.destroy({
                where: {
                    UserId: req.user.id,
                    ProductId: productId
                }
            })

            res.status(200).json({ message: "Product has been removed from cart" });
        } catch (err) {
            next(err);
        }
    }

    static async deleteUserCart(req, res, next) {
        try {
            await Cart.destroy({ where: { UserId: req.user.id, } })
            res.status(200).json({ message: "User cart has been emptied" });
        } catch (err) {
            next(err);
        }
    }

    static async updateQuantity(req, res, next) {
        try {
            const productId = req.params.ProductId;
            const product = await Product.findByPk(productId);
            const updateStatus = req.query.updateStatus

            if (!product) throw { name: "NotFound" };

            const cart = await Cart.findOne({
                where: {
                    ProductId: productId,
                    UserId: req.user.id
                }
            })

            if (!cart) throw { name: "NotFound" }

            let currentProductQuantity = cart.quantity;
            if (updateStatus === "increment") currentProductQuantity++
            else currentProductQuantity--

            await cart.update({ quantity: currentProductQuantity })
            res.status(200).json({ message: `Product Cart quantity has been ${updateStatus}` })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller;