import Message from "../models/messageModel.js";

export const createMessage=async(senderId,receiverId,message)=>{
    try{

       const newMessage = new Message({
            senderId,
            receiverId,
            message
       })

       return newMessage

    }catch(error){
        console.log("Error in createMessage helper", error.message);
    }
}