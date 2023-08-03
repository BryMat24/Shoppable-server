const express = require('express');
const router = express.Router();

const userRouter = require('./users');
const categoryRouter = require('./categories');
const productRouter = require('./products');

router.use('/', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);

module.exports = router;