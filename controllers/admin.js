const Product = require('../models/product')
const Collection = require("../models/collection")
const User = require("../models/user")
const banner = require("../models/banner")

/* This code exports a function named `getProducts` that handles a GET request to retrieve all products
from the database. It calls the `getProducts` method of the `Product` model to retrieve the
products, and then sends the result as a JSON response using the `res.json` method. If there is an
error, it logs the error to the console. */
exports.getProducts = (req, res, next) => {
    Product.getProducts()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
        })
}

/* This code exports a function named `postProducts` that handles a POST request to create a new
product in the database. It extracts the `title`, `description`, and `imageUrl` from the request
body, creates a new `Product` object with these values, and calls the `createProduct` method of the
`Product` model to save the new product to the database. If the operation is successful, it logs the
result to the console. If there is an error, it logs the error to the console. */
exports.postProducts = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price
    const product = new Product({ title, description, imageUrl, price })
    product
        .createProduct()
        .then(() => {
            res.json({ response: "success" })
        })
        .catch(err => {
            console.log(err)
        })
}

/* `exports.editProduct` is a function that handles a PUT request to update an existing product in the
database. It extracts the updated product information from the request body and the product ID from
the request parameters. It then calls the `updateProduct` method of the `Product` model to update
the product in the database. If the operation is successful, it sends a JSON response with a success
message using the `res.json` method. If there is an error, it logs the error to the console. */
exports.editProduct = (req, res, next) => {
    const updatedProduct = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price
    }
    const prodId = req.params.productId;
    Product
        .updateProduct(prodId, updatedProduct)
        .then(() => {
            res.json({ response: 'success' })
        })
        .catch(err => {
            console.log(err)
        })
}

/* This code exports a function named `deleteProduct` that handles a DELETE request to delete a product
from the database. It extracts the `productId` from the request parameters, calls the
`deleteProduct` method of the `Product` model to delete the product from the database. If the
operation is successful, it sends a JSON response with a success message using the `res.json`
method. If there is an error, it logs the error to the console. */
exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteProduct(prodId)
        .then(() => {
            res.json({ response: "success" })
        }).
        catch(err => {
            console.log(err);
        })
}



/* `exports.postCollection` is a function that handles a POST request to create a new collection in the
database. It extracts the `title`, `description`, and `imageUrl` from the request body, creates a
new `Collection` object with these values, and calls the `createCollection` method of the
`Collection` model to save the new collection to the database. If the operation is successful, it
sends a JSON response with a success message using the `res.json` method. If there is an error, it
logs the error to the console. */
exports.postCollection = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price
    const product = new Collection({ title, description, imageUrl })
    product
        .createCollection()
        .then(() => {
            res.json({ response: "success" })
        })
        .catch(err => {
            console.log(err)
        })
}

/* `exports.getCollection` is a function that handles a GET request to retrieve all collections from
the database. It calls the `getCollections` method of the `Collection` model to retrieve the
collections, and then sends the result as a JSON response using the `res.json` method. If there is
an error, it logs the error to the console. */
exports.getCollection = (req, res, next) => {
    Collection.getCollections()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
        })
}

/* `exports.editCollection` is a function that handles a PUT request to update an existing collection
in the database. It extracts the updated collection information from the request body and the
collection ID from the request parameters. It then calls the `updateProduct` method of the `Product`
model to update the collection in the database. If the operation is successful, it sends a JSON
response with a success message using the `res.json` method. If there is an error, it logs the error
to the console. */
exports.editCollection = (req, res, next) => {
    const updatedCollection = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    }
    const collectionId = req.params.collectionId;
    Product
        .updateProduct(collectionId, updatedCollection)
        .then(() => {
            res.json({ response: 'success' })
        })
        .catch(err => {
            console.log(err)
        })
}

/* This code exports a function named `deleteCollection` that handles a DELETE request to delete a
collection from the database. It extracts the `collectionId` from the request parameters, calls the
`deleteProduct` method of the `Collection` model to delete the collection from the database. If the
operation is successful, it sends a JSON response with a success message using the `res.json`
method. If there is an error, it logs the error to the console. */
exports.deleteCollection = (req, res, next) => {
    const collectionId = req.params.collectionId;
    Collection.deleteProduct(collectionId)
        .then(() => {
            res.json({ response: "success" })
        }).
        catch(err => {
            console.log(err);
        })
}





