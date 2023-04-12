const { default: mongoose } = require('mongoose');

const mongooseConnect = (callback)=>{
    mongoose
    .connect('mongodb+srv://avitor:6G2Rt87WEwv6hJXf@cluster0.i0dinuj.mongodb.net/fashion-shop?retryWrites=true&w=majority')
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