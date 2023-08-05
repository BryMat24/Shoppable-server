const { Product } = require('../models');
const { Op, Sequelize } = require("sequelize");

class Controller {
    static async getProductDetail(req, res, next) {
        try {
            const id = req.params.id;
            const product = await Product.findByPk(id);
            if (!product) throw { name: "NotFound" };

            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

    static async getSimilarProducts(req, res, next) {
        try {
            const productId = req.params.productId;
            const product = await Product.findByPk(productId);
            if (!product) throw { name: 'NotFound' };

            const similarProducts = await Product.findAll({
                where: {
                    CategoryId: product.CategoryId,
                    id: {
                        [Op.ne]: productId
                    }
                },
                order: [[Sequelize.fn('RANDOM')]],
                limit: 4,
            })

            res.status(200).json(similarProducts);
        } catch (err) {
            next(err);
        }
    }

    static async getNewestProducts(req, res, next) {
        try {
            console.log("test");
            const products = await Product.findAll({
                order: [['createdAt', 'DESC']],
                limit: 3
            })

            res.status(200).json(products);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async getTopRatedProducts(req, res, next) {
        try {
            const products = await Product.findAll({
                order: [['rating', 'DESC']],
                limit: 3
            })

            res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    }

    static async getFilteredProducts(req, res, next) {
        try {
            const page = req.query.page || 1;
            const categoryId = req.query.categoryId;
            const limit = 12;
            const offset = (page - 1) * limit;
            const search = req.query.search

            const option = {
                where: {},
                limit,
                offset
            }

            if (search) {
                option.where.title = {
                    [Op.iLike]: `${search}%`
                }
            }

            else if (categoryId) {
                option.where.CategoryId = categoryId;
            }

            const products = await Product.findAll(option)
            res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    }
}


module.exports = Controller;