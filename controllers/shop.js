const Product = require("../models/product");
const Banner = require("../models/banner");
const Category = require("../models/categories");
const Collection = require("../models/collection");

const SUCCESSMSG = "success";
const FAILEDMSG = "failed";

exports.getShopItems = (req, res, next) => {
  const shop = {
    banner: {},
    product: [],
    category: [],
    collection: [],
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
      res.status(200).json(shop);
    })
    .catch((err) => {
      res.json({ response: FAILEDMSG, msg: err });
    });
};

// exports.getProducts = (req, res, next) => {
//     Product.getProducts()
//     .then(result=>{
//         res.status(200).json(result)
//     })
//     .catch(err=>{
//       res.json({ response: FAILEDMSG, msg: err });
//     })
// }

// exports.getSelectedBanner = (req, res, next)=>{
//     Banner.getSelectedBanner()
//     .then(result=>{
//         res.status(200).json(result)
//     })
//     .catch(err=>{
//       res.json({ response: FAILEDMSG, msg: err });
//     })
// }

// exports.getCategories = (req, res, next) => {
//     Category.getCategories()
//       .then((result) => {
//         res.status(200).json(result);
//       })
//       .catch((err) => {
//         res.json({ response: FAILEDMSG, msg: err });
//       });
//   };

//   exports.getCollections = (req, res, next)=>{
//     Collection.getCollections()
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.json({ response: FAILEDMSG, msg: err });
//     });
//   }
