import { findUser, createUser } from "../helper/userHelper.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
      console.log("🚀 ~ signup ~ req.body:", req.body)
      const { userName, password, confirmPassword} = req.body;
      
      
      if (password !== confirmPassword) {
          return res.status(400).json({ error: "Passwords don't match" });
        }
        
        const user = await findUser(userName);
        
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    //hashedpassword
    const salt=await bcrypt.genSalt(10)
    const hashedpassword=await bcrypt.hash(password,salt)

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = await createUser(req.body,hashedpassword, boyProfilePic, girlProfilePic);

    if (newUser) {
      generateTokenAndSetCookie(newUser._id,res)
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    }else{
      res.status(400).json({error:'Invalid user data'})
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login =async (req, res) => {
  try {
    const { userName, password } = req.body;
		const user = await findUser(userName);
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user ) {
			return res.status(400).json({ error: "Invalid username " });
		}else if(!isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			userName: user.userName,
			profilePic: user.profilePic,
		});
 

    } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
