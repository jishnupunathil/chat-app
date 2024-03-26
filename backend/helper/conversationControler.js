import Conversation from "../models/conversation.js";

export const findConversation=async(senderId,receiverId)=>{
    try{

        const conversation=await Conversation.findOne({
            participents:{$all:[senderId,receiverId]}
        })

        return conversation

    }catch(error){
        console.log("Error in findConversation helper", error.message);
    }
}

export const createConversation=async(senderId,receiverId)=>{
    try{

        const conversation=await Conversation.create({
            participents:[senderId,receiverId]
        })

        return conversation

    }catch(error){
        console.log("Error in createConversation helper", error.message);
    }
}