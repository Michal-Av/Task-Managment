//routes/auth.routes.ts

import express, { Router } from 'express';
const authController = require('../controllers/auth.controller');

const {
    validateSignup,
} = require('../validations/user.validation');

const router: Router = express.Router();

// Route for authModel
router.post('/signup', validateSignup, authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export { router as authRoutes };