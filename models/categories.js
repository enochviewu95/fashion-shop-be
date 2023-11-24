const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  user: { type: Schema.Types.ObjectId, ref: "Users" },
}, {
  timestamps:true
});

module.exports = mongoose.model("Category", CategorySchema);
