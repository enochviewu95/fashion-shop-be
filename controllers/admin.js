const Product = require("../models/product");
const Collection = require("../models/collection");
const User = require("../models/user");
const Banner = require("../models/banner");
const Category = require("../models/categories");
const SUCCESSMSG = "success";
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { uploadImage, deleteImage } = require("../util/google-storage");

const { paginationAggregate } = require("../aggregates/pagination_stages");
const ITEM_PER_PAGE = 1;
/*<=========================PRODUCT CONTROLLERS====================>*/

/* This code exports a function named `getProducts` that handles a GET request to retrieve all products
from the database. It calls the `getProducts` method of the `Product` model to retrieve the
products, and then sends the result as a JSON response using the `res.json` method. If there is an
error, it logs the error to the console. */
exports.getProducts = async (req, res, next) => {
  try {
    const { page: currentPage, limit } = req.query;
    const skip = (parseInt(currentPage) - 1) * limit;
    const totalDocument = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocument / limit);
    const data = await Product.find().skip(skip).limit(limit).exec();
    res.status(200).json({
      msg: SUCCESSMSG,
      response: data,
      totalDocument,
      totalPages,
      currentPage: parseInt(currentPage),
      resultsPerPage: parseInt(limit),
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findById({ _id: prodId });
    res.status(200).json({ msg: SUCCESSMSG, response: product });
  } catch (err) {
    next(err);
  }
};

/* This code exports a function named `postProducts` that handles a POST request to create a new
product in the database. It extracts the `title`, `description`, and `imageUrl` from the request
body, creates a new `Product` object with these values, and calls the `createProduct` method of the
`Product` model to save the new product to the database. If the operation is successful, it logs the
result to the console. If there is an error, it logs the error to the console. */
exports.postProducts = async (req, res, next) => {
  try {
    const { title, description, price, details } = req.body;
    const category = new mongoose.Types.ObjectId(req.body.category);
    const user = req.user._id;

    const imageUrl = await uploadImage(req, "products");

    const product = new Product({
      title,
      description,
      imageUrl,
      price,
      category,
      details,
      user,
    });
    const data = await product.save(this);
    res.status(200).json({ response: data, msg: SUCCESSMSG });
  } catch (err) {
    next(err);
  }
};

/* `exports.editProduct` is a function that handles a PUT request to update an existing product in the
database. It extracts the updated product information from the request body and the product ID from
the request parameters. It then calls the `updateProduct` method of the `Product` model to update
the product in the database. If the operation is successful, it sends a JSON response with a success
message using the `res.json` method. If there is an error, it logs the error to the console. */
exports.editProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file;
    const imageUrl = image !== undefined ? image.path : "";
    const price = req.body.price;
    const category = new mongoose.Types.ObjectId(req.body.category);
    const details = req.body.details;

    const product = await Product.findById({ _id: prodId });
    if (product == null) {
      const error = Error("Product does not exist");
      error.status = 400;
      throw error;
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.category = category;
    product.details = details;
    product.imageUrl = imageUrl !== "" ? imageUrl : product.imageUrl;

    const updatedProduct = await product.save();
    res.status(200).json({ msg: SUCCESSMSG, response: updatedProduct });
  } catch (err) {
    next(err);
  }
};

/* This code exports a function named `deleteProduct` that handles a DELETE request to delete a product
from the database. It extracts the `productId` from the request parameters, calls the
`deleteProduct` method of the `Product` model to delete the product from the database. If the
operation is successful, it sends a JSON response with a success message using the `res.json`
method. If there is an error, it logs the error to the console. */
exports.deleteProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findById({ _id: prodId });
    if (product == null) {
      const err = new Error("Product does not exist for deletion");
      err.status = 400;
      throw err;
    }

    const { _id, imageUrl } = product;

    deleteImage(imageUrl, async () => {
      const deleteResponse = await Product.deleteOne({ _id: _id });
      if (deleteResponse.deletedCount != 1) {
        const err = new Error(
          "Unable to delete at this moment try again later"
        );
        err.status = 400;
        throw err;
      }
      res
        .status(200)
        .json({ msg: SUCCESSMSG, response: "Product deleted successfully" });
    });
  } catch (err) {
    next(err);
  }
};

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
  const image = req.file;
  const imageUrl = image.path;
  const product = new Collection({ title, description, imageUrl });
  product
    .createCollection()
    .then(() => {
      res.json({ response: SUCCESSMSG });
    })
    .catch((err) => {
      next(err);
    });
};

/* `exports.getCollection` is a function that handles a GET request to retrieve all collections from
the database. It calls the `getCollections` method of the `Collection` model to retrieve the
collections, and then sends the result as a JSON response using the `res.json` method. If there is
an error, it logs the error to the console. */
exports.getCollections = async (req, res, next) => {
  try {
    const collections = await Collection.find();
    res.status(200).json({ msg: SUCCESSMSG, response: collections });
  } catch (err) {
    next(err);
  }
};

exports.getCollection = async (req, res, next) => {
  try {
    const collectionId = req.params.collectionId;
    const result = await Collection.findById({ _id: collectionId });
    res.status(200).json({ msg: SUCCESSMSG, response: result });
  } catch (err) {
    next(err);
  }
};

/* `exports.editCollection` is a function that handles a PUT request to update an existing collection
in the database. It extracts the updated collection information from the request body and the
collection ID from the request parameters. It then calls the `updateProduct` method of the `Product`
model to update the collection in the database. If the operation is successful, it sends a JSON
response with a success message using the `res.json` method. If there is an error, it logs the error
to the console. */
exports.editCollection = (req, res, next) => {
  const collectionId = req.params.collectionId;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file;
  const imageUrl = image !== undefined ? image.path : "";

  Collection.findById({ _id: collectionId })
    .then((collection) => {
      collection.title = title;
      collection.description = description;
      collection.imageUrl = imageUrl !== "" ? imageUrl : collection.imageUrl;
      return collection.save();
    })
    .then(() => {
      res.json({ response: SUCCESSMSG });
    })
    .catch((err) => {
      next(err);
    });
};

/* This code exports a function named `deleteCollection` that handles a DELETE request to delete a
collection from the database. It extracts the `collectionId` from the request parameters, calls the
`deleteProduct` method of the `Collection` model to delete the collection from the database. If the
operation is successful, it sends a JSON response with a success message using the `res.json`
method. If there is an error, it logs the error to the console. */
exports.deleteCollection = (req, res, next) => {
  const collectionId = req.params.collectionId;
  Collection.deleteCollection(collectionId)
    .then(() => {
      res.json({ response: SUCCESSMSG });
    })
    .catch((err) => {
      next(err);
    });
};

/*<=========================END OF COLLECTION CONTROLLERS====================>*/

/*<=========================BANNER CONTROLLERS====================>*/

/* `exports.postBanner` is a function that handles a POST request to create a new banner in the
database. It extracts the `title`, `description`, and `imageUrl` from the request body, creates a
new `Banner` object with these values, and calls the `createBanner` method of the `Banner` model to
save the new banner to the database. If the operation is successful, it sends a JSON response with a
success message using the `res.json` method. If there is an error, it sends a JSON response with an
error message using the `res.json` method. */
exports.postBanner = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const user = req.user._id;
    const isSelected = false;

    const imageUrl = await uploadImage(req, "banners");

    const banner = new Banner({
      title,
      description,
      imageUrl,
      isSelected,
      user,
    });

    const data = await banner.save(this);
    res.json({ msg: SUCCESSMSG, response: data });
  } catch (err) {
    next(err);
  }
};

/* `exports.getBanners` is a function that handles a GET request to retrieve all banners from the
database. It calls the `getBanners` method of the `Banner` model to retrieve the banners, and then
sends the result as a JSON response using the `res.json` method. If there is an error, it sends a
JSON response with an error message using the `res.json` method. */
exports.getBanners = async (req, res, next) => {
  try {
    const { page: currentPage, limit } = req.query;
    const skip = (parseInt(currentPage) - 1) * limit;
    const totalDocument = await Banner.countDocuments();
    const totalPages = Math.ceil(totalDocument / limit);
    const data = await Banner.find().skip(skip).limit(limit).exec();

    res.status(200).json({
      msg: SUCCESSMSG,
      response: data,
      totalDocument,
      totalPages,
      currentPage: parseInt(currentPage),
      resultsPerPage: parseInt(limit),
    });
  } catch (err) {
    next(err);
  }
};

/* `exports.editBanner` is a function that handles a PUT request to update an existing banner in the
database. It extracts the updated banner information from the request body and the banner ID from
the request parameters. It then calls the `updateBanner` method of the `Banner` model to update the
banner in the database. If the operation is successful, it sends a JSON response with a success
message using the `res.json` method. If there is an error, it sends a JSON response with an error
message using the `res.json` method. */
exports.editBanner = async (req, res, next) => {
  try {
    const { bannerId } = req.params;
    const { title, description, selected } = req.body;
    const image = req.file;
    const imageUrl = image !== undefined ? image.path : "";

    const banner = await Banner.findById({ _id: bannerId });

    if (banner == null) {
      const err = Error("Banner not found");
      err.status = 400;
      throw err;
    }
    banner.title = title;
    banner.description = description;
    banner.imageUrl =
      imageUrl !== "" ? await uploadImage(req) : banner.imageUrl;
    banner.isSelected = selected;
    const data = await banner.save();
    res.json({ msg: SUCCESSMSG, response: data });
  } catch (err) {
    next(err);
  }
};

/* This code exports a function named `deleteBanner` that handles a DELETE request to delete a banner
from the database. It extracts the `bannerId` from the request parameters, calls the `deleteBanner`
method of the `Banner` model to delete the banner from the database. If the operation is successful,
it sends a JSON response with a success message using the `res.json` method. If there is an error,
it sends a JSON response with an error message using the `res.json` method. */
exports.deleteBanner = async (req, res, next) => {
  try {
    const bannerId = req.params.bannerId;
    const banner = await Banner.findById({ _id: bannerId });
    if (banner == null) {
      const error = Error(banner);
      error.status = 400;
      throw error;
    }

    const { id, imageUrl } = banner;

    deleteImage(imageUrl, async () => {
      const deleteResponse = await Banner.deleteOne({ _id: id });
      if (!deleteResponse.acknowledged && deleteResponse.deletedCount != 1) {
        const err = new Error(
          "Unable to delete at this moment try again later"
        );
        err.status = 400;
        throw err;
      }
      res
        .status(200)
        .json({ msg: SUCCESSMSG, response: "Banner deleted successfully" });
    });
  } catch (err) {
    next(err);
  }
};

exports.getBanner = async (req, res, next) => {
  try {
    const bannerId = req.params.bannerId;
    const result = await Banner.findById({ _id: bannerId });
    res.status(200).json({ msg: SUCCESSMSG, response: result });
  } catch (err) {
    next(err);
  }
};

exports.updateSelectedBanner = async (req, res, next) => {
  const bannerId = req.params.bannerId;
  try {
    const result = await Banner.updateOne(
      { isSelected: true },
      { $set: { isSelected: false } }
    );
    const updateResponse = await Banner.updateOne(
      { _id: bannerId },
      { $set: { isSelected: true } }
    );

    if (updateResponse.modifiedCount != 1) {
      const err = Error(`Failed to update banner`);
      err.status = 400;
      throw err;
    }

    res.status(200).json({ msg: SUCCESSMSG, response: updateResponse });
  } catch (err) {
    next(err);
  }
};

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
  user
    .createUser()
    .then(() => {
      res.json({ response: SUCCESSMSG });
    })
    .catch((err) => {
      next(err);
    });
};

/* The above code is defining an exported function called `getUser` that takes in a request, response,
and next middleware function as parameters. Inside the function, it extracts the `userId` from the
request body and calls a function called `getUser` on the `User` object, passing in the `userId`. If
the `getUser` function resolves successfully, it sends a JSON response with a 200 status code and
the result. If it rejects with an error, it sends a JSON response with a custom message and the
error. */
exports.getUser = (req, res, next) => {
  const userId = req.body.userId;
  User.getUser(userId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

/* `exports.editUser` is a function that handles a PUT request to update an existing user in the
database. It extracts the updated user information from the request body and the user ID from the
request parameters. It then calls the `updateUser` method of the `User` model to update the user in
the database. If the operation is successful, it sends a JSON response with a success message using
the `res.json` method. If there is an error, it sends a JSON response with an error message using
the `res.json` method. */
exports.editUser = (req, res, next) => {
  const updatedUser = {
    name: req.body.name,
    email: req.body.email,
  };

  const userId = req.params.userId;
  User.updateUser(userId, updatedUser)
    .then(() => {
      res.json({ response: SUCCESSMSG });
    })
    .catch((err) => {
      next(err);
    });
};

/* The above code is defining a function called `deleteUser` that takes in a request, response, and
next as parameters. It then extracts the `userId` from the request body and calls the `deleteUser`
function of the `User` object with the `userId` as an argument. If the deletion is successful, it
sends a JSON response with a success message. If there is an error, it sends a JSON response with a
failure message and the error message. */
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.deleteUser(userId)
    .then(() => {
      res.json({ response: SUCCESSMSG });
    })
    .catch((err) => {
      next(err);
    });
};

/*<=========================END OF USER CONTROLLERS====================>*/

/*<========================Category CONTROLLERS====================>*/

/* The above code is defining a function called `postCategory` that handles a POST request to create a
new category. It extracts the `title`, `description`, and `imageUrl` from the request body, creates
a new `Category` object with those values, and calls the `createCategory` method on that object. If
the category is successfully created, it sends a JSON response with a success message. If there is
an error, it sends a JSON response with a failure message and the error message. */
exports.postCategory = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const imageUrl = await uploadImage(req, "categories");
    const user = req.user._id;
    const category = new Category({ title, description, imageUrl, user });
    const results = await category.save(this);
    res.status(200).json({ msg: SUCCESSMSG, response: results });
  } catch (err) {
    next(err);
  }
};

/* The above code is defining an exported function called `getCategories` that takes in a request,
response, and next middleware function as parameters. Inside the function, it calls a method
`getCategories()` from a `Category` object, which is expected to return a promise. If the promise is
resolved, it sends a JSON response with a status code of 200 and the result as the response body. If
the promise is rejected, it sends a JSON response with a custom message and the error message as the
response body. */
exports.getCategories = async (req, res, next) => {
  try {
    const { page: currentPage, limit } = req.query;
    const skip = (parseInt(currentPage) - 1) * limit;
    const totalDocument = await Category.countDocuments();
    const totalPages = Math.ceil(totalDocument / limit);
    const results = await Category.find().skip(skip).limit(limit).exec();
    res.status(200).json({
      msg: SUCCESSMSG,
      response: results,
      totalDocument,
      totalPages,
      currentPage: parseInt(currentPage),
      resultsPerPage: parseInt(limit),
    });
  } catch (err) {
    next(err);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const categoryResults = await Category.findById({ _id: categoryId });
    res.status(200).json({ msg: SUCCESSMSG, response: categoryResults });
  } catch (err) {
    next(err);
  }
};

/* The above code is defining an `editCategory` function that handles a PUT request to update a
category in a web application. It extracts the updated category information from the request body
and the category ID from the request parameters. It then calls the `udpateCategory` method of the
`Category` model to update the category with the given ID with the new information. If the update is
successful, it sends a JSON response with a success message. If there is an error, it sends a JSON
response with a failure message and the error message. */
exports.editCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file;
  const imageUrl = image !== undefined ? image.path : "";

  try {
    const category = await Category.findById({ _id: categoryId });

    if (category == null) {
      const error = Error("Category does not exist");
      error.status = 400;
      throw error;
    }

    category.title = title;
    category.description = description;
    category.imageUrl = imageUrl !== "" ? imageUrl : category.imageUrl;
    const updatedCategory = await category.save();
    res.status(200).json({ msg: SUCCESSMSG, response: updatedCategory });
  } catch (err) {
    next(err);
  }
};

/* The above code is defining an Express route handler function that handles a DELETE request to delete
a category. It extracts the category ID from the request parameters, calls the `deleteCategory`
method of the `Category` model to delete the category with the given ID, and sends a JSON response
indicating success or failure. */
exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findById({ _id: categoryId });
    if (category == null) {
      const err = new Error("Category does not exist for deletion");
      err.status = 400;
      throw err;
    }

    const { _id, imageUrl } = category;
    deleteImage(imageUrl, async () => {
      const deleteResponse = await Category.deleteOne({ _id: _id });
      if (deleteResponse.deletedCount != 1) {
        const err = new Error(
          "Unable to delete at this moment try again later"
        );
        err.status = 400;
        throw err;
      }
      res.status(200).json({ msg: SUCCESSMSG, response: deleteResponse });
    });
  } catch (err) {
    next(err);
  }
};

exports.getDashboardData = async (req, res, next) => {
  //TODO: Define an aggregation pipeline with a match stage
  try {
    const bannersCount = await Banner.countDocuments();
    const userCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const categoriesCount = await Category.countDocuments();
    const collectionCount = await Collection.countDocuments();
    const users = await User.find();

    const results = {
      userTotal: userCount,
      bannerTotal: bannersCount,
      productTotal: productsCount,
      categoryTotal: categoriesCount,
      collectionTotal: collectionCount,
      userRegistered: users,
    };

    res.status(200).json({ msg: SUCCESSMSG, response: results });
  } catch (err) {
    next(err);
  }
};
