const { checkSchema } = require("express-validator");

const add_banner = checkSchema({
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
          const err = new Error("Image file is required");
          err.status = 400;
          throw err;
        }
        return true;
      },
    },
  },
});

module.exports = add_banner;
