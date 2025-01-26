import { Router } from 'express';
import { applyForLoan } from '../controllers/loan.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/apply').post(authenticateUser, applyForLoan);

export default router;