import { connectServer } from "../database/connect";
import { createOrder } from "./OrderService";
import { Users } from "../entity/Users";
import { Bikes } from "../entity/Bikes";

describe("createOrder", () => {
  let connection: any;

  beforeAll(async () => {
    connection = await connectServer("test");
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should create a new order", async () => {
    const userData = {
      email: "test@example.com",
      name: "Test User",
      shipping_address: "Test Address",
      postal_code: "12345",
      phone: "123456789",
      city: "Test City",
      country: "Test Country",
      password: "test123",
      role: "normal"
    };
    const userRepository = connection.getRepository(Users);
    const newUser = await userRepository.save(userData);

    const bikeData = {
      bike_name: "Test Bike",
      price: 999,
      category: "Test Category",
      src: "test_image.jpg",
      alt: "Test Image",
    };
    const bikeRepository = connection.getRepository(Bikes);
    const newBike = await bikeRepository.save(bikeData);

    const orderData = {
      name: "Test Order",
      email: userData.email,
      shipping_address: userData.shipping_address,
      total_amount: newBike.price * 2,
      postal_code: userData.postal_code,
      phone: userData.phone,
      city: userData.city,
      country: userData.country,
    };
    const order = await createOrder(connection, orderData, newUser.id, [
      { id: newBike.id, quantity: 2 },
    ]);

    expect(order).toBeDefined();
    expect(order.name).toBe(orderData.name);
    expect(order.email).toBe(orderData.email);
    expect(order.shipping_address).toBe(orderData.shipping_address);
    expect(order.total_amount).toBe(orderData.total_amount);

  });
});
