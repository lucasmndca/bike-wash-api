const db = require("../lib/sqlite");

exports.getClientBikes = (clientId, { offset, limit }) => {
  const stmt = db.prepare(`
    SELECT * FROM Bikes 
    WHERE clientId = ?
    ORDER BY createdAt desc
    LIMIT ?
    OFFSET ?
  `);

  return {
    bikes: stmt.all(clientId, limit, offset),
    metaData: db.prepare("SELECT count(*) as total FROM Bikes").get(),
  };
};

exports.getBikeById = (bikeId) => {
  const stmt = db.prepare(`SELECT * FROM Bikes WHERE id = ?`);
  return stmt.all(bikeId);
};

exports.createBike = (bike) => {
  const stmt = db.prepare(`INSERT INTO Bikes (label, clientId) VALUES (?, ?)`);
  const info = stmt.run(bike.label, bike.clientId);
  return { id: info.lastInsertRowid };
};

exports.disableBike = (bikeId) => {
  const stmt = db.prepare(`UPDATE Bikes SET isActive = 0 WHERE id = ?`);
  const info = stmt.run(bikeId);
  return { changes: info.changes };
};

exports.enableBike = (bikeId) => {
  console.log(bikeId);
  const stmt = db.prepare(`UPDATE Bikes SET isActive = 1 WHERE id = ?`);
  const info = stmt.run(bikeId);
  return { changes: info.changes };
};
