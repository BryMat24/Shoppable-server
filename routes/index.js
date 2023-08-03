const express = require('express');
const router = express.Router();

const userRouter = require('./users');
const categoryRouter = require('./categories');
const productRouter = require('./products');
const wishlistRouter = require('./wishlists');
const authenticate = require('../middleware/authentication');

router.use('/', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);

router.use(authenticate);
router.use('/wishlists', wishlistRouter);

module.exports = router;