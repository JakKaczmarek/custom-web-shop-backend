const typeorm = require("typeorm");
const utils = require("../utils/utils");
const Post = require("../models/Post").Post;

async function connect() {
  try {
    return await typeorm.createConnection({
      type: "sqlite",
      database: "./bikes.sqlite3",
      synchronize: true,
      logging: false,
      entities: [require("../schemas/PostSchema")],
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}

// GET all

async function getAllPosts(connection) {
  const postRepository = connection.getRepository(Post);
  return postRepository.find();
}

// GET one by url id

async function getPost(connection, id) {
  const getBike = connection.getRepository(Post);
  return getBike.find({ id });
}

// POST

async function createPost(connection, bikeData) {
  const { minPrice, maxPrice, nameBase1, nameBase2, imgVariants } = bikeData;

  const nameBase1Valid = nameBase1 || [
    "bike1",
    "bike2",
    "bike3",
    "bike4",
    "bike5",
    "bike6",
  ];
  const nameBase2Valid = nameBase2 || [
    "title1",
    "title2",
    "title3",
    "title4",
    "title5",
    "title6",
  ];
  const imgVariantsValid = imgVariants || [
    `/bikesImages/bikeX/Variant1`,
    `/bikesImages/bikeX/Variant2`,
    `/bikesImages/bikeX/Variant3`,
    `/bikesImages/bikeX/Variant4`,
  ];

  const newBike = new Post();
  newBike.bikeTitle = utils.getRandomNameBaseOne(
    nameBase1Valid,
    nameBase2Valid
  );
  newBike.imgVariants = JSON.stringify(imgVariantsValid);
  newBike.price = utils.randomPrice(minPrice || 10, maxPrice || 20);

  const postRepository = connection.getRepository(Post);
  const savedPost = await postRepository.save(newBike);
  console.log("Post has been saved: ", savedPost);

  // return savedPost;

  // IF imgVariants is VARCHAR then use:
  const bikesParsed = await postRepository.findOne(savedPost.id);
  bikesParsed.imgVariants = JSON.parse(bikesParsed.imgVariants);
  return bikesParsed;
}

// DELETE

async function deletePost(connection, id) {
  const bikeRepository = connection.getRepository(Post);
  await bikeRepository.delete({ id });
  return bikeRepository.find();
}

// PATCH

async function updatePost(connection, id, bikeData) {
  const updateRepository = connection.getRepository(Post);


  await updateRepository.update(
    { id },
    bikeData
  );
  return updateRepository.findOne(id);
}

function sum(a, b) {
  return a + b;
}

module.exports = {
  connect,
  getAllPosts,
  getPost,
  deletePost,
  createPost,
  updatePost,
  sum,
};
