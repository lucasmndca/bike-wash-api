const { Router } = require("express");
const {
  getClientBikes,
  createBike,
  getBike,
  disableBike,
  enableBike,
} = require("./controller");
const bikesRouter = Router();

bikesRouter.get("/:clientId", getClientBikes);
bikesRouter.get("/bike/:bikeId", getBike);
bikesRouter.post("/", createBike);
bikesRouter.delete("/bike/:bikeId", disableBike);
bikesRouter.put("/bike/:bikeId", enableBike);

module.exports = {
  bikesRouter,
};
