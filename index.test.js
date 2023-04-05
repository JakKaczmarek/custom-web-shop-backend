const server = require("./index");
const request = require("supertest");

// const baseURL = "http://localhost:3000";

describe("/", () => {
  test("it says hello world", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toEqual(200);
  });
});
