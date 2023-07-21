const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");
const cache = require('../middlewares/cache-config')


router.get("/get-shop", cache,  shopController.getShopItems)


module.exports = router;
