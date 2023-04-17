const EntitySchema = require("typeorm").EntitySchema;
const Bikes = require("../models/Bikes").Bikes;
const Images = require("../models/Images").Images;

module.exports = new EntitySchema({
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
