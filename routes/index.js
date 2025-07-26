const { Router } = require("express");
const { clientsRouter } = require("./clients/routes");
const { bikesRouter } = require("./bikes/routes");
const { servicesRouter } = require("./services/routes");

const mainRouter = Router();

mainRouter.use("/clients", clientsRouter);
mainRouter.use("/bikes", bikesRouter);
mainRouter.use("/services", servicesRouter);

module.exports = {
  mainRouter,
};
