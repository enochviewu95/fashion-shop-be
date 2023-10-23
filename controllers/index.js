exports.getIndex = (req, res, next) => {
  res.render("index", { title: "Express" });
};

exports.getTest = (req, res, next) => {
  res.json({ testing: "Successful" });
};
