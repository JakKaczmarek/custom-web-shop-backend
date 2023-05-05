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

// GET all where

async function getAllBikesWhere(connection, params) {
  const bikeRepository = connection.getRepository(Bikes);
  return bikeRepository.find({
    // order: {
    //   [params.id]: params.sort_order,
    // },
    order: {
      id: params.sort_order_id,
      bikeTitle: params.sort_order_bikeTitle,
      price: params.sort_order_price,
    },
    where: [{ price: params.q }, { bikeTitle: params.q }],
    relations: ["images"],
    loadRelations: true,
  });
}

// GET one by url id

async function getOneBike(connection, params) {
  const getPost = connection.getRepository(Bikes);
  return getPost.findOne({
    where: {
      id: params.q,
    },
    relations: ["images"],
    loadRelations: true,
  });
}

// POST

async function createBike(connection, bikeData) {
  const { price, bikeTitle } = bikeData;
  const category1 = new Images("TestPath");
  await connection.manager.save([category1]);

  const newPost = new Bikes();

  newPost.bikeTitle = bikeTitle;
  newPost.price = price;
  newPost.images = [category1];

  const bikeRepository = connection.getRepository(Bikes);
  const savedBike = await bikeRepository.save(newPost);

  console.log("Post has been saved: ", savedBike);

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
};
