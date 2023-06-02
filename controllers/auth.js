const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const SUCCESSMSG = "success";
const FAILEDMSG = "failed";

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.json({ response: FAILEDMSG, msg: err });
    if (!user) return res.json({ respone: "Invalid email or password" });
    else {
      req.logIn(user, (err) => {
        if (err) return res.json({ response: FAILEDMSG, msg: err });
        return res.json({ response: SUCCESSMSG, msg: info });
      });
    }
  })(req, res, next);
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const provider = "local"
  const role="client"
  User.getUser(email)
    .then((userDoc) => {
      if (userDoc) {
        return res.status(200).json({ response: "Email exist already" });
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
            provider: provider,
            role:role
          });

          return user.save();
        })
        .then(() => {
          res.json({ response: SUCCESSMSG });
        })
        .catch((err) => {
          res.json({ response: FAILEDMSG, msg: err });
        });
    })
    .catch((err) => {
      res.json({ response: FAILEDMSG, msg: err });
    });
};

exports.postLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
    res.json({ response: SUCCESSMSG });
  });
};

exports.getUser = (req, res, next) => {
  if (req.user) {
    return res.status(200).json({
      email: req.user.email,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      role: req.user.role
    });
  }
  return res.status(200).json({});
};
