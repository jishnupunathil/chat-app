import jwt from "jsonwebtoken";
import { findUserById } from "../helper/userHelper.js";

const protectRoute = async (req, res, next) => {
    console.log('0000000000000');
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ error: "Unauthorized - No Token Provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(401).json({ error: "Unauthorized - Invalid Token" });

    const user = await findUserById(decoded.userId);

    if (!user) return res.status(401).json({ error: "Unauthorized - User not found" });

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute
