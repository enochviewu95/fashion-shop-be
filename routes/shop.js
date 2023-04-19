const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/get-products", shopController.getProducts);

module.exports = router;
