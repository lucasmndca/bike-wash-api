const { dateRegex } = require("../helpers/date");
const db = require("../lib/sqlite");
const z = require('zod')

exports.getAllServices = (rawFilters, { offset, limit }) => {
  const Filters = z.object({
    startDate: z.string().regex(dateRegex).optional(),
    endDate: z.string().regex(dateRegex).optional(),
  });

  const parsedFilters = Filters.safeParse(rawFilters)

  if (!parsedFilters.success) {
    console.error('Error on parsing filters - getAllServices: ', parsedFilters.error)
    return []
  }

  const { startDate, endDate } = parsedFilters.data

  const stmtParams = [];
  let query = " SELECT * FROM Services WHERE 1 = 1 ";

  if (startDate) {
    query += " AND serviceDate >= ? ";
    stmtParams.push(startDate)
  }

  if (endDate) {
    query += " AND serviceDate <= ? ";
    stmtParams.push(endDate)
  }

  query += `
    ORDER BY serviceDate desc
    LIMIT ?
    OFFSET ?
  `;

  stmtParams.push(limit);
  stmtParams.push(offset);

  const stmt = db.prepare(query);
  return stmt.all(stmtParams);
};
