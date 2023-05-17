import { Bikes } from "../models/Bikes.js";
import { Images } from "../models/Images.js";
// GET with pagination

async function getAllBikesWithPagination(connection, params) {
  const bikeRepository = connection.getRepository(Bikes);
  const take = params.limit || 10;
  const page = params.page || 1;
  const skip = (page - 1) * take;
  return bikeRepository.find({
    skip: skip,
    take: take,
    relations: ["srcArray"],
    loadRelations: true,
  });
}

// GET all where

async function getAllBikesWhere(connection, params) {
  const bikeRepository = connection.getRepository(Bikes);
  return bikeRepository.find({
    order: {
      [params.sort_column]: params.sort_order,
    },
    where: [{ price: params.price }, { bikeName: params.bikeName }],
    relations: ["srcArray"],
    loadRelations: true,
  });
}

// GET one by url id

async function getOneBike(connection, params) {
  const getBike = connection.getRepository(Bikes);
  return getBike.findOne({
    where: {
      id: params.id,
    },
    relations: ["srcArray"],
    loadRelations: true,
  });
}
// DELETE

async function deleteOneBike(connection, params) {
  const bikeRepository = connection.getRepository(Bikes);
  await bikeRepository.delete({ id: params.id });
  return bikeRepository.find();
}

// UPLOADING files with path

async function createBikePath(connection, data) {
  const name = data;
  const category1 = new Images(
    `http://localhost:8000/api/bikes/bikesImages/bikeTest/${name}`
  );
  await connection.manager.save([category1]);

  const newBike = new Bikes();

  newBike.bikeName = "testBike";
  newBike.price = 5000;
  newBike.category = "Test";
  newBike.src = "http://localhost:8000/api/bikes/bikesImages/bike1/bike1.jpg";
  newBike.alt = "bike4";
  newBike.images = [category1];

  const bikeRepository = connection.getRepository(Bikes);
  const savedBike = await bikeRepository.save(newBike);
  return savedBike;
}

// POST

async function createBike(connection, bikeData) {
  const { price, bikeTitle, category, src, alt } = bikeData;
  const category1 = new Images(
    "http://localhost:8000/api/bikes/bikesImages/bikeTest/{name}.png"
  );
  await connection.manager.save([category1]);

  const newBike = new Bikes();

  newBike.bikeTitle = bikeTitle;
  newBike.price = price;
  newBike.category = category;
  newBike.src = src;
  newBike.alt = alt;
  newBike.images = [category1];

  const bikeRepository = connection.getRepository(Bikes);
  const savedBike = await bikeRepository.save(newBike);
  return savedBike;
}

// PATCH

async function updateBike(connection, id, bikeData) {
  const updateBikeRepository = connection.getRepository(Bikes);

  await updateBikeRepository.update({ id }, bikeData);
  return updateBikeRepository.findOne(id);
}

export {
  getAllBikesWhere,
  getOneBike,
  deleteOneBike,
  createBike,
  updateBike,
  getAllBikesWithPagination,
  createBikePath,
};
