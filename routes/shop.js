const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");
const cache = require('../middlewares/cache-config')


router.get("/get-shop",shopController.getShopItems)
router.get('/get-product/:id', shopController.getProduct)
router.get("/get-category-product/:id", shopController.getCategoryProduct);

module.exports = router;
