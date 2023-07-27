import { Bikes } from "../entity/Bikes";
import { Images } from "../entity/Images";

// GET with pagination
async function getAllBikesWithPagination(connection: any, params: any) {
  const bikeRepository = connection.getRepository(Bikes);
  const take = params.limit || 100;
  const page = params.page || 1;
  const skip = (page - 1) * take;

  const whereFieldCategory = params.category
    ? { where: { category: params.category } }
    : {};

  const whereFieldBikeNameHave = params.bike_name
    ? { where: `bike_name ILIKE '%${params.bike_name}%'` }
    : {};
  return bikeRepository.find({
    skip: skip,
    take: take,
    ...whereFieldCategory,
    ...whereFieldBikeNameHave,
    relations: ["srcArray"],
    loadRelations: true,
  });
}

// GET one by url id

async function getOneBike(connection: any, id: number) {
  const getBike = connection.getRepository(Bikes);
  return getBike.findOne({
    where: {
      id: id,
    },
    relations: ["srcArray"],
    loadRelations: true,
  });
}

// GET all bikes

async function getAllBikes(connection: any) {
  const bikeRepository = connection.getRepository(Bikes);
  return bikeRepository.find({
    relations: ["srcArray"],
    loadRelations: true,
  });
}

// GET all where
async function getAllBikesWhere(connection: any, params: any) {
  const bikeRepository = connection.getRepository(Bikes);
  return bikeRepository.find({
    where: [
      { id: params.id },
      { category: params.category },
      { price: params.price },
      { bike_name: params.bike_name },
    ],
    relations: ["srcArray"],
    loadRelations: true,
  });
}

// UPLOADING files with path

async function createBikePath(connection: any, data: string, nr: number) {
  const name = data;
  const bikeNr = nr;
  const newPath: any = new Images();

  newPath.path = `http://localhost:8000/api/bikes/bikesImages/bikeTest/${name}`;
  newPath.bikesId = bikeNr;

  const pathRepository = connection.getRepository(Images);
  const savedPath = await pathRepository.save(newPath);
  return savedPath;
}

// POST

async function createBike(connection: any, bikeData: any) {
  const { price, bike_name, category, src, alt } = bikeData;
  const newBike: any = new Bikes();

  newBike.bike_name = bike_name;
  newBike.price = price;
  newBike.category = category;
  newBike.src = src;
  newBike.alt = alt;

  const bikeRepository = connection.getRepository(Bikes);
  const savedBike = await bikeRepository.save(newBike);
  return savedBike;
}

// PATCH

async function updateBike(connection: any, id: number, bikeData: any) {
  const updateBikeRepository = connection.getRepository(Bikes);
  await updateBikeRepository.update({ id }, bikeData);
  return updateBikeRepository.findOne(id);
}

// DELETE

async function deleteOneBike(connection: any, params: any) {
  const bikeRepository = connection.getRepository(Bikes);
  await bikeRepository.delete({ id: params.id });
  return bikeRepository.find();
}

export {
  getAllBikes,
  getAllBikesWhere,
  getOneBike,
  deleteOneBike,
  createBike,
  updateBike,
  getAllBikesWithPagination,
  createBikePath,
};
