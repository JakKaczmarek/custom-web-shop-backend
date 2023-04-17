const typeorm = require("typeorm");
const Bikes = require("../models/Bikes").Bikes;
const Images = require("../models/Images").Images;

async function connect() {
  try {
    return await typeorm.createConnection({
      type: "sqlite",
      database: "./bikes.sqlite3",
      synchronize: true,
      logging: false,
      entities: [
        require("../schemas/BikesSchema"),
        require("../schemas/ImagesSchema"),
      ],
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}

// GET all where

async function getAllPostsWhere(connection, params) {
  const postRepository = connection.getRepository(Bikes);
  return postRepository.find({
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

async function getPost(connection, params) {
  const getPost = connection.getRepository(Bikes);
  return getPost.find({
    where: {
      id: params.q,
    },
    relations: ["images"],
    loadRelations: true,
  });
}

// POST

async function createPost(connection, bikeData) {
  const { price, bikeTitle } = bikeData;

  // const imagesTest = new Images();
  // paths = JSON.stringify([
  //   `/bikesImages/bike1/Variant1.jpg`,
  //   `/bikesImages/bike1/Variant2.jpg`,
  //   `/bikesImages/bike1/Variant3.jpg`,
  //   `/bikesImages/bike1/Variant4.jpg`,
  // ]);

  // await connection.manager.save(imagesTest);
  const category1 = new Images("TestPath");
  await connection.manager.save([category1]);

  const newPost = new Bikes();

  newPost.bikeTitle = bikeTitle;
  newPost.price = price;
  newPost.images = [category1];

  // newPost.imgVariants = imagesTest;

  const postRepository = connection.getRepository(Bikes);
  const savedPost = await postRepository.save(newPost);

  console.log("Post has been saved: ", savedPost);

  return savedPost;

  // IF imgVariants is VARCHAR then use:
  // const createdPost = await postRepository.findOne(savedPost.id);
  // return createdPost;
}

// DELETE

async function deletePost(connection, id) {
  const postRepository = connection.getRepository(Bikes);
  await postRepository.delete({ id });
  return postRepository.find();
}

// PATCH

async function updatePost(connection, id, bikeData) {
  const updateRepository = connection.getRepository(Bikes);

  await updateRepository.update({ id }, bikeData);
  return updateRepository.findOne(id);
}

module.exports = {
  connect,
  getAllPostsWhere,
  getPost,
  deletePost,
  createPost,
  updatePost,
};
