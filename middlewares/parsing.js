export const parsePaginationValues = (req, res, next) => {
  const { page = 1, itemsPerPage = 10 } = req.query;
  const parsed = {
    page: parseInt(page),
    itemsPerPage: parseInt(itemsPerPage),
  };
  const pagination = {
    offset: (parsed.page - 1) * parsed.itemsPerPage,
    limit: parsed.itemsPerPage,
  };

  req.pagination = pagination;

  next();
};
