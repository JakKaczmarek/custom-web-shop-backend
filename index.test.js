const typeorm = require("typeorm");
const TestPost = require("./models/TestPost").TestPost;

beforeEach(() => {
  return typeorm.createConnection({
    type: "sqlite",
    database: "./test.sqlite3",
    dropSchema: true,
    entities: [require("./schemas/TestPostSchema")],
    synchronize: true,
    logging: false,
  });
});

afterEach(() => {
  let conn = typeorm.getConnection();
  return conn.close();
});

test("store BIKE and fetch it", async () => {
  await typeorm.getRepository(TestPost).insert({
    bikeTitle: "BIKE",
    imgVariants: "test",
    price: "200",
  });
  let bike = await typeorm.getRepository(TestPost).find({
    where: {
      bikeTitle: "BIKE",
    },
  });
  expect(bike[0].bikeTitle).toBe("BIKE");
});
