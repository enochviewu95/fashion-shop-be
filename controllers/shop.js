const Product = require("../models/product");
const Banner = require("../models/banner");
const Category = require("../models/categories");
const Collection = require("../models/collection");
const User = require("../models/user")

const SUCCESSMSG = "success";
const FAILEDMSG = "failed";

exports.getShopItems = (req, res, next) => {
  const shop = {
    banner: {},
    product: [],
    category: [],
    collection: [],
    statistics:{
      products:0,
      catalogs:0,
      users:0
    }
  };
  Banner.findOne({ isSelected: true })
    .then((banner) => {
      shop.banner = banner;
      return banner;
    })
    .then(() => {
      return Product.find();
    })
    .then((product) => {
      shop.product = product;
      shop.statistics.products = product.length;
      return product;
    })
    .then(() => {
      return Category.find();
    })
    .then((category) => {
      shop.category = category;
      return category;
    })
    .then(() => {
      return Collection.find();
    })
    .then((collection) => {
      shop.collection = collection;
      shop.statistics.catalogs = collection.length;
      return collection;
   
    })
    .then(()=>{
      return User.find();
    })
    .then(users=>{
      shop.statistics.users = users.length;
      res.status(200).json(shop);
    })
    .catch((err) => {
      res.json({ response: FAILEDMSG, msg: err });
    });
};
