const express = require('express');
const router = express.Router();
const Controller = require('../controller/paymentController');

router.post('/', Controller.processPayment);

module.exports = router;