const { checkSchema } = require("express-validator");

const update_banner = checkSchema({
  title: {
    isString: true,
    errorMessage: "title field is empty",
    escape: true,
    isEmpty: false,
  },
  description: {
    isString: true,
    escape: true,
    errorMessage: "description field is empty",
    isEmpty: false,
  },
  selected: {
    isBoolean: true,
    escape: true,
    isEmpty: false,
    errorMessage: "isSelected field is empty",
  },
});

module.exports = update_banner;
