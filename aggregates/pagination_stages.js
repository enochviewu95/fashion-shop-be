const paginationAggregate = ({ pageNum, items_per_page }) => {
  const pageNumInt = parseInt(pageNum);
  return {
    $project: {
      _id: 1,
      totalItems: "$totalItems",
      items: {
        $slice: ["$items", (pageNumInt - 1) * items_per_page, items_per_page],
      },
    },
  };
};

module.exports = { paginationAggregate };
