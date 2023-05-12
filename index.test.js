import { createConnection, getConnection, getRepository } from "typeorm";
import { Bikes } from "./models/Bikes.js";
import BikesSchema from "./schemas/BikesSchema";
import ImagesSchema from "./schemas/ImagesSchema.js";
import server from "./index.js";
import request from "supertest";

beforeEach(() => {
  return createConnection({
    type: "sqlite",
    database: "./bikes.sqlite3",
    synchronize: true,
    logging: false,
    entities: [BikesSchema, ImagesSchema],
  });
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});
test("Check status code and headers", async () => {
  const response = await request(server).get("/test");
  expect(response.statusCode).toEqual(200);
  expect(response.headers["content-type"]).toEqual(
    "application/json; charset=utf-8"
  );
});

test("Find a bike with name  in repository", async () => {
  let bike = await getRepository(Bikes).find({
    where: {
      id: 1,
    },
  });
  expect(bike[0].bikeTitle).toBe("testBike");
});
