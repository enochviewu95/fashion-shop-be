const { default: mongoose } = require('mongoose');
require('dotenv').config()
const mongooseConnect = (callback)=>{
    mongoose
    .connect(process.env.MONGODB_URI)
    .then(client=>{
        _mongoose = client;
        callback(client)
    })
    .catch(err=>{
        handleError(err)
    })
}

const handleError = (err)=>{
    console.log(err);
}

exports.mongooseConnect = mongooseConnect;