import { findFilteredUser } from "../helper/userHelper.js";

export const getUserForSidebar=async(req,res)=>{
    try{

        const loggedInUser=req.user._id;

        const filteredUser=await findFilteredUser(loggedInUser);

        res.status(200).json(filteredUser);

    }catch (error) {
        console.log("Error in getUserForSidebar controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
       
}