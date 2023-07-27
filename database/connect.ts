import { Bikes } from "../entity/Bikes";
import { Images } from "../entity/Images";
import { Users } from "../entity/Users";
import { Orders } from "../entity/Orders";
import { OrderBike } from "../entity/OrderBike";
import { createConnection } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const connectServer = async (environment: string) => {
  try {
    let connectionOptions: any = {
      type: "postgres",
      host: "",
      port: 5432,
      username: "",
      password: "",
      entities: [Bikes, Images, Users, Orders, OrderBike],
      synchronize: true,
    };

    if (environment === "development") {
      connectionOptions.host = process.env.DB_HOST;
      connectionOptions.database = process.env.DB_DATABASE;
      connectionOptions.username = process.env.DB_USER;
      connectionOptions.password = process.env.DB_PASSWORD;
    } else if (environment === "test") {
      connectionOptions.host = process.env.TEST_DB_HOST;
      connectionOptions.database = process.env.TEST_DB_DATABASE;
      connectionOptions.username = process.env.TEST_DB_USER;
      connectionOptions.password = process.env.TEST_DB_PASSWORD;
    } else {
      throw new Error(`Unsupported environment: ${environment}`);
    }

    const connection = await createConnection(connectionOptions);
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return null;
  }
};

export { connectServer };
