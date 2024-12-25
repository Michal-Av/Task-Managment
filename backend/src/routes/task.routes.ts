import express, { Router } from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskByProject,
} from '../controllers/task.controller';

const router: Router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.get('/project/:projectId', getTaskByProject);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
