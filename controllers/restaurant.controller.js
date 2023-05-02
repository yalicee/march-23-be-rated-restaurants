const { selectRestaurants } = require("../models/restaurant.model");

exports.getAPI = (req, res) => {
  res.status(200).send({
    message: "all ok",
  });
};

exports.getRestaurants = (req, res) => {
  selectRestaurants().then((restaurants) => {
    res.status(200).send({ restaurants: restaurants });
  });
};
