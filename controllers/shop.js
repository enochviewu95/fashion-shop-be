const Product = require("../models/product");
const Banner = require("../models/banner");
const Category = require("../models/categories");
const Collection = require("../models/collection");
const User = require("../models/user");
const { Decimal128 } = require("mongodb");
const { default: mongoose } = require("mongoose");
const SUCCESSMSG = "success";

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
    shop.product = await Product.find().populate("category").exec();
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

exports.getCategoryProduct = async (req, res, next) => {
  try {
    const categoryId = new mongoose.Types.ObjectId(req.params.id);
    const query = req.query;
    console.log("This is backend qyuery", query, categoryId);
    const priceFilters = query.price;
    const sortFilter = query.sort;
    const stages = [
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $addFields: {
          categories: {
            $arrayElemAt: ["$categories.title", 0],
          },
        },
      },
      {
        $match: { category: categoryId },
      },
    ];

    if (priceFilters) {
      const priceFiltersValues = JSON.parse(priceFilters);
      console.log("Price filter array object", priceFiltersValues);
      const priceRanges = priceFiltersValues.map((range) => {
        const { min, max } = range;
        if (max) {
          return {
            price: {
              $gte: Decimal128.fromString(min.toString()),
              $lte: Decimal128.fromString(max.toString()),
            },
          };
        }
        return {
          price: {
            $gte: Decimal128.fromString(min.toString()),
          }
        }
      });
      stages.push({
        $match: { $or: priceRanges },
      });
    }

    if (sortFilter) {
      const sortObject = JSON.parse(sortFilter);
      stages.push({
        $sort: sortObject,
      });
    }

    const products = await Product.aggregate(stages);
    res.status(200).json({ msg: SUCCESSMSG, response: products });
  } catch (err) {
    next(err);
  }
};
