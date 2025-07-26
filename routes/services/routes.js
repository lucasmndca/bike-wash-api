const { Router } = require("express");
const { getAllServices } = require("./controller");

const servicesRouter = Router();

servicesRouter.get("/", getAllServices);

module.exports = {
  servicesRouter,
};
