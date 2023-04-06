const typeorm = require("typeorm");
const Post = require("./models/Post").Post;

const server = require("./index");
const request = require("supertest");

describe("GET all posts", () => {
  test("Status code and headers", async () => {
    const response = await request(server).get("/api/posts");
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});

beforeEach(() => {
  return typeorm.createConnection({
    type: "sqlite",
    database: "./test.sqlite3",
    dropSchema: true,
    entities: [require("./schemas/PostSchema")],
    synchronize: true,
    logging: false,
  });
});

afterEach(() => {
  let conn = typeorm.getConnection();
  return conn.close();
});

test("store BIKE and fetch it", async () => {
  await typeorm.getRepository(Post).insert({
    bikeTitle: "BIKE",
    imgVariants: "test",
    price: "200",
  });
  let bike = await typeorm.getRepository(Post).find({
    where: {
      bikeTitle: "BIKE",
    },
  });
  expect(bike[0].bikeTitle).toBe("BIKE");
});
