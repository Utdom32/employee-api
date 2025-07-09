import express from 'express';
import AuthMiddleware from '../middleware/authMiddleware.js';
import { AddSalary, getSalary, getSalaryById } from '../controller/SalaryController.js';



const router = express.Router();

// router.get('/:id',AuthMiddleware, getSalary)
router.get('/:id/:role',AuthMiddleware, getSalaryById)
router.post('/add',AuthMiddleware, AddSalary)

export default router