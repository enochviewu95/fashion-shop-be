const Product = require("../models/product");
const Banner = require("../models/banner");
const Category = require("../models/categories");
const Collection = require("../models/collection");
const User = require("../models/user");

exports.getShopItems = async (req, res, next) => {
  try {
    const shop = {
      banner: {},
      product: [],
      category: [],
      collection: [],
      statistics: {
        products: 0,
        catalogs: 0,
        users: 0,
      },
    };
    shop.banner = await Banner.findOne({ isSelected: true });
    shop.product = await Product.find().populate('category').exec();
    shop.category = await Category.find();
    shop.collection = await Collection.find();
    let users = await User.find();

    shop.statistics.products = shop.product.length;
    shop.statistics.catalogs = shop.collection.length;
    shop.statistics.users = users.length;

    res.status(200).json(shop);
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
