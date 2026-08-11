import uploadCloudinary from "../config/cloidinary.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";



export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const receiverId = req.params.receiver;

  

    const { message } = req.body;

    let image;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiverId] },
    });

    
    const newMessage = await Message.create({
      sender,
      receiver: receiverId,
      message,
      image,
    });

 
    if (!conversation) {
      console.log("Creating Conversation...");

      conversation = await Conversation.create({
        participants: [sender, receiverId],
        messages: [newMessage._id],
      });

    
    } else {
      console.log("Updating Conversation...");

      conversation.messages.push(newMessage._id);
      await conversation.save();

     
    }

    const receiverSocketId = getReceiverSocketId(receiverId);

 

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("SEND MESSAGE ERROR:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};



export const getMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const receiverId = req.params.receiver;

    

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiverId] },
    }).populate("messages");

   
    if (!conversation) {
      console.log("❌ No Conversation Found");
      return res.status(200).json([]);
    }

   

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("GET MESSAGE ERROR:", error);
    return res.status(500).json({
      message: `get Message error ${error.message}`,
    });
  }
};
