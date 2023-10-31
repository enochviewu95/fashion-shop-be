const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const SUCCESSMSG = "success";
const FAILEDMSG = "failed";

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SEND_GRID_KEY,
    },
  })
);

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const provider = req.body.provider;
  const role = req.body.role;
  User.getUser(email)
    .then((userDoc) => {
      if (userDoc) {
        return res.status(200).json({ response: "Email exist already" });
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
            provider: provider,
            role: role,
          });

          //TODO: SEND EMAIL AFTER USER IS REGISTERED

          return user.save();
        })
        .then((user) => {
          res.json({ msg: SUCCESSMSG, response: user });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
    res.json({ response: SUCCESSMSG });
  });
};

exports.getUser = (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      msg: SUCCESSMSG,
      response: {
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        role: req.user.role,
      },
    });
  } else {
    res
      .status(200)
      .json({ status: FAILEDMSG, msg: "Your credentials are incorrect" });
  }
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) return next(err);

    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.json({ response: FAILEDMSG, msg: "User not found" });
        }

        if (user.provider !== "local") {
          return res.json({
            response: FAILEDMSG,
            msg: `This account is associated with ${user.provider}`,
          });
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((user) => {
        res.json({
          response: SUCCESSMSG,
          msg: "Check your email for reset link",
        });
        const mailOptions = {
          to: req.body.email,
          from: "viewuenoch@gmail.com",
          subject: "Password reset!",
          html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="${process.env.FASHION_DOMAIN_NAME_VALUE}/auth/reset/?user=${user._id}&token=${token}">link</a> to set a new password.</p>
        `,
        };
        transporter.sendMail(mailOptions);
      })
      .catch((err) => {
        next(err);
      });
  });
};

exports.postPassword = (req, res, next) => {
  const token = req.body.token;
  const password = req.body.password;
  const userId = req.body.user;
  let resetUser;

  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(() => {
      res.json({ response: SUCCESSMSG, msg: "Password reset successful" });
    })
    .catch((err) => {
      next(err);
    });
};
