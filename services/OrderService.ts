import { Bikes } from "../entity/Bikes";
import { OrderBike } from "../entity/OrderBike";
import { Orders } from "../entity/Orders";
import { Users } from "../entity/Users";

// POST
async function createOrder(
  connection: any,
  orderData: any,
  userId: number,
  bikeIds: { id: number; quantity: number }[]
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

  const userRepository = connection.getRepository(Users);
  const bikeRepository = connection.getRepository(Bikes);
  const orderRepository = connection.getRepository(Orders);
  const orderBikeRepository = connection.getRepository(OrderBike);

  const user = await userRepository.findOne({ email: email });
  const bikes = await bikeRepository.findByIds(bikeIds.map((bike) => bike.id)); // Pobieramy rowery na podstawie id

  const newOrder = new Orders();
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

  const savedOrder = await orderRepository.save(newOrder);

  const orderedBikes = bikeIds.map((bikeData) => {
    const bike = bikes.find((b: { id: number }) => b.id === bikeData.id); // Pobieramy rower na podstawie id
    if (!bike) {
      throw new Error(`Bike with id ${bikeData.id} not found.`);
    }

    const orderedBike = new OrderBike();
    orderedBike.bike = bike;
    orderedBike.quantity = bikeData.quantity;
    orderedBike.order = savedOrder;
    return orderedBike;
  });

  await orderBikeRepository.save(orderedBikes);

  return savedOrder;
}
// GET all

async function getAllOrders(connection: any) {
  const orderRepository = connection.getRepository(Orders);
  const allOrders = await orderRepository
    .createQueryBuilder("order")
    .innerJoinAndSelect("order.user", "user")
    .leftJoinAndSelect("order.orderBikes", "orderBike")
    .leftJoinAndSelect("orderBike.bike", "bike")
    .getMany();
  return allOrders;
}

//GET all where
async function getAllOrdersWhere(connection: any, params: any) {
  const orderRepository = connection.getRepository(Orders);
  const allOrdersWhere = await orderRepository
    .createQueryBuilder("order")
    .innerJoinAndSelect("order.user", "user")
    .leftJoinAndSelect("order.orderBikes", "orderBike")
    .leftJoinAndSelect("orderBike.bike", "bike")
    .where("user.email = :email", { email: params.email })
    .getMany();
  return allOrdersWhere;
}

// DELETE

async function deleteOneOrder(connection: any, params: any) {
  const orderRepository = connection.getRepository(Orders);
  await orderRepository.delete({ id: params.id });
  return orderRepository.find();
}
export { createOrder, getAllOrders, getAllOrdersWhere, deleteOneOrder };
