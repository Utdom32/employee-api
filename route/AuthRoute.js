import express from 'express';
import { Login, verify } from '../controller/loginController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to check if the user is authenticated
router.post('/login', Login);
router.get('/verify', authMiddleware, verify);


export default router;