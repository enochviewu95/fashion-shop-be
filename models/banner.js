const mongoose = require("mongoose");
const { Schema } = mongoose;

const BannerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: String,
  isSelected: Boolean,
  user: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("banners", BannerSchema);
