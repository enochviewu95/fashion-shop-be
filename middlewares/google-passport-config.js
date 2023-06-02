const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id })
          .then((registeredUser) => {
            if (!registeredUser) {
              const user = new User({
                email: profile.emails[0].value,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                googleId: profile.id,
                provider: profile.provider,
                role:"client"
              });
              user
                .createUser()
                .then(() => {
                  done(null, profile);
                })
                .catch((err) => {
                  done(err);
                });
            } else {
              done(null, registeredUser);
            }
          })
          .catch((err) => {
            done(err);
          });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    process.nextTick(function () {
      done(null, { id: user.googleId });
    });
  });

  passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
      User.findOne({ googleId: user.id })
        .then((user) => {
          done(null, user);
        })
        .catch((err) => {
          done(err);
        });
    });
  });
};
