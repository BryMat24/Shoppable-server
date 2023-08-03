const express = require('express');
const router = express.Router();
const Controller = require('../controller/cartController');

router.route('/')
    .get(Controller.getAllCartItems)
    .delete(Controller.deleteUserCart)

router.route('/:ProductId')
    .post(Controller.addToCart)
    .delete(Controller.deleteFromCart)
    .patch(Controller.updateQuantity)

module.exports = router;