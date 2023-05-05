import { EntitySchema } from "typeorm";
import { Bikes } from "../models/Bikes.js";

export default new EntitySchema({
  name: "bikes",
  target: Bikes,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    bikeTitle: {
      type: "varchar",
    },
    price: {
      type: "int",
    },
  },
  relations: {
    images: {
      target: "Images",
      type: "many-to-many",
      joinTable: true,
      cascade: true,
    },
  },
});
