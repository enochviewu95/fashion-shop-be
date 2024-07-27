const mongoose = require("mongoose");
const { Schema } = mongoose;

const CollectionSchema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    user: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("collections", CollectionSchema);
