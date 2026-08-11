import User from "../models/user.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";


export const signUP = async (req, res) => {
  try {

    console.log(req.body); // 👈 Add this

    const { userName, email, password } = req.body;

    const checkUserByUsername = await User.findOne({ userName });
    if (checkUserByUsername) {
      return res.status(400).json({ message: "userName alreay exit" });
    }
    const checkUserByEmail = await User.findOne({ email });
    if (checkUserByEmail) {
      return res.status(400).json({ message: "email alreay exit" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at 6 number" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = await genToken(user._id);
    console.log("Generated Token:", token);

  
    res.cookie("token", token, {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: "None",
  secure: true,
});

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `signup error ${error}` });
  }
};



export const login = async (req, res) => {
  console.log(req.body); // 👈 Add this

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user doesn't exit" });
    }
   
    const isMatch = await bcrypt.compare(password,user.password)
    
    if(!isMatch){

        return res.status(400).json({message:"Incorrect password "})

    }



    
    const token = await genToken(user._id);

  res.cookie("token", token, {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: "None",
  secure: true,
});
      

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};


export const logout = async(req,res)=>{

     try{
 
          res.clearCookie("token")
          return res.status(200).json({message:"log out successfully "})
         
     }
     catch(error){

        return res.status(500).json({message:`logout error  ${error}`})



     }

}
