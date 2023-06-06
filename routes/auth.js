const express = require("express");
const authController = require("../controllers/auth");
const passport = require("passport");
const router = express.Router();
const isLoggedIn = require("../middlewares/is-LoggedIn");

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
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  (req, res) => {
    res.redirect("/auth/login");
  }
);
router.get("/login", authController.getUser);
router.post("/signup", authController.postSignup);
router.post("/logout", authController.postLogout);
router.post("/reset-password", authController.postReset);
router.post("/set-password", authController.postPassword);

module.exports = router;
