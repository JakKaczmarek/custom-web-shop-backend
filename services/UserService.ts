import { Users } from "../entity/Users.js";

async function createUser(connection: any, userData: any) {
  const { email, password } = userData;
  const newUser: any = new Users();

  newUser.email = email;
  newUser.password = password;

  const userRepository = connection.getRepository(Users);
  const savedUser = await userRepository.save(newUser);
  return savedUser;
}

async function getUserByEmail(connection: any, email: string) {
  const userRepository = connection.getRepository(Users);
  return userRepository.findOne({ where: { email } });
}

export { createUser, getUserByEmail };
