const express = require('express');
const router = express.Router();
const Controller = require('../controller/wishlistController');

router.get('/', Controller.getWishlist);

router.route('/:ProductId')
    .post(Controller.addToWishlist)
    .delete(Controller.deleteFromWishlist)

module.exports = router;

