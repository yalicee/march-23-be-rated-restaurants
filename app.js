const express = require("express");
const {
  getAPI,
  getRestaurants,
} = require("./controllers/restaurant.controller");
const app = express();

app.get("/api", getAPI);
app.get("/api/restaurants", getRestaurants);
app.use((req, res, next) => {
  res.status(404).send({ msg: "not found" });
});

module.exports = app;
