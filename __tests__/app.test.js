const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");

afterAll(() => {
  db.end();
});

describe("GET /api", () => {
  test("status: 200, should respond with object with message all ok", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((result) => {
        const { message } = result.body;
        expect(message).toEqual("all ok");
      });
  });
});

describe("GET /api/restaurants", () => {
  test("status: 200, should respond with a json object containing a key of restaurants with a value of an array of all the restaurant objects ", () => {
    return request(app)
      .get("/api/restaurants")
      .expect(200)
      .then(({ body }) => {
        const { restaurants } = body;
        expect(restaurants).toBeInstanceOf(Array);
        expect(restaurants).toHaveLength(8);
        restaurants.forEach((restaurant) => {
          expect(restaurant).toMatchObject({
            restaurant_id: expect.any(Number),
            restaurant_name: expect.any(String),
            area_id: expect.any(Number),
            cuisine: expect.any(String),
            website: expect.any(String),
          });
        });
      });
  });
  test("status: 404, should respond with error message not found when given incorrect route", () => {
    return request(app)
      .get("/api/restaurante")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("not found");
      });
  });
});
