const { dateRegex } = require("../helpers/date");
const db = require("../lib/sqlite");
const z = require("zod");

exports.getAllServices = (rawFilters, { offset, limit }) => {
  const Filters = z.object({
    startDate: z.string().regex(dateRegex).optional(),
    endDate: z.string().regex(dateRegex).optional(),
  });

  const parsedFilters = Filters.safeParse(rawFilters);

  if (!parsedFilters.success) {
    console.error(
      "Error on parsing filters - getAllServices: ",
      parsedFilters.error
    );
    return [];
  }

  const { startDate, endDate } = parsedFilters.data;

  const stmtParams = [];
  let query = " SELECT Services.*, Clients.name as \"clientName\" FROM Services INNER JOIN Clients on Clients.id = Services.clientId WHERE 1 = 1 ";

  if (startDate) {
    query += " AND serviceDate >= ? ";
    stmtParams.push(startDate);
  }

  if (endDate) {
    query += " AND serviceDate <= ? ";
    stmtParams.push(endDate);
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

exports.createService = (incomingService) => {
  const Service = z.object({
    serviceDate: z.string().regex(dateRegex),
    clientId: z.number().min(1),
    bikeId: z.number().min(1),
    description: z.string(),
    preServiceIssues: z.string(),
    solutionReport: z.string(),
  });

  const service = Service.safeParse(incomingService);

  if (!service.success) {
    console.error("Error on parsing service - createService: ", service.error);
    return [];
  }

  const {
    serviceDate,
    clientId,
    bikeId,
    description,
    preServiceIssues,
    solutionReport,
  } = service.data;

  const stmt = db.prepare(
    `INSERT INTO Services (serviceDate, clientId, bikeId, description, preServiceIssues, solutionReport) VALUES (?, ?, ?, ?, ?, ?)`
  );
  const info = stmt.run(serviceDate, clientId, bikeId, description, preServiceIssues, solutionReport);
  return { id: info.lastInsertRowid };
};
