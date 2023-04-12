const Product = require("../models/product")

exports.getProducts = (req, res, next) => {
    Product.getProducts()
    .then(result=>{
        res.status(200).json({result})
    })
    .catch(err=>{
       console.log(err)
    })
}