require("dotenv").config({ path: "./.env" });
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const User = require("./models/user");

const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const passport = require("passport");
const mongoUri = process.env.MONGODB_URI;

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
  uri: mongoUri,
  collection: "sessions",
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  session({
    secret: "avitorLiter@cy",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(
  multer({
    dest: "images",
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(passport.initialize());
app.use(passport.session());

require("./middlewares/local-passport-config")(passport);
require("./middlewares/google-passport-config")(passport);

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, { id: user._id });
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    User.findOne({ _id: user.id })
    .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  });
});


app.use("/auth", authRouter);
app.use("/shop/api", shopRouter);
app.use("/admin/api", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
