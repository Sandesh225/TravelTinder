import { Router } from "express";

import { createProfile, getProfile, updateProfile } from "../controllers/profile.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route("/create").post(verifyJWT, createProfile)
router.route("/profile/:profileId").put(verifyJWT,updateProfile)
router.route("/profile").get(verifyJWT,getProfile)
export default router;