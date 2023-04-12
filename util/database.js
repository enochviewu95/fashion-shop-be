const { default: mongoose } = require('mongoose');
require('dotenv').config()
const USERNAME = process.env.USER;
const HOST = process.env.HOST;
const COLLECTION = process.env.COLLECTION;
const RETRYWRITES= process.env.RETRYWRITES;
const W = process.env.W;
const PASSWORD = process.env.PASSWORD;

const mongooseConnect = (callback)=>{
    mongoose
    .connect(`mongodb+srv://${USERNAME}:${PASSWORD}${HOST}/${COLLECTION}?retryWrites=${RETRYWRITES}&w=${W}`)
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