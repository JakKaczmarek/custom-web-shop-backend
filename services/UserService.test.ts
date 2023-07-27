import { connectServer } from "../database/connect";
import { createUser } from "./UserService";

describe("User Service", () => {
  let connection: any;

  beforeAll(async () => {
    connection = await connectServer("test");
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Should create a new user", async () => {
    const userData = {
      email: "test@example.com",
      password: "test123",
    };

    const user = await createUser(connection, userData);

    expect(user).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.password).toBe(userData.password);
    expect(user.role).toBe("normal");
  });
});
