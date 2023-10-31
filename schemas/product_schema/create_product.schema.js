const { checkSchema } = require("express-validator");

const create_product = checkSchema({
  title: {
    isString: true,
    errorMessage: "title field field is empty",
    escape: true,
    isEmpty: false,
  },
  description: {
    isString: true,
    escape: true,
    errorMessage: "description field is empty",
    isEmpty: false,
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
    isEmpty: false,
    errorMessage: "details field is empty",
  },
  category: {
    isString: true,
    escape: true,
    errorMessage: "category field is empty",
    isEmpty: false,
  },
  price: {
    isDecimal: true,
    errorMessage: "price field is empty",
    isEmpty: false,
  },
});

module.exports = create_product;
