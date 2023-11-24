const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductsSchema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    price: Schema.Types.Decimal128,
    details: String,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    user: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", ProductsSchema);
