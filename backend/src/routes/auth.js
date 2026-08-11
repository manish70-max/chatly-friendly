import express from 'express'
import { login, logout, signUP } from '../controllers/auth.controllers.js';

const authRouter = express.Router();


authRouter.post("/signup",signUP)
authRouter.post("/login",login)
authRouter.get("/logout",logout)


export default authRouter;