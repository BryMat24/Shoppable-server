const express = require('express');
const router = express.Router();

const userRouter = require('./users');
const categoryRouter = require('./categories');

router.use('/', userRouter);
router.use('/categories', categoryRouter);

module.exports = router;