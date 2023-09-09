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
      async function (accessToken, refreshToken, profile, done) {
        try {
          const registeredUser = await User.findOne({ googleId: profile.id });
          if (!registeredUser) {
            const user = new User({
              email: profile.emails[0].value,
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              googleId: profile.id,
              provider: profile.provider,
              role: "client",
            });

            try {
              const response = user.createUser();
              done(null, response);
            } catch (err) {
              done(err);
            }
          } else {
            done(null, registeredUser);
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
