import { createConnection } from "typeorm";
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

export { connectServer };
