
import express from "express"
import cookieParser from "cookie-parser";



import userRoutes from "./routes/user.routes.js"





const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



app.use("/users",userRoutes)



export {app}