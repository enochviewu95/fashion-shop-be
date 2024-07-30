const Product = require("../models/product");
const Banner = require("../models/banner");
const Category = require("../models/categories");
const Collection = require("../models/collection");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");
const {
  priceAggregates,
  sortAggregates,
  totalCountOfItems,
} = require("../aggregates/product_list_stages");
const sortByCategory = require("../aggregates/sort_by_category");
const { paginationAggregate } = require("../aggregates/pagination_stages");
const SUCCESSMSG = "success";
const ITEM_PER_PAGE = 1;
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
    // shop.product = await Product.find().populate("category").exec();
    shop.product = await Category.aggregate(sortByCategory);
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
    const {
      page: currentPage = 1,
      limit = 10,
      created_at,
      price: itemPrice,
    } = req.query;

    // Ensure currentPage and limit are integers
    const page = parseInt(currentPage, 10);
    const perPage = parseInt(limit, 10);

    // Validate page and limit
    if (isNaN(page) || page < 1) throw new Error('Invalid page number');
    if (isNaN(perPage) || perPage < 1) throw new Error('Invalid limit');

    let priceConditions = {};
    if (itemPrice) {
      const priceFilter = JSON.parse(itemPrice);
      const { min, max } = priceFilter;

      if (min !== undefined && max !== undefined) {
        priceConditions = {
          price: { $gte: min, $lte: max }
        };
      } else if (min !== undefined) {
        priceConditions = { price: { $gte: min } };
      } else if (max !== undefined) {
        priceConditions = { price: { $lte: max } };
      }
    }


    const skip = (page - 1) * perPage;
    const totalDocument = await Product.countDocuments({
      category: categoryId,
      ...priceConditions,
    });
    const totalPages = Math.ceil(totalDocument / perPage);
    const sortOrder = created_at === "asc" ? 1 : -1;

    const products = await Product.find({
      category: categoryId,
      ...priceConditions,
    })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: sortOrder })
      .exec();

    res.status(200).json({
      msg: SUCCESSMSG,
      response: products,
      totalDocument,
      totalPages,
      currentPage: page,
      resultsPerPage: perPage,
    });
  } catch (err) {
    next(err);
  }
};


exports.getCollectionProduct = async (req, res, next) => {
  try {
    const collectionId = new mongoose.Types.ObjectId(req.params.id);
    const {
      page: currentPage = 1,
      limit = 10,
      created_at,
      price: itemPrice,
    } = req.query;

    // Ensure currentPage and limit are integers
    const page = parseInt(currentPage, 10);
    const perPage = parseInt(limit, 10);

    // Validate page and limit
    if (isNaN(page) || page < 1) throw new Error('Invalid page number');
    if (isNaN(perPage) || perPage < 1) throw new Error('Invalid limit');

    let priceConditions = {};
    if (itemPrice) {
      const priceFilter = JSON.parse(itemPrice);
      const { min, max } = priceFilter;

      if (min !== undefined && max !== undefined) {
        priceConditions = {
          price: { $gte: min, $lte: max }
        };
      } else if (min !== undefined) {
        priceConditions = { price: { $gte: min } };
      } else if (max !== undefined) {
        priceConditions = { price: { $lte: max } };
      }
    }

    const skip = (page - 1) * perPage;
    const totalDocument = await Product.countDocuments({
      catalog: collectionId,
      ...priceConditions,
    });
    const totalPages = Math.ceil(totalDocument / perPage);
    const sortOrder = created_at === "asc" ? 1 : -1;

    const products = await Product.find({
      catalog: collectionId,
      ...priceConditions,
    })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: sortOrder })
      .exec();

    res.status(200).json({
      msg: SUCCESSMSG,
      response: products,
      totalDocument,
      totalPages,
      currentPage: page,
      resultsPerPage: perPage,
    });
  } catch (err) {
    next(err);
  }
};