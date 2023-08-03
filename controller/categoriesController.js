const { Category } = require('../models');

class Controller {
    static async getAllCategories(req, res, next) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = Controller;