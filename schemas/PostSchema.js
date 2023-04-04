const EntitySchema = require("typeorm").EntitySchema;
const Post = require("../models/Post").Post;

module.exports = new EntitySchema({
  name: "Post",
  target: Post,
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
