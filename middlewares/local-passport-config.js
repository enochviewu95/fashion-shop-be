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
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, result) => {
              if (result !== true) return done(null, false);
              return done(null, user);
            });
          })
          .catch((err) => {
            done(err);
          });
      }
    )
  );
};
