// routes/index.ts
import express, { Request, Response, NextFunction } from 'express';
import csrf from 'csurf';
import userRoutes from './user.routes';
import projectRoutes from './project.routes';
import taskRoutes from './task.routes';

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get("/status", (_, res) => res.status(200).json({ status: "OK" }));

// Handle GET request to retrieve CSRF token
router.get('/csrf-token', csrfProtection, (req: Request, res: Response) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Error handling for CSRF token errors
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.status(403).json({ message: 'Invalid CSRF token' });
    } else {
        next(err);
    }
});

router.use("/auth", csrfProtection, userRoutes);
router.use('/api/user', userRoutes);
router.use('/api/project', projectRoutes);
router.use('/api/task', taskRoutes);


export default router;
