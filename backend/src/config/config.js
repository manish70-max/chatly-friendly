import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URL is not defined in environment variables");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI:process.env.MONGO_URI,
  JWT_SECRET:process.env.JWT_SECRET,
  CLOUD_NAME:process.env.CLOUD_NAME,
  API_KEY:process.env.API_KEY,
  API_SECRET:process.env.API_SECRET
};

export default config;