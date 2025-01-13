import express from "express";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";
import { getProfile } from "../controllers/get/getProfile.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", registerController);
router.post("/login", loginController);

// Protected routes
router.get("/profile", authMiddleware, getProfile);

export default router;
