import app from "./app.js";
import { getParamsFromUrl } from "./utils/utils.js";
import {
  connectServer,
  getAllBikesWhere,
  getOneBike,
  deleteOneBike,
  createBike,
  updateBike,
  getAllBikesWithPagination,
} from "./database/connect.js";
import * as path from "path";
import fileUpload from "express-fileupload";
import { dirname } from "path";
const mydir = "./index.js";
const __filename = path.resolve(mydir);
const __dirname = dirname(__filename);

app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

const PORT = 3000;
let connection;

// TEST GET
app.get("/test", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ bikeTitle: "testBike" });
});

// Uploading files http://localhost:3000

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.myFile;
  const path = __dirname + "/public/bikesImages/bikeTest/" + file.name;

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });
});

//GET - Pagination for example http://localhost:3000/bikes?limit=4&page=2
app.get("/bikes", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const params = getParamsFromUrl(req.url);
  const allBikes = await getAllBikesWithPagination(connection, params);
  res.send(JSON.stringify(allBikes));
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
