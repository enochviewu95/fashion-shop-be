const express = require("express");
const router = express.Router();
const indexController = require('../controllers/index')

router.get("/", indexController.getIndex);
router.get("/get-test", indexController.getTest);

module.exports = router;
