import app from "./app.js";
import { getParamsFromUrl } from "./utils/utils.js";

import {
  connectServer,
  getAllBikesWhere,
  getOneBike,
  deleteOneBike,
  createBike,
  updateBike,
} from "./database/connect.js";

const PORT = 3001;
let connection;

//GET test method
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send({});
});

//GET method

app.get("/api/bikes", async (req, res) => {
  const params = getParamsFromUrl(req.url);
  res.setHeader("Content-Type", "application/json");
  const allBikes = await getAllBikesWhere(connection, params);
  res.send(JSON.stringify(allBikes));
});

// DELETE bike

delete ("/api/bikes/:id",
async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.id;
  const deleteBike = await deleteOneBike(connection, id);
  res.send(JSON.stringify(deleteBike));
});
// GET by id method
app.get("/api/bikes/id", async (req, res) => {
  const params = getParamsFromUrl(req.url);
  res.setHeader("Content-Type", "application/json");
  const getBike = await getOneBike(connection, params);
  res.send(JSON.stringify(getBike));
});

//POST method

app.post("/api/bikes", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const bike = await createBike(connection, req.body);
  res.send(JSON.stringify(bike));
});

app.patch("/api/bikes/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.id;
  const updateNewBike = await updateBike(connection, id, req.body);
  res.send(JSON.stringify(updateNewBike));
});

const server = app.listen(PORT, async () => {
  console.log(`Listening at localhost:${PORT}`);
  connection = await connectServer();
});

export default server;
