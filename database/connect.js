const typeorm = require("typeorm");
const utils = require("../utils/utils");
const Bikes = require("../models/Bikes").Bikes;

async function connect() {
  try {
    return await typeorm.createConnection({
      type: "sqlite",
      database: "./bikes.sqlite3",
      synchronize: true,
      logging: false,
      entities: [require("../schemas/BikesSchema")],
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}

// GET all

async function getAllPosts(connection, params) {
  const postRepository = connection.getRepository(Bikes);
  return postRepository.find({
    order: {
      id: params.sort_order_id,
      bikeTitle: params.sort_order_bikeTitle,
      price: params.sort_order_price,
      imgVariants: params.sort_order_imgVariants,
    },
    where: [{ price: params.q }, { bikeTitle: params.q }],
  });
}

// GET one by url id

async function getPost(connection, id) {
  const getPost = connection.getRepository(Bikes);
  return getPost.find({ id });
}

// POST

async function createPost(connection, bikeData) {
  const { price, bikeTitle, imgVariants } = bikeData;

  const imgVariantsValid = imgVariants || [
    `/bikesImages/bikeX/Variant1`,
    `/bikesImages/bikeX/Variant2`,
    `/bikesImages/bikeX/Variant3`,
    `/bikesImages/bikeX/Variant4`,
  ];

  const newPost = new Bikes();
  newPost.bikeTitle = bikeTitle;
  newPost.imgVariants = JSON.stringify(imgVariantsValid);
  newPost.price = price;

  const postRepository = connection.getRepository(Bikes);
  const savedPost = await postRepository.save(newPost);
  console.log("Post has been saved: ", savedPost);

  // return savedPost;

  // IF imgVariants is VARCHAR then use:
  const parsedPost = await postRepository.findOne(savedPost.id);
  parsedPost.imgVariants = JSON.parse(parsedPost.imgVariants);
  return parsedPost;
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
  getAllPosts,
  getPost,
  deletePost,
  createPost,
  updatePost,
};
