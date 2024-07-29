const sortByCategory = [
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "category",
      as: "products",
    },
  },
  {
    $set: {
      items: {
        $slice: ["$products", 5],
      },
    },
  },
  {
    $unset: ["products"],
  },
];

module.exports = sortByCategory;
