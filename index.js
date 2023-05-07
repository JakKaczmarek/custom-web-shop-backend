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

// GET TEST Pagination http://localhost:3001/bikes?page=1&limit=3

const bikes = [
  { id: 1, name: "bike1" },
  { id: 2, name: "bike2" },
  { id: 3, name: "bike3" },
  { id: 4, name: "bike4" },
  { id: 5, name: "bike5" },
  { id: 6, name: "bike6" },
];

const bikes2 = [
  { id: 11, name: "bike11" },
  { id: 22, name: "bike22" },
  { id: 33, name: "bike33" },
  { id: 44, name: "bike44" },
  { id: 55, name: "bike55" },
  { id: 66, name: "bike66" },
];

app.get("/bikes2", paginatedResults(bikes2), (req, res) => {
  res.send(res.paginatedResults);
});

app.get("/bikes", paginatedResults(bikes), (req, res) => {
  res.send(res.paginatedResults);
});

// function to move
function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = model.slice(startIndex, endIndex);
    res.paginatedResults = results;
    next();
  };
}

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
