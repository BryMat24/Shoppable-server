const express = require('express');
const router = express.Router();
const Controller = require('../controller/orderController');

router.get('/', Controller.getOrderHistory);
router.get('/:id', Controller.getOrderDetail);
router.patch('/:id', Controller.updateStatusOrder);

module.exports = router;