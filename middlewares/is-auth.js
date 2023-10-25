module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // res.redirect(process.env.FASHION_DOMAIN_NAME_VALUE + "/auth");
    return res
      .status(401)
      .json({ response: "failed", msg: "user is not authenticated" });
  } else {
    if (req.user.role !== "admin") {
      // res.redirect(process.env.FASHION_DOMAIN_NAME_VALUE);
      return res.status(401).json({
        response: "failed",
        msg: "user is not an admin",
      });
    } else {
      next();
    }
  }
};
