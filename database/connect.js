const typeorm = require("typeorm");
const utils = require("../utils");
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

// GET one by id

async function getPost(connection, id) {
  const getBike = connection.getRepository(Post);
  return getBike.find({ id: id });
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

  const createBike = new Post();
  createBike.bikeTitle = utils.getRandomNameBaseOne(
    nameBase1Valid,
    nameBase2Valid
  );
  createBike.imgVariants = JSON.stringify(imgVariantsValid);
  createBike.price = utils.randomPrice(minPrice || 10, maxPrice || 20);

  const postRepository = connection.getRepository(Post);
  const savedPost = await postRepository.save(createBike);
  console.log("Post has been saved: ", savedPost);
  const getBikes = connection.getRepository(Post);

  // IF imgVariants is VARCHAR then use:
  const bikesParsed = await getBikes.find({ price: createBike.price });
  bikesParsed.forEach((element) => {
    element.imgVariants = JSON.parse(element.imgVariants);
  });
  return bikesParsed;
}

// DELETE

async function deletePost(connection, id) {
  const delBike = connection.getRepository(Post);
  await delBike.delete({ id });
  return delBike.find();
}

// PATCH

async function updatePost(connection, id, bikeData) {
  const { newBikeTitle, newImgVariants, newPrice } = bikeData;

  const updateRepository = connection.getRepository(Post);
  await updateRepository.update(
    { id },
    {
      bikeTitle: newBikeTitle,
      imgVariants: newImgVariants,
      price: newPrice,
    }
  );
  return updateRepository.find({ id: id });
}

module.exports = {
  connect,
  getAllPosts,
  getPost,
  deletePost,
  createPost,
  updatePost,
};
