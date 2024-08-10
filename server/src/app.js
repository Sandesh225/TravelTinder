
import express from "express"
import cookieParser from "cookie-parser";


import { errorHandler } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/user.routes.js"





const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



app.use("/users",userRoutes)

app.use(errorHandler)

export {app}