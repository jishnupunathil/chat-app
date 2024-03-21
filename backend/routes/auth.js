import  express  from "express";
import { login, logout, signup } from "../controllers/authControllers.js";

const router=express()

router.get('/signup',signup)

router.get('/login',login)

router.get('/logout',logout)

export default router