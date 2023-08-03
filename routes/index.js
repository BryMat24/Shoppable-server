const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authentication');

const userRouter = require('./users');
const categoryRouter = require('./categories');
const productRouter = require('./products');
const wishlistRouter = require('./wishlists');
const cartRouter = require('./cart');

router.use('/', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);

router.use(authenticate);
router.use('/wishlists', wishlistRouter);
router.use('/carts', cartRouter);

module.exports = router;