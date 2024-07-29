const { checkSchema } = require("express-validator");

const create_product = checkSchema({
  title: {
    isString: true,
    escape: true,
    notEmpty: true,
    errorMessage: "title field field is empty",
  },
  description: {
    isString: true,
    escape: true,
    notEmpty: true,
    errorMessage: "description field is empty",
  },
  image: {
    custom: {
      options: (value, { req, res, next }) => {
        if (!req.file) {
          throw new Error("Image file is required");
        }
        return true;
      },
    },
  },
  details: {
    isString: true,
    escape: true,
    errorMessage: "details field is empty",
  },
  category: {
    isString: true,
    escape: true,
    notEmpty: false,
    default: "",
  },
  collection: {
    isString: true,
    escape: true,
    notEmpty: false,
    default: "",
  },
  price: {
    isDecimal: true,
    notEmpty: true,
    errorMessage: "price field is empty",
  },
});

module.exports = create_product;
