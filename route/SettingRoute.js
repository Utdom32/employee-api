import express from "express";
import AuthMiddleware from "../middleware/authMiddleware.js";
import { ChangePassword } from "../controller/SettingController.js";

const router = express.Router();

// Route to update employee password
router.put("/change-password", AuthMiddleware, ChangePassword)

export default router;