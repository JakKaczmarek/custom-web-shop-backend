const EntitySchema = require("typeorm").EntitySchema;
const Images = require("../models/Images").Images;

module.exports = new EntitySchema({
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
