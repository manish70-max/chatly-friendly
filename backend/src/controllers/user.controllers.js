import uploadCloudinary from "../config/cloidinary.js";
import User from "../models/user.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Current user error: ${error.message}`,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    let image;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }

    const user = await User.findByIdAndUpdate(req.userId ,{
      name,
      image,
    },{new:true});

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
return res.status(200).json({
  success: true,
  user,
});
   
  } catch (error) {

    console.log(error)
    return res.status(500).json({ message: `profile error` });
  }
};


export const getOtherUser=async(req,res)=>{

    try{
      const users=await User.find({
      
        _id:{$ne:req.userId}
        
      }).select("-password")

      return res.status(200).json(users)

    }catch(error){


      return res.status(500).json({message:`get other user error ${error} `})

    }







}

export const search = async (req, res) => {
  try {
    const { query } = req.query;

    console.log("Query:", query);

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
      ],
    });

    console.log("Users Found:", users);

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `search error ${error}` });
  }
};











// export const search=async(req,res)=>{
//   try {
//         const {query}=req.query

//         if(!query){
//           return  res.status(400).json({message:"query is required"})
//         }
//         const users =await User.find({
//           $or:[
//             {name:{$regex:query,$options:"i"}},
//             {userName:{$regex:query,$options:"i"}},
//           ]
//         })

//         return  res.status(200).json(users)


       
//   } catch (error) {

//     return res.status(500).json({message:`search error ${error}`})
    
//   }
// }