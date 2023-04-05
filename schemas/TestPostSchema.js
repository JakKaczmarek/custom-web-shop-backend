const EntitySchema = require("typeorm").EntitySchema;
const TestPost = require("../models/TestPost").TestPost;

module.exports = new EntitySchema({
  name: "TestPost",
  target: TestPost,
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
