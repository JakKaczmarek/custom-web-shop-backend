import { createConnection } from "typeorm";
import { Bikes } from "../entity/Bikes.js";
import { Images } from "../entity/Images.js";

const connectServer = async () => {
  try {
    return await createConnection({
      type: "sqlite",
      database: "./bikes.sqlite3",
      synchronize: true,
      logging: false,
      entities: [Bikes, Images],
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export { connectServer };
