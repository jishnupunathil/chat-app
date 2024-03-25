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

export const login = (req, res) => {
  res.send("login route");
  console.log("loginRoute");
};

export const logout = (req, res) => {
  res.send("logout route");
  console.log("logout route");
};
