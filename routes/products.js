const express = require('express');
const router = express.Router();
const Controller = require('../controller/productController')

router.get('/', Controller.getProducts);
router.get('/newest-release', Controller.getNewestProducts);
router.get('/top-rated', Controller.getTopRatedProducts);
router.get('/:id', Controller.getProductDetail);
router.get('/similar/:productId', Controller.getSimilarProducts);


module.exports = router;