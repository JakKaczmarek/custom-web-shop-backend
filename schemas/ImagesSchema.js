import { EntitySchema } from "typeorm";
import { Images } from "../models/Images.js";

export default new EntitySchema({
  name: "images",
  target: Images,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    path: {
      type: "varchar",
    },
    bikesId: {
      type: "int",
    },
  },
  relations: {
    bikes: {
      target: "Bikes",
      type: "many-to-one",
      inverseSide: "images",
    },
  },
});
