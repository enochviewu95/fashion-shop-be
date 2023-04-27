const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/get-products", shopController.getProducts);

router.get("/get-banner",shopController.getSelectedBanner)

router.get("/get-categories",shopController.getCategories)

router.get("/get-collections",shopController.getCollections)

module.exports = router;
