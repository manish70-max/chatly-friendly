import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    
   
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ DB Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;