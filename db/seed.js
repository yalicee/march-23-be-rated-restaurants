const db = require("./connection")
const { areas, ratings, restaurants } = require("./data/index")

return db
  .query(`DROP TABLE ratings IF EXISTS;`)
  .then(() => {
    return db.query(`DROP TABLE restaurants IF EXISTS;`)
  })
  .then(() => {
    return db.query(`DROP TABLE areas IF EXISTS;`)
  })
  .then(() => {
    return db.query(`CREATE TABLE areas (
        area_id SERIAL PRIMARY KEY,
        area_name VARCHAR(40) NOT NULL
    )`)
  })
  .then(() => {
    return db.query(`CREATE TABLE restaurants (
        restaurant_id SERIAL PRIMARY KEY,
        restaurant_name VARCHAR(40) NOT NULL,
        area_id INT REFERENCES areas(area_id),
        cuisine VARCHAR(40),
        website VARCHAR(40)
    )`)
  })
  .then(() => {
    return db.query(`CREATE TABLE ratings (
        rating_id SERIAL PRIMARY KEY,
        restaurant_id INT,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
        rating INT CHECK (rating >= 1 AND rating <= 5)
    )`)
  })
