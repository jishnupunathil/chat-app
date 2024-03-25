import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const findUser=(userName)=>{
    try{
        const user=User.findOne({userName})
        return user
    }catch (error) {
		console.log("Error finding user", error.message);
	}
}

export const createUser=async(userDetails,hashedpassword,boyProfilePic,girlProfilePic)=>{
    try{
        const { fullName, userName, gender } = userDetails;
     
        const newUser = new User({
			fullName,
			userName,
			password:hashedpassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});
        
        return newUser
        
    }catch (error) {
		console.log("Error saving user", error.message);
	}
}