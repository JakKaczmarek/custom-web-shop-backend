import { Orders } from "../entity/Orders";
import { Users } from "../entity/Users";

async function createOrder(connection: any, orderData: any, userId: number) {
  const {
    name,
    email,
    shipping_address,
    total_amount,
    postal_code,
    phone,
    city,
    country,
  } = orderData;
  const newOrder: any = new Orders();

  const userRepository = connection.getRepository(Users);
  const user = await userRepository.findOne({ email: email });

  newOrder.name = name;
  newOrder.email = email;
  newOrder.shipping_address = shipping_address;
  newOrder.total_amount = total_amount;
  newOrder.postal_code = postal_code;
  newOrder.phone = phone;
  newOrder.city = city;
  newOrder.country = country;
  newOrder.user = user;

  const orderRepository = connection.getRepository(Orders);
  const savedUser = await orderRepository.save(newOrder);

  return savedUser;
}

async function getAllOrders(connection: any) {
  const orderRepository = connection.getRepository(Orders);
  const allOrders = await orderRepository.find();
  return allOrders;
}

export { createOrder, getAllOrders };
