const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop')

/* GET home page. */
router.get('/', shopController.getProducts);

module.exports = router;
