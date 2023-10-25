const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },

    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },

    resetToken: String,

    resetTokenExpiration: Date,
  },
  {
    methods: {
      createUser() {
        return this.save(this);
      },
    },

    statics: {
      getUser(email) {
        return this.findOne({ email: email });
      },

      updateUser(userId, update) {
        return this.findOneAndUpdate({ _id: userId }, update);
      },

      deleteUser(userId) {
        return this.deleteOne({ _id: userId });
      },

      localAuthenticate() {
        return {
          options: { usernameField: "email" },
          verify: (username, password, done) => {
            this.findOne({ email: username })
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
          },
        };
      },

      googleAuthenticate() {
        return {
          options: {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
          },
          verify: async function (accessToken, refreshToken, profile, done) {
            try {
              const registeredUser = await this.findOne({
                googleId: profile.id,
              });
              if (!registeredUser) {
                const user = {
                  email: profile.emails[0].value,
                  firstname: profile.name.givenName,
                  lastname: profile.name.familyName,
                  googleId: profile.id,
                  provider: profile.provider,
                  role: "client",
                };

                try {
                  const response = this.save(user);
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
          },
        };
      },

      serializeUser() {
        return function (user, done) {
          process.nextTick(function () {
            done(null, { id: user._id });
          });
        };
      },

      deserializeUser() {
        return function (user, done) {
          process.nextTick(function () {
            this.findOne({ _id: user.id })
              .then((user) => {
                done(null, user);
              })
              .catch((err) => {
                done(err);
              });
          });
        };
      }
    },
  }
);

module.exports = mongoose.model("users", UserSchema);
