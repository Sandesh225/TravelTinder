import express from "express";
import { registerUser, loginUser, getUser, updateUser, deleteUser, getAllUsers, logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser); // Moved under verifyJWT
router.get("/:userId", verifyJWT, getUser);
router.put("/:userId", verifyJWT, updateUser);
router.delete("/:userId", verifyJWT, deleteUser);
router.get("/", verifyJWT, getAllUsers);

export default router;
