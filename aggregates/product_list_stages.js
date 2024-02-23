const { Decimal128 } = require("mongodb");

const priceAggregates = ({ priceFilter }) => {
  console.log("Price filter object aggr", priceFilter);
  if (priceFilter.length !== 0) {
    const priceRanges = priceFilter.map((range) => {
      const { min, max } = range;
      if (max) {
        return {
          price: {
            $gte: Decimal128.fromString(min.toString()),
            $lte: Decimal128.fromString(max.toString()),
          },
        };
      }
      return {
        price: {
          $gte: Decimal128.fromString(min.toString()),
        },
      };
    });
    console.log("Price ranges", priceRanges);
    return {
      $match: { $or: priceRanges },
    };
  }
  return;
};

const sortAggregates = ({ sortFilter }) => {
  return {
    $sort: sortFilter,
  };
};

const totalCountOfItems = () => {
  return {
    $group: {
      _id: "$category",
      totalItems: { $sum: 1 },
      items: {
        $push: {
          _id: "$_id",
          title: "$title",
          description: "$description",
          imageUrl: "$imageUrl",
          price: "$price",
          details: "$details",
          category: "$category",
          user: "$user",
          createdAt: "$createdAt",
          updatedAt: "$updatedAt",
        }
      }
    }
  };
}

module.exports = { priceAggregates, sortAggregates,totalCountOfItems };
