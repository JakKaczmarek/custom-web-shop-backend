import { Orders } from "../entity/Orders";

async function createOrder(connection: any, orderData: any) {
  const { name, email, shipping_address, total_amount } = orderData;
  const newOrder: any = new Orders();

  newOrder.name = name;
  newOrder.email = email;
  newOrder.shipping_address = shipping_address;
  newOrder.total_amount = total_amount;

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
