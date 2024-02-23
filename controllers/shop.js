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
    const query = req.query;
    const pageNumber = query.page;
    console.log("Queries", query);

    // const sortFilter = query.sort;
    const stages = [
      {
        $match: { category: categoryId },
      },
    ];

    if (Object.keys(query).length > 0) {
      const priceRange = query.prices;
      const sortFilter = query.sort;
      if (priceRange !== undefined) {
        console.log("Price filter object", priceRange);
        const priceJson = JSON.parse(priceRange);
        const priceFilters = priceAggregates({
          priceFilter: priceJson,
        });
        stages.push(priceFilters);
      }

      if (sortFilter !== undefined) {
        const sortObject = JSON.parse(sortFilter);
        const sortStage = sortAggregates({ sortFilter: sortObject });
        stages.push(sortStage);
      }
    }

    const paginationStage = paginationAggregate({
      pageNum: pageNumber,
      items_per_page: ITEM_PER_PAGE,
    });
    stages.push(totalCountOfItems());
    stages.push(paginationStage);

    const products = await Product.aggregate(stages);
    
    const data = products.length > 0 ? products[0] : { items: [] };
    data.pageDetails = {};
    data.pageDetails.hasNextPage = ITEM_PER_PAGE * pageNumber < data.totalItems;
    data.pageDetails.hasPreviousPage = pageNumber > 1;
    data.pageDetails.nextPage = parseInt(pageNumber) + 1;
    data.pageDetails.previousPage = parseInt(pageNumber) - 1;
    data.pageDetails.lastPage = Math.ceil(data.totalItems / ITEM_PER_PAGE);
    data.pageDetails.currentPage = parseInt(pageNumber);

    res.status(200).json({ msg: SUCCESSMSG, response: data });
  } catch (err) {
    next(err);
  }
};
