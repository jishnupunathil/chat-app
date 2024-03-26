import { createConversation, findConversation} from "../helper/conversationControler.js";
import { createMessage } from "../helper/messageHelper.js";

export const sendMessage=async(req,res)=>{
    try{
    const senderId=req.user._id
    const {id:receiverId}=req.params;
    const {message}=req.body;

    let conversation=await findConversation(senderId,receiverId)
    
    if(!conversation){
        
        conversation=await createConversation(senderId, receiverId)
        
    }

    const newMessage=await createMessage(senderId,receiverId,message)

    console.log("🚀 ~ sendMessage ~ conversation:", conversation)

    if(newMessage) conversation.messages.push(newMessage._id)

    // await conversation.save();
	// await newMessage.save();

	// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);


    res.status(200).json(newMessage)
}catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
       
}


export const getMessages=async(req,res)=>{
    try{

        const { id: userToChatId } = req.params;
		const senderId = req.user._id;


        const conversation=await findConversation(senderId,userToChatId)

        if(!conversation) return res.status(404).json({error:"No conversation found"})

        res.status(200).json(conversation.messages)



    }catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
       
}