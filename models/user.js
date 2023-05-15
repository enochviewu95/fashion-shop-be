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
      required: true,
    },

    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
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

      deleteUser(collectionId) {
        return this.deleteOne({ _id: collectionId });
      },
    },
  }
);

module.exports = mongoose.model("users", UserSchema);
