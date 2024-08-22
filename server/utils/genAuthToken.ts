import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserTokenType } from "../types";

dotenv.config();

const genAuthToken = (user: UserTokenType) => {
  const authKey = process.env.JWT_SCRECT || "JWT_SCRECT";
  const authToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      slug: user.slug,
      isSeller: user.isSeller,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      isNumberVerified: user.isNumberVerified,
      profile: user.profile,
      number: user.number,
      address: user.address,
      type: user.type,
    },
    authKey
  );

  return authToken;
};

export default genAuthToken;
