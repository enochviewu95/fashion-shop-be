require("dotenv").config({ path: "./.env" });
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const Session = require("./util/session-setup");
const logger = require("morgan");
const cors = require("cors");
// const multer = require("multer");
const User = require("./models/user");
const Multer = require("./util/multer_setup");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const indexRouter = require("./routes/index");
const shopRouter = require("./routes/shop");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const passport = require("passport");

const mongoUri = process.env.MONGODB_URI;

const app = express();
const domain = process.env.FASHION_DOMAIN_NAME_VALUE;
const FAILEDMSG = "failed";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: domain,
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Session.userSession);

app.use(Multer.fileupload);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    User.localAuthenticate().options,
    User.localAuthenticate().verify
  )
);
passport.use(
  new GoogleStrategy(
    User.googleAuthenticate().options,
    User.googleAuthenticate().verify
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser(User));

app.use("/index", indexRouter);
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
  res.status(err.status || 500).json({ msg: FAILEDMSG, response: err.message });
});

module.exports = app;
