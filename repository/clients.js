const db = require("../lib/sqlite");

exports.getAllClients = ({ name, phone }, { offset, limit }) => {
  const stmtParams = [];
  let query = " SELECT * FROM Clients WHERE 1 = 1 ";

  if (name && typeof name === "string") {
    query += ` AND name LIKE ? `;
    stmtParams.push(`%${name}%`);
  }

  if (phone && typeof phone === "string") {
    query += ` AND phone = ? `;
    stmtParams.push(phone);
  }

  query += `
    ORDER BY createdAt desc
    LIMIT ?
    OFFSET ?
  `;
  stmtParams.push(limit)
  stmtParams.push(offset)

  const stmt = db.prepare(query);
  return stmt.all(stmtParams);
};

exports.getClientById = (id) => {
  const stmt = db.prepare("SELECT * FROM Clients WHERE id = ?");
  return stmt.get(id);
};

exports.createClient = (client) => {
  const stmt = db.prepare(
    `INSERT INTO Clients (name, phone, isActive, createdAt, updatedAt) VALUES (?, ?, ?, datetime('now'), datetime('now'))`
  );
  const info = stmt.run(client.name, client.phone, client.isActive ?? 1);
  return { id: info.lastInsertRowid };
};

exports.updateClient = (id, client) => {
  const stmt = db.prepare(
    `UPDATE Clients SET name = ?, phone = ?, isActive = ?, updatedAt = datetime('now') WHERE id = ?`
  );
  const info = stmt.run(client.name, client.phone, client.isActive ?? 1, id);
  return { changes: info.changes };
};

exports.disableClient = (id) => {
  const stmt = db.prepare(
    `UPDATE Clients SET isActive = 0, updatedAt = datetime('now') WHERE id = ?`
  );
  const info = stmt.run(id);
  return { changes: info.changes };
};
