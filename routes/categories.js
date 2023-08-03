const express = require('express');
const router = express.Router();
const Controller = require('../controller/categoriesController')

router.get('/', Controller.getAllCategories);

module.exports = router;