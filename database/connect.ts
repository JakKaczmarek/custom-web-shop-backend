import { Bikes } from "../entity/Bikes.js";
import { Images } from "../entity/Images.js";
import { Users } from "../entity/Users.js";
import { Orders } from "../entity/Orders.js";
import { createConnection } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const connectServer = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432", 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Bikes, Images, Users, Orders],
      synchronize: true,
    });

    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return null;
  }
};

export { connectServer };
