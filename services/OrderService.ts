import { Bikes } from "../entity/Bikes";
import { Orders } from "../entity/Orders";
import { Users } from "../entity/Users";

// POST

async function createOrder(
  connection: any,
  orderData: any,
  userId: number,
  bikeIds: number[]
) {
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
  const bikeRepository = connection.getRepository(Bikes);

  const user = await userRepository.findOne({ email: email });
  const bikes = await bikeRepository.findByIds(bikeIds);

  newOrder.name = name;
  newOrder.email = email;
  newOrder.shipping_address = shipping_address;
  newOrder.total_amount = total_amount;
  newOrder.postal_code = postal_code;
  newOrder.phone = phone;
  newOrder.city = city;
  newOrder.country = country;
  newOrder.user = user;
  newOrder.created_at = new Date();
  newOrder.bikes = bikes;

  const orderRepository = connection.getRepository(Orders);
  const savedUser = await orderRepository.save(newOrder);

  return savedUser;
}

// GET all

async function getAllOrders(connection: any) {
  const orderRepository = connection.getRepository(Orders);
  const allOrders = await orderRepository.find({
    relations: ["user", "bikes"],
  });
  return allOrders;
}

//GET all where
async function getAllOrdersWhere(connection: any, params: any) {
  const orderRepository = connection.getRepository(Orders);
  const allOrdersWhere = await orderRepository.find({
    where: { user: { email: params.email } },
    relations: ["user", "bikes"],
    loadRelations: true,
  });
  return allOrdersWhere;
}

// DELETE

async function deleteOneOrder(connection: any, params: any) {
  const orderRepository = connection.getRepository(Orders);
  await orderRepository.delete({ id: params.id });
  return orderRepository.find();
}
export { createOrder, getAllOrders, getAllOrdersWhere, deleteOneOrder };
