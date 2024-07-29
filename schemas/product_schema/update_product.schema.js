const { checkSchema } = require("express-validator");

const update_product = checkSchema({
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
          return true
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
    notEmpty: true,
    errorMessage: "category field is empty",
  },
  price: {
    isDecimal: true,
    notEmpty: true,
    errorMessage: "price field is empty",
  },
});

module.exports = update_product;
