import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUserWithToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "JWT_SECRET");
    return decoded; // or return decoded.user if you have a user object in the payload
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // or throw an error
  }
};

export default authenticateUserWithToken;
