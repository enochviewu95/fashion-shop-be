const express = require("express");
const authController = require("../controllers/auth");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google/callback",
  passport.authenticate("google", (failedRedirect = "/fashion-shop-fe/login")),
  function (req, res) {
    res.redirect("http://localhost:3000/fashion-shop-fe");
  }
);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.post("/login", authController.postLogin);
router.get("/login",authController.getUser)
router.post("/signup", authController.postSignup);
router.post("/logout", authController.postLogout);

module.exports = router;
