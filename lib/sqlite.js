const path = require("path");
const Database = require("better-sqlite3");
const db = new Database(path.join(__dirname, "../bike-wash.db"));

const createClientsTable = `
CREATE TABLE IF NOT EXISTS Clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT,
  isActive INTEGER DEFAULT 1,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);`;
db.prepare(createClientsTable).run();

const createServicesTable = `
CREATE TABLE IF NOT EXISTS Services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  serviceDate TEXT NOT NULL,
  clientId INTEGER NOT NULL,
  bikeId INTEGER NOT NULL,
  description TEXT,
  preServiceIssues TEXT,
  solutionReport TEXT,
  FOREIGN KEY (clientId) REFERENCES Clients(id),
  FOREIGN KEY (bikeId) REFERENCES Bikes(id)
);`;
db.prepare(createServicesTable).run();

const createBikesTable = `
CREATE TABLE IF NOT EXISTS Bikes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  clientId INTEGER NOT NULL,
  isActive INTEGER DEFAULT 1,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (clientId) REFERENCES Clients(id)
);`;
db.prepare(createBikesTable).run();

module.exports = db;
