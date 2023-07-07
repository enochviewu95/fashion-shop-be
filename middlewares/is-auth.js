module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect(process.env.FASHION_DOMAIN_NAME_VALUE + "/auth");
  } else {
    if (req.user.role !== "admin") {
      res.redirect(process.env.FASHION_DOMAIN_NAME_VALUE);
    } else {
      next();
    }
  }
};
