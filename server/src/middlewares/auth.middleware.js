import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";
import { asyncHandler } from "./asyncHandler.js";
import jwt from 'jsonwebtoken';

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        
        console.log("Token:", token); // Debugging

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded Token:", decodedToken); // Debugging

        const user = await User.findById(decodedToken.id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error("Error:", error); // Debugging
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export { verifyJWT };
