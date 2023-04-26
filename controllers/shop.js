const Product = require("../models/product")
const Banner = require('../models/banner');
const Category = require('../models/categories')

exports.getProducts = (req, res, next) => {
    Product.getProducts()
    .then(result=>{
        res.status(200).json({result})
    })
    .catch(err=>{
       console.log(err)
    })
}

exports.getSelectedBanner = (req, res, next)=>{
    Banner.getSelectedBanner()
    .then(result=>{
        res.status(200).json({result})
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getCategories = (req, res, next) => {
    Category.getCategories()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.json({ response: FAILEDMSG, msg: err });
      });
  };

