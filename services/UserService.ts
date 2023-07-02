import { Users } from "../entity/Users.js";

async function createUser(connection: any, userData: any) {
  const { login, password } = userData;
  const newUser: any = new Users();

  newUser.login = login;
  newUser.password = password;

  const userRepository = connection.getRepository(Users);
  const savedUser = await userRepository.save(newUser);
  return savedUser;
}

async function getUserByLogin(connection: any, login: string) {
  const userRepository = connection.getRepository(Users);
  return userRepository.findOne({ where: { login } });
}

export { createUser, getUserByLogin };
