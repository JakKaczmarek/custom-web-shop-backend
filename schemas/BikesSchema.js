const EntitySchema = require("typeorm").EntitySchema;
const Bikes = require("../models/Bikes").Bikes;

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
    imgVariants: {
      type: "varchar",
    },
    price: {
      type: "int",
    },
  },
});
