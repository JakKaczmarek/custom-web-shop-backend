import { Users } from "../entity/Users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

async function createUser(connection: any, userData: any) {
  const { email, password } = userData;
  const newUser: any = new Users();

  newUser.email = email;
  newUser.password = password;

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
      if (previousToken && !isTokenValid(previousToken)) {
        const token = jwt.sign(
          { userId: user.id },
          `${process.env.TOKEN_SECRET}`,
          {
            expiresIn: "5m",
          }
        );
        previousToken = token;
        return token;
      } else if (previousToken && isTokenValid(previousToken)) {
        return previousToken;
      } else {
        const token = jwt.sign(
          { userId: user.id },
          `${process.env.TOKEN_SECRET}`,
          {
            expiresIn: "5m",
          }
        );
        previousToken = token;
        return token;
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

export { createUser, loginUser };
