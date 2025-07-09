import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment, getDepartment, editDepartment , UpdateDepartment, RemoveDepartment } from '../controller/departmentController.js'

const router = express.Router();


router.post('/add',authMiddleware, addDepartment)
router.get('/',authMiddleware,getDepartment)
router.get('/:id', authMiddleware, editDepartment)
router.put('/:id',authMiddleware,UpdateDepartment)
router.delete('/:id',authMiddleware,RemoveDepartment)

export default router