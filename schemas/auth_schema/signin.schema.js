const { checkSchema } = require('express-validator');

const signinSchema = checkSchema({
    email: {
        isEmail: true,
        trim: true,
        errorMessage: "email field is empty",
        escape: true,
        isEmail: false,
    },
    password: {
        trim: true,
        isEmpty: false,
        errorMessage: "password field is empty",
        escape: true
    }
});

module.exports = signinSchema;