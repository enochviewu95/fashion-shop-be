const { default: mongoose } = require("mongoose");
require("dotenv").config();

const mongooseConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    return connection;
  } catch (error) {
    handleConnectionError(error);
  }
};

const handleConnectionError = (err) => {
  setTimeout(async () => {
    await mongooseConnect();
  }, 2000);
};

module.exports = { mongooseConnect };
