
import express from "express"
import cookieParser from "cookie-parser";



import userRoutes from "./routes/user.routes.js"
import profileRoutes from './routes/profile.routes.js';
import travelRoutes from './routes/travelPrefences.routes.js'
import matchRoutes from './routes/match.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import { errorHandler } from "./middlewares/errorHandler.js";



const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



app.use("/api/users",userRoutes)
app.use("/api/profile",profileRoutes)
app.use("/api/travel",travelRoutes)
app.use("/api/matches",matchRoutes)
app.use("/api/notifications",notificationRoutes)

app.use(errorHandler)

export {app}