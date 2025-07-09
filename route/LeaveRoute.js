import express from "express";
import AuthMiddleware from "../middleware/authMiddleware.js"
import { AddLeaveRequest, GetLeaveRequests, GetLeaveRequestById, GetLeaveDetailById, UpdateLeaveStatus } from "../controller/LeaveController.js";


const router = express.Router();

// Route to add a leave request
router.post('/add', AuthMiddleware, AddLeaveRequest);
router.get('/detail/:id', AuthMiddleware, GetLeaveDetailById);
router.get('/:id/:role', AuthMiddleware, GetLeaveRequestById);
router.get('/', AuthMiddleware, GetLeaveRequests);
router.put('/:id', AuthMiddleware, UpdateLeaveStatus);


export default router;