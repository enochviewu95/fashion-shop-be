const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShopSchema = new Schema(
  {
    banner_id: String,
    product_id: String,
    collection_id: String,
    category_id: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("shop", ShopSchema);
