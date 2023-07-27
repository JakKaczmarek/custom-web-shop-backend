import { connectServer } from "../database/connect";
import { getAllBikes, createBike, deleteOneBike } from "./BikeService";

describe("getAllBikes", () => {
  let connection: any;

  beforeAll(async () => {
    connection = await connectServer("test");
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should return an array of bikes", async () => {
    const bikeData = {
      bike_name: "Test Bike",
      price: 999,
      category: "Test Category",
      src: "test_image.jpg",
      alt: "Test Image",
    };
    const newBike = await createBike(connection, bikeData);

    const bikes = await getAllBikes(connection);

    expect(Array.isArray(bikes)).toBe(true);

    await deleteOneBike(connection, { id: newBike.id });
  });
});
