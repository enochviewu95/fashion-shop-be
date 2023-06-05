const mongoose = require("mongoose");
const { Schema } = mongoose;

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

    resetTokenExpiration: Date
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
    },
  }
);

module.exports = mongoose.model("users", UserSchema);
