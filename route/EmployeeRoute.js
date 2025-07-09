import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { AddEmployee, upload ,getEmployee , getEmployeeById, UpdateEmployee, fetchEmployeeByDepId} from '../controller/EmployeeController.js'

const router = express.Router()

router.post('/add',authMiddleware, upload.single("image"),AddEmployee)
router.get('/', authMiddleware,getEmployee)
router.get('/:id', authMiddleware, getEmployeeById)
router.put('/:id',authMiddleware,UpdateEmployee)
// router.delete('/:id',authMiddleware,RemoveDepartment)
router.get('/department/:id',authMiddleware,fetchEmployeeByDepId)

export default router