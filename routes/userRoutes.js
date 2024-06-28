import express from 'express';
import { register, verifyOTP, login, getUser, updateUser } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.get('/me', authenticateToken, getUser);
router.put('/me', authenticateToken, updateUser);

export default router;