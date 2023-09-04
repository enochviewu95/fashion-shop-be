const { default: mongoose } = require("mongoose");
require("dotenv").config();

const mongooseConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected')
    return connection;
  } catch (error) {
    handleConnectionError(error);
  }
};

const handleConnectionError = (err) => {
  setTimeout(() => {
    console.log("Connection failed.", err);
    console.log("Reconnection ...");
    mongooseConnect();
  }, 2000);
};

module.exports = { mongooseConnect };
