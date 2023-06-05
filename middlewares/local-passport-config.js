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
              done(null, false, {
                message: "Incorrect email or password.",
              });
            }
            bcrypt.compare(password, user.password, (err, result) => {
              if (err) done(err);
              if (result === true) {
                done(null, user);
              } else {
                done(null, false,{message: "Incorrect email or password."});
              }
            });
          })
          .catch((err) => {
            done(err);
          });
      }
    )
  );
};
