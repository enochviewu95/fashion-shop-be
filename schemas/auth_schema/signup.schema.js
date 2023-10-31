const { checkSchema } = require("express-validator");

const signupSchema = checkSchema({
  email: {
    isEmail: true,
    trim: true,
    errorMessage: "email field is empty",
    escape: true,
    isEmpty: false,
  },
  password: {
    trim: true,
      isStrongPassword: {
          options: {
              minLowercase: 1,
              minNumbers: 1,
              minSymbols: 1,
              minUppercase: 1,
              minLength: 10
        },
      errorMessage: "Password is should have a mininmum of 1 lowecase character, ",
    },
    isEmpty: false,
    errorMessage: "password field is empty",
  },
  firstname: {
    trim: true,
    isString: true,
    errorMessage: "firstname field is empty",
    isEmpty: false,
    escape: true,
  },
  lastname: {
    trim: true,
    isString: true,
    errorMessage: "lastname fieldis is empty",
    isEmpty: false,
    escape: true,
  },
  provider: {
    trim: true,
    isString: true,
    isEmpty: false,
    escape: true,
  },
  role: {
    trim: true,
    isString: true,
    isEmpty: false,
    escape: true,
  },
});

module.exports = signupSchema;
