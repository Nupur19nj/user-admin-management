import express from 'express';
import { registerAdmin, loginAdmin, viewAllUsers, viewUserDetails, deleteUser } from '../controllers/adminController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', authenticateToken, viewAllUsers);
router.get('/users/:username', authenticateToken, viewUserDetails);
router.delete('/users/:username', authenticateToken, deleteUser);

export default router;
