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
import { createTestBikes, checkDb } from "./services/testBikesService.js";
import { connectServer } from "./database/connect.js";
import { createUser, isTokenValid, loginUser } from "./services/UserService.js";
import {
  createOrder,
  getAllOrders,
  getAllOrdersWhere,
} from "./services/OrderService.js";

const mydir = "./index.js";
const __filename = path.resolve(mydir);
const __dirname = dirname(__filename);
const PORT = 8000;
let connection: any;

// TEST GET
app.get("/test", (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ bikeTitle: "testBike" });
});

//GET all bikes
app.get("/api/bikes/all", async (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const allBikes = await getAllBikes(connection);
  res.send(JSON.stringify(allBikes));
});

//GET Pagination
app.get("/bikes", async (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const params = getParamsFromUrl(req.url);
  const allBikes = await getAllBikesWithPagination(connection, params);
  res.send(JSON.stringify(allBikes));
});

//GET where

app.get("/api/bikes", async (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const params = getParamsFromUrl(req.url);
  const allBikes = await getAllBikesWhere(connection, params);
  res.send(JSON.stringify(allBikes));
});

// GET by id
app.get("/api/bikes/:id", async (req: any, res: any) => {
  const id = req.params.id;
  res.setHeader("Content-Type", "application/json");
  const getBike = await getOneBike(connection, id);
  res.send(JSON.stringify(getBike));
});

// Uploading files

app.post("/upload", async (req: any, res: any) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  if (!req.body.bikesId) {
    return res.status(400).send("No bikesId were uploaded");
  }
  const file = req.files.file;
  const nr = req.body.bikesId;
  const path = __dirname + "/public/bikesImages/bikeTest/" + file.name;
  const bike = await createBikePath(connection, file.name, nr);
  file.mv(path, (err: any) => {
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

app.post("/api/bikes", async (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const bike = await createBike(connection, req.body);
  res.send(JSON.stringify(bike));
});

//UPDATE method

app.patch("/api/bikes/:id", async (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.id;
  const updateNewBike = await updateBike(connection, id, req.body);
  res.send(JSON.stringify(updateNewBike));
});

// DELETE bike

app.delete("/api/bikes/delete", async (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const params = getParamsFromUrl(req.url);
  const deleteBike = await deleteOneBike(connection, params);
  res.send(JSON.stringify(deleteBike));
});

// CREATE user
app.post("/api/users/register", async (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const user = await createUser(connection, req.body);
  res.send(JSON.stringify(user));
});

// LOGIN user
app.post("/api/users/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  res.setHeader("Content-Type", "application/json");
  try {
    const { token, role } = await loginUser(connection, email, password);
    res.send(JSON.stringify({ token, role }));
  } catch (error: any) {
    res.status(401).send(JSON.stringify({ error: error.message }));
  }
});

// VERIFY token
app.post("/api/users/verify", (req, res) => {
  const { token } = req.body;
  const isValid = isTokenValid(token);
  res.json({ isValid });
});

// CREATE order
app.post("/api/orders/register", async (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const order = await createOrder(connection, req.body, req.body.email);
  res.send(JSON.stringify(order));
});

//GET all orders
app.get("/api/orders/all", async (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const allOrders = await getAllOrders(connection);
  res.send(JSON.stringify(allOrders));
});

//GET where

app.get("/api/orders", async (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  const params = getParamsFromUrl(req.url);
  const allOrdersWhere = await getAllOrdersWhere(connection, params);
  res.send(JSON.stringify(allOrdersWhere));
});

const server = app.listen(PORT, async () => {
  console.log(`Listening at localhost:${PORT}`);
  connection = await connectServer();
  if (await checkDb(connection)) {
    // await createTestBikes(connection);
  }
});

export default server;
