const express = require('express');
const router = express.Router();
const Controller = require('../controller/productController')

router.get('/', Controller.getProducts);
router.get('/:id', Controller.getProductDetail);
router.get('/similar/:productId', Controller.getSimilarProducts);
router.get('/newest-release', Controller.getNewestProducts);

module.exports = router;