const { Wishlist, Product } = require('../models');

class Controller {
    static async getWishlist(req, res, next) {
        try {
            const wishlists = await Wishlist.findAll({
                include: Product,
                where: {
                    UserId: req.user.id
                }
            });
            res.status(200).json(wishlists);
        } catch (err) {
            next(err);
        }
    }

    static async addToWishlist(req, res, next) {
        try {
            const productId = req.params.ProductId;
            const product = await Product.findByPk(productId);
            if (!product) throw { name: "NotFound" }

            const wishlist = await Wishlist.findOne({
                where: {
                    ProductId: productId,
                    UserId: req.user.id
                }
            })

            if (wishlist) throw { name: "DuplicateWishlistError" };
            await Wishlist.create({ UserId: req.user.id, ProductId: productId });
            res.status(201).json({ message: "Product has been added to wishlist" })
        } catch (err) {
            next(err);
        }
    }

    static async deleteFromWishlist(req, res, next) {
        try {
            const productId = req.params.ProductId;
            const product = await Product.findByPk(productId);
            if (!product) throw { name: "NotFound" }

            await Wishlist.destroy({
                where: {
                    ProductId: productId,
                    UserId: req.user.id
                }
            })

            res.status(200).json({ message: "Product has been removed from wishlist" })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller;