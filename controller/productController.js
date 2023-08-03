const { Product } = require('../models');
const { Op } = require("sequelize");

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

    static async getProducts(req, res, next) {
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