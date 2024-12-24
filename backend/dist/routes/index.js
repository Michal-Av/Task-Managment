"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/index.ts
const express_1 = __importDefault(require("express"));
const csurf_1 = __importDefault(require("csurf"));
const user_routes_1 = __importDefault(require("./user.routes"));
const project_routes_1 = __importDefault(require("./project.routes"));
const task_routes_1 = __importDefault(require("./task.routes"));
const auth_routes_1 = require("./auth.routes");
const router = express_1.default.Router();
const csrfProtection = (0, csurf_1.default)({ cookie: true });
router.get("/status", (_, res) => res.status(200).json({ status: "OK" }));
// Handle GET request to retrieve CSRF token
router.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});
// Error handling for CSRF token errors
router.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.status(403).json({ message: 'Invalid CSRF token' });
    }
    else {
        next(err);
    }
});
router.use("/auth", csrfProtection, auth_routes_1.authRoutes);
router.use('/api/user', user_routes_1.default);
router.use('/api/project', project_routes_1.default);
router.use('/api/task', task_routes_1.default);
exports.default = router;
