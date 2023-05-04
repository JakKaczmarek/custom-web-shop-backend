import { EntitySchema } from "typeorm";
import { Images } from "../models/Images.js";
// const Images = require("../models/Images.js").default.Images;

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
  },
});
