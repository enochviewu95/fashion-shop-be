module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("http://localhost:300/fashion-shop-fe/auth");
  } else {
    if (req.user.role !== "admin") {
      res.redirect("http://localhost:300/fashion-shop-fe/");
    } else {
      next();
    }
  }
};
