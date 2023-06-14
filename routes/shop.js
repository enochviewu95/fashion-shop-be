const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");
const cache = require('../middlewares/cache-config')

router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/get-shop", cache,  shopController.getShopItems)


module.exports = router;
