const { Router } = require("express");
const {
  getAllClients,
  createClient,
  updateClient,
  disableClient,
  getClientById,
} = require("./controller");
const clientsRouter = Router();

clientsRouter.get("/", getAllClients);
clientsRouter.get("/:id", getClientById);
clientsRouter.post("/", createClient);
clientsRouter.put("/:id", updateClient);
clientsRouter.delete("/:id", disableClient);

module.exports = {
  clientsRouter,
};
