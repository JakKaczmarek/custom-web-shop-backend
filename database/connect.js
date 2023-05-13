import { createConnection } from "typeorm";
import { Bikes } from "../models/Bikes.js";
import { Images } from "../models/Images.js";
import BikesSchema from "../schemas/BikesSchema.js";
import ImagesSchema from "../schemas/ImagesSchema.js";

const connectServer = async () => {
  try {
    return await createConnection({
      type: "sqlite",
      database: "./bikes.sqlite3",
      synchronize: true,
      logging: false,
      entities: [BikesSchema, ImagesSchema],
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function getAllBikesWithPagination(connection, params) {
  const bikeRepository = connection.getRepository(Bikes);
  const take = params.limit || 10;
  const page = params.page || 1;
  const skip = (page - 1) * take;
  return bikeRepository.find({
    skip: skip,
    take: take,
  });
}

// GET all where

async function getAllBikesWhere(connection, params) {
  const bikeRepository = connection.getRepository(Bikes);
  return bikeRepository.find({
    order: {
      [params.sort_column]: params.sort_order,
    },
    where: [{ price: params.price }, { bikeTitle: params.bikeTitle }],
    relations: ["images"],
    loadRelations: true,
  });
}

// GET one by url id

async function getOneBike(connection, params) {
  const getPost = connection.getRepository(Bikes);
  return getPost.findOne({
    where: {
      id: params.id,
    },
    relations: ["images"],
    loadRelations: true,
  });
}

// UPLOADING files with path

async function createBikePath(connection, data) {
  const name = data;
  console.log(name);
  const category1 = new Images(`/images/${name}`);
  await connection.manager.save([category1]);

  const newPost = new Bikes();

  newPost.bikeTitle = "testBike";
  newPost.price = 200;
  newPost.images = [category1];

  const bikeRepository = connection.getRepository(Bikes);
  const savedBike = await bikeRepository.save(newPost);
  return savedBike;
}

// POST

async function createBike(connection, bikeData) {
  const { price, bikeTitle } = bikeData;
  const category1 = new Images("/images/{name}.png");
  await connection.manager.save([category1]);

  const newPost = new Bikes();

  newPost.bikeTitle = bikeTitle;
  newPost.price = price;
  newPost.images = [category1];

  const bikeRepository = connection.getRepository(Bikes);
  const savedBike = await bikeRepository.save(newPost);
  return savedBike;
}

// DELETE

async function deleteOneBike(connection, id) {
  const bikeRepository = connection.getRepository(Bikes);
  await bikeRepository.delete({ id });
  return bikeRepository.find();
}

// PATCH

async function updateBike(connection, id, bikeData) {
  const updateBikeRepository = connection.getRepository(Bikes);

  await updateBikeRepository.update({ id }, bikeData);
  return updateBikeRepository.findOne(id);
}

export {
  connectServer,
  getAllBikesWhere,
  getOneBike,
  deleteOneBike,
  createBike,
  updateBike,
  getAllBikesWithPagination,
  createBikePath,
};
