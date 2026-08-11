import jwt from "jsonwebtoken";
import config from "./config.js";
const genToken = (userId) => {
  return jwt.sign(
    { userId },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export default genToken;