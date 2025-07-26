const { Router } = require("express");
const { getAllServices, createServie } = require("./controller");

const servicesRouter = Router();

servicesRouter.get("/", getAllServices);
servicesRouter.post("/", createServie);

module.exports = {
  servicesRouter,
};
