require("dotenv").config({ path: "../.env" });
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoUri = process.env.MONGODB_URI;

const store = new MongoDBStore({
  uri: mongoUri,
  collection: "sessions",
});

exports.userSession = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
});
