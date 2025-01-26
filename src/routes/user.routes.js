import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { loginUser } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;