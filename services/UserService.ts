import { Users } from "../entity/Users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

async function createUser(connection: any, userData: any) {
  const { email, password } = userData;
  const newUser: any = new Users();

  newUser.email = email;
  newUser.password = password;
  newUser.role = "normal";

  const userRepository = connection.getRepository(Users);
  const savedUser = await userRepository.save(newUser);

  return savedUser;
}
let previousToken: string | null = null;

async function loginUser(connection: any, email: string, password: string) {
  const userRepository = connection.getRepository(Users);
  dotenv.config();
  try {
    const user = await userRepository.findOne({ where: { email, password } });
    if (user) {
      const { id, role } = user;
      if (previousToken && !isTokenValid(previousToken)) {
        const token = jwt.sign(
          { userId: id, role },
          `${process.env.TOKEN_SECRET}`,
          {
            expiresIn: "5m",
          }
        );
        previousToken = token;
        return { token, role };
      } else if (previousToken && isTokenValid(previousToken)) {
        return { token: previousToken, role };
      } else {
        const token = jwt.sign(
          { userId: id, role },
          `${process.env.TOKEN_SECRET}`,
          {
            expiresIn: "5m",
          }
        );
        previousToken = token;
        return { token, role };
      }
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    throw new Error("Invalid email or password");
  }
}

function isTokenValid(token: string): boolean {
  try {
    jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    return true;
  } catch (error) {
    return false;
  }
}

export { createUser, loginUser, isTokenValid };
