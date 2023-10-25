const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({ status: 400, message: errors.array() });
  }
  next();
};
module.exports = { validator };
