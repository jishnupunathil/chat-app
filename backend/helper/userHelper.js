import User from "../models/userModel.js";

export const findUser=(userName)=>{
    try{
        const user=User.findOne({userName})
        return user
    }catch (error) {
		console.log("Error in findUser helper", error.message);
	}
}

export const findUserById=(userId)=>{
    try{
        const user=User.findById(userId)
        return user
    }catch (error) {
		console.log("Error in findUserById helper", error.message);
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
		console.log("Error in createUser helper", error.message);
	}
}


export const findFilteredUser=(userName)=>{
    try{
        const filteredUser=User.find({_id:{ $ne:userName }}).select({fullName:1,userName:1,gender:1,profilePic:1,_id:0})
        return filteredUser
    }catch (error) {
		console.log("Error in findFilteredUser helper", error.message);
	}
}
