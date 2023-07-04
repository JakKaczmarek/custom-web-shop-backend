import { Users } from "../entity/Users.js";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: number;
}

async function createUser(connection: any, userData: any) {
  const { email, password } = userData;
  const newUser: any = new Users();

  newUser.email = email;
  newUser.password = password;

  const userRepository = connection.getRepository(Users);
  const savedUser = await userRepository.save(newUser);

  const token = jwt.sign({ userId: savedUser.id }, "abc", {
    expiresIn: "1h", 
  });

  savedUser.token = token;

  return savedUser;
}

async function getUserByEmail(connection: any, email: string, token: string) {
  const userRepository = connection.getRepository(Users);

  try {
    const decoded = jwt.verify(token, "abc") as DecodedToken;
    const user = await userRepository.findOne({ where: { email } });
    if (user && user.id === decoded.userId) {
      return user;
    } else {
      throw new Error("Invalid token or user not found");
    }
  } catch (error) {
    throw new Error("Invalid token");
  }
}
export { createUser, getUserByEmail };
