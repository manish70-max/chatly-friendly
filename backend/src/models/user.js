import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      requires: true,
      unique: true,
    },
    password: {
      type: String,
      requires: true,
    
    },
    image:{
        type:String,
        default:" "
    }
  },

  { timestamps: true },
);


const User = mongoose.model("User",userSchema)
export default User;