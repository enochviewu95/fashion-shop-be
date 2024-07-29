const express = require("express");
const router = express.Router();
const indexController = require('../controllers/index')

router.get("/", indexController.getIndex);
router.post("/post-test", indexController.postTest);

module.exports = router;
