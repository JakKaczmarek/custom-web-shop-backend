import app from "./app.js";
import { getParamsFromUrl } from "./utils/utils.js";
import * as path from "path";
import { dirname } from "path";
import {
  getAllBikes,
  getAllBikesWhere,
  getOneBike,
  deleteOneBike,
  createBike,
  updateBike,
  getAllBikesWithPagination,
  createBikePath,
} from "./services/BikeService.js";
import { connectServer } from "./database/connect.js";

const mydir = "./index.js";
const __filename = path.resolve(mydir);
const __dirname = dirname(__filename);
const PORT = 8000;
let connection;

// TEST GET
app.get("/test", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ bikeTitle: "testBike" });
});

//GET all bikes
app.get("/api/bikes/all", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const allBikes = await getAllBikes(connection);
  res.send(JSON.stringify(allBikes));
});

//GET - Pagination for example http://localhost:8000/bikes?limit=4&page=2
app.get("/bikes", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const params = getParamsFromUrl(req.url);
  const allBikes = await getAllBikesWithPagination(connection, params);
  res.send(JSON.stringify(allBikes));
});

//GET method where

app.get("/api/bikes", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const params = getParamsFromUrl(req.url);
  const allBikes = await getAllBikesWhere(connection, params);
  res.send(JSON.stringify(allBikes));
});

// GET by id method
app.get("/api/bikes/:id", async (req, res) => {
  const id = req.params.id;
  res.setHeader("Content-Type", "application/json");
  const getBike = await getOneBike(connection, id);
  res.send(JSON.stringify(getBike));
});

// Uploading files http://localhost:8000/file

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/upload", async (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.myFile;
  const nr = req.body.toBike;
  const path = __dirname + "/public/bikesImages/bikeTest/" + file.name;
  const bike = await createBikePath(connection, file.name, nr);

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(
      JSON.stringify(bike) && {
        status: "success",
        path: path,
      }
    );
  });
});

//POST method

app.post("/api/bikes", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const bike = await createBike(connection, req.body);
  res.send(JSON.stringify(bike));
});

//UPDATE method

app.patch("/api/bikes/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.id;
  const updateNewBike = await updateBike(connection, id, req.body);
  res.send(JSON.stringify(updateNewBike));
});

// DELETE bike

app.delete("/api/bikes/delete", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const params = getParamsFromUrl(req.url);
  const deleteBike = await deleteOneBike(connection, params);
  res.send(JSON.stringify(deleteBike));
});

const server = app.listen(PORT, async () => {
  console.log(`Listening at localhost:${PORT}`);
  connection = await connectServer();
});

export default server;
