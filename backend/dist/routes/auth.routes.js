"use strict";
//routes/auth.routes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authController = require('../controllers/auth.controller');
const { validateSignup, } = require('../validations/user.validation');
const router = express_1.default.Router();
exports.authRoutes = router;
// Route for authModel
router.post('/signup', validateSignup, authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
