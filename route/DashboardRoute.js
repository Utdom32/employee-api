import express from "express";
import AuthMiddleware from '../middleware/authMiddleware.js'
import { getSummary } from "../controller/DashboardController.js";


const router = express.Router();

router.get('/summary', AuthMiddleware,getSummary)

export default router;