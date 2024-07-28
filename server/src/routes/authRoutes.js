import express from 'express';
import {
    changePassword,
    login
} from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/auth.js';

const authRouter = express.Router();

authRouter.route('/login').post(login);

// Changing password using old password
authRouter.route('/change-password').post(authenticateToken, changePassword);

export default authRouter;
