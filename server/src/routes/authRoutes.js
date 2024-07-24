import express from "express";
import {
    changePassword,
    forgotPassword,
    generateOTP,
    login,
    resetPassword,
    logout,
} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);

// Changing password using old password
authRouter.route("/change-password").post(authenticateToken, changePassword);

// Changing the auto generated password on the first log in request
authRouter.route("/reset-password").post(authenticateToken, resetPassword);

// Changing the password using the OTP
authRouter.route("/forgot-password").post(forgotPassword);

// Generate OTP
authRouter.route("/generate-otp").post(generateOTP);

export default authRouter;
