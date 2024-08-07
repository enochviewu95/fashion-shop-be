const express = require("express");
const authController = require("../controllers/auth");
const passport = require("passport");
const signupSchema = require("../schemas/auth_schema/signup.schema");
const { validator } = require("../validators/validators");
const signinSchema = require("../schemas/auth_schema/signin.schema");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", (failedRedirect = "/login")),
  function (req, res) {
    console.log('Redirect page')
    res.redirect(process.env.FASHION_DOMAIN_NAME_VALUE); 
  }
);

router.post(
  "/signin",
  signinSchema, validator,
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  authController.getUser
);
router.get("/login", authController.getUser);
router.post("/signup", signupSchema, validator, authController.postSignup);
router.post("/logout", authController.postLogout);
router.post("/reset-password", authController.postReset);
router.post("/set-password", authController.postPassword);

module.exports = router;
