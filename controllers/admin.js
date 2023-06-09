const Product = require('../models/product')
const Collection = require("../models/collection")
const User = require("../models/user")
const Banner = require("../models/banner")

const SUCCESSMSG = "success";
const FAILEDMSG = "failed"


/*<=========================PRODUCT CONTROLLERS====================>*/

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
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
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
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
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
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}

/*<=========================END OF PRODUCT CONTROLLERS====================>*/




/*<=========================COLLECTION CONTROLLERS====================>*/


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
    const product = new Collection({ title, description, imageUrl })
    product
        .createCollection()
        .then(() => {
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}

/* `exports.getCollection` is a function that handles a GET request to retrieve all collections from
the database. It calls the `getCollections` method of the `Collection` model to retrieve the
collections, and then sends the result as a JSON response using the `res.json` method. If there is
an error, it logs the error to the console. */
exports.getCollections = (req, res, next) => {
    Collection.getCollections()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
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
    console.log(updatedCollection,collectionId)
    Collection
        .udpateCollection(collectionId, updatedCollection)
        .then(() => {
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}

/* This code exports a function named `deleteCollection` that handles a DELETE request to delete a
collection from the database. It extracts the `collectionId` from the request parameters, calls the
`deleteProduct` method of the `Collection` model to delete the collection from the database. If the
operation is successful, it sends a JSON response with a success message using the `res.json`
method. If there is an error, it logs the error to the console. */
exports.deleteCollection = (req, res, next) => {
    const collectionId = req.params.collectionId;
    Collection.deleteCollection(collectionId)
        .then(() => {
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}

/*<=========================END OF COLLECTION CONTROLLERS====================>*/


/*<=========================BANNER CONTROLLERS====================>*/


/* `exports.postBanner` is a function that handles a POST request to create a new banner in the
database. It extracts the `title`, `description`, and `imageUrl` from the request body, creates a
new `Banner` object with these values, and calls the `createBanner` method of the `Banner` model to
save the new banner to the database. If the operation is successful, it sends a JSON response with a
success message using the `res.json` method. If there is an error, it sends a JSON response with an
error message using the `res.json` method. */
exports.postBanner = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const banner = new Banner({ title, description, imageUrl })

    banner.createBanner()
        .then(() => {
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}

/* `exports.getBanners` is a function that handles a GET request to retrieve all banners from the
database. It calls the `getBanners` method of the `Banner` model to retrieve the banners, and then
sends the result as a JSON response using the `res.json` method. If there is an error, it sends a
JSON response with an error message using the `res.json` method. */
exports.getBanners = (req, res, next) => {
    Banner.getBanners()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}

/* `exports.editBanner` is a function that handles a PUT request to update an existing banner in the
database. It extracts the updated banner information from the request body and the banner ID from
the request parameters. It then calls the `updateBanner` method of the `Banner` model to update the
banner in the database. If the operation is successful, it sends a JSON response with a success
message using the `res.json` method. If there is an error, it sends a JSON response with an error
message using the `res.json` method. */
exports.editBanner = (req, res, next) => {
    const updatedBanner = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }

    const bannerId = req.params.bannerId;
    Banner
        .updateBanner(bannerId, updatedBanner)
        .then(() => {
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}


/* This code exports a function named `deleteBanner` that handles a DELETE request to delete a banner
from the database. It extracts the `bannerId` from the request parameters, calls the `deleteBanner`
method of the `Banner` model to delete the banner from the database. If the operation is successful,
it sends a JSON response with a success message using the `res.json` method. If there is an error,
it sends a JSON response with an error message using the `res.json` method. */
exports.deleteBanner = (req, res, next) => {
    const bannerId = req.params.bannerId;
    Banner.deleteBanner(bannerId)
        .then(() => {
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}


/*<=========================END OF BANNER CONTROLLERS====================>*/


/*<=========================USER CONTROLLERS====================>*/

/* The above code is defining a function called `postUser` that handles a POST request to create a new
user. It extracts the `name` and `email` from the request body, creates a new `Product` object with
those values, and calls the `createUser` method on that object. If the user is successfully created,
it sends a JSON response with a success message. If there is an error, it sends a JSON response with
a failure message and the error message. */
exports.postUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const user = new User({ name, email });
    user.createUser()
        .then(() => {
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}

/* The above code is defining an exported function called `getUser` that takes in a request, response,
and next middleware function as parameters. Inside the function, it extracts the `userId` from the
request body and calls a function called `getUser` on the `User` object, passing in the `userId`. If
the `getUser` function resolves successfully, it sends a JSON response with a 200 status code and
the result. If it rejects with an error, it sends a JSON response with a custom message and the
error. */
exports.getUser = (req, res, next) => {
    const userId = req.body.userId;
    User.getUser(userId)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}

/* `exports.editUser` is a function that handles a PUT request to update an existing user in the
database. It extracts the updated user information from the request body and the user ID from the
request parameters. It then calls the `updateUser` method of the `User` model to update the user in
the database. If the operation is successful, it sends a JSON response with a success message using
the `res.json` method. If there is an error, it sends a JSON response with an error message using
the `res.json` method. */
exports.editUser = (req, res, next) => {
    const updatedUser = {
        name: req.body.name,
        email: req.body.email
    }

    const userId = req.params.userId;
    User
        .updateUser(userId, updatedUser)
        .then(() => {
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })

}

/* The above code is defining a function called `deleteUser` that takes in a request, response, and
next as parameters. It then extracts the `userId` from the request body and calls the `deleteUser`
function of the `User` object with the `userId` as an argument. If the deletion is successful, it
sends a JSON response with a success message. If there is an error, it sends a JSON response with a
failure message and the error message. */
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.deleteUser(userId)
        .then(() => {
            res.json({ response: SUCCESSMSG })
        })
        .catch(err => {
            res.json({ response: FAILEDMSG, msg: err })
        })
}

/*<=========================END OF USER CONTROLLERS====================>*/