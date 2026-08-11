import express from 'express';
import config from './src/config/config.js';
import connectDB from './src/config/db.js';
import authRouter from './src/routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './src/routes/user.routes.js';
import messageRouter from './src/routes/message.routes.js';
import { app, server } from './src/socket/socket.js';
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// const  app = express();

app.use(cors({
    origin:"https://chatly-friendly.onrender.com",
    credentials:true
}))
app.use(express.json())

app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)

connectDB();


server.listen(config.PORT,()=>{
    console.log(`server is running  ${config.PORT} `)

})
