import { Bikes } from "../entity/Bikes.js";
import { createBikePath } from "./BikeService.js";

async function createTestBikes(connection: any) {
  const bikeRepository = connection.getRepository(Bikes);

  const testBikes = [
    {
      price: 1000,
      bike_name: "Cube 1",
      category: "Cube",
      src: "http://localhost:8000/api/bikes/bikesImages/bike1/bike1.jpg",
      alt: "Test Bike 1",
    },
    {
      price: 1500,
      bike_name: "Vitus 2",
      category: "Vitus",
      src: "http://localhost:8000/api/bikes/bikesImages/bike2/bike2.jpg",
      alt: "Test Bike 2",
    },
    {
      price: 2000,
      bike_name: "Cube 3",
      category: "Cube",
      src: "http://localhost:8000/api/bikes/bikesImages/bike3/bike3.jpg",
      alt: "Test Bike 3",
    },
    {
      price: 2500,
      bike_name: "Cube 4",
      category: "Cube",
      src: "http://localhost:8000/api/bikes/bikesImages/bike4/bike4.jpg",
      alt: "Test Bike 4",
    },
  ];

  for (const bikeData of testBikes) {
    const bike = new Bikes();
    bike.price = bikeData.price;
    bike.bike_name = bikeData.bike_name;
    bike.category = bikeData.category;
    bike.src = bikeData.src;
    bike.alt = bikeData.alt;

    const savedBike = await bikeRepository.save(bike);

    for (let i = 1; i <= 4; i++) {
      const path = `bike${i}.jpg`;
      await createBikePath(connection, path, savedBike.id);
    }
  }
}

async function checkDb(connection: any) {
  const bikeRepository = connection.getRepository(Bikes);
  const count = await bikeRepository.count();

  return count === 0;
}

export { createTestBikes, checkDb };
