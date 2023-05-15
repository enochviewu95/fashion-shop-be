const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      (username, password, done) => {
        User.findOne({ email: username })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "Incorrect email or password.",
              });
            }
            bcrypt.compare(password, user.password, (err, result) => {
              if (err) done(err);
              if (result === true) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            });
          })
          .catch((err) => {
            done(err);
          });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    process.nextTick(function () {
      done(null, { _id: user.id, isLoggedIn: true });
    });
  });

  passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
      usersession = {};
      usersession.isLoggedIn = user.isLoggedIn;
      User.findOne({ _id: user._id })
        .then((user) => {
          usersession.user = user;
          done(null, usersession);
        })
        .catch((err) => {
          done(err);
        });
    });
  });
};
