const express = require("express");
const app = express();
app.use(express.json());

const {
  connect,
  getPost,
  getAllPosts,
  deletePost,
  createPost,
  updatePost,
} = require("./database/connect");

const PORT = 3000;
let connection;

//GET method

app.get("/api/posts", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const allBikes = await getAllPosts(connection);
  res.send(JSON.stringify(allBikes));
});

// DELETE bike

app.delete("/api/posts/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.id;
  const deleteBike = await deletePost(connection, id);
  res.send(JSON.stringify(deleteBike));
});
// GET by id method
app.get("/api/posts/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.id;
  const getBike = await getPost(connection, id);
  res.send(JSON.stringify(getBike));
});

//POST method

app.post("/api/posts", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const bike = await createPost(connection, req.body);
  res.send(JSON.stringify(bike));
});

app.patch("/api/posts/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.id;
  const updateBike = await updatePost(connection, id, req.body);
  res.send(JSON.stringify(updateBike));
});

app.listen(PORT, async () => {
  console.log(`Listening at localhost:${PORT}`);
  connection = await connect();
});

module.exports = { default: app };
