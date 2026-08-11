import jwt from "jsonwebtoken";
import config from "../config/config.js";

const isAuth = async (req, res, next) => {
  try {
  
     const token = req.cookies.token;

if (!token) {
  return res.status(401).json({
    success: false,
    message: "Token not found",
  });
}
    const verifyToken = jwt.verify(token, config.JWT_SECRET);

   

    req.userId = verifyToken.userId;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default isAuth;