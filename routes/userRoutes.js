import express from 'express';
import { register, verifyOTP, login, getUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);

export default router;