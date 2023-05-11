// import { createConnection, getConnection, getRepository } from "typeorm";
// import TestBikeSchema from "./schemas/TestBikeSchema.js";
// import TestBike from "./models/TestBike.js";
// // import Bikes from "./models/Bikes.js";
// // import BikesSchema from "./schemas/BikesSchema";
import server from "./index.js";
import request from "supertest";

describe("GET all bikes", () => {
  test("Status code and headers", async () => {
    const response = await request(server).get("/api/bikes");
    expect(response.statusCode).toEqual(301);
    expect(response.headers["content-type"]).toEqual(
      "text/html; charset=UTF-8"
    );
  });
});

// beforeEach(() => {
//   return createConnection({
//     type: "sqlite",
//     database: "./test.sqlite3",
//     dropSchema: true,
//     entities: [TestBikeSchema],
//     synchronize: true,
//     logging: false,
//   });
// });

// afterEach(() => {
//   let conn = getConnection();
//   return conn.close();
// });

// test("store BIKE and fetch it", async () => {
//   await getRepository(TestBike).insert({
//     bikeTitle: "BIKE",
//     imgVariants: "sth",
//     price: "200",
//   });

//   let bike = await getRepository(TestBike).find({
//     where: {
//       bikeTitle: "BIKE",
//     },
//   });
//   expect(bike[0].bikeTitle).toBe("BIKE");
// });
