import express, { Router } from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskByProject,
} from '../controllers/task.controller';
import {
  validateCreateTask,
  validateUpdateTask,
  validateGetTask,
  validateGetTasksByProject,
  validateDeleteTask,
} from '../validations/task.validation';
import validateResource from '../middleware/validateResource';

const router: Router = express.Router();

router.get('/', getAllTasks);
router.post('/', validateResource(validateCreateTask), createTask);
router.get('/:id', validateResource(validateGetTask), getTaskById);
router.get('/project/:projectId', validateResource(validateGetTasksByProject), getTaskByProject);
router.put('/:id', validateResource(validateUpdateTask), updateTask);
router.delete('/:id', validateResource(validateDeleteTask), deleteTask);

export default router;
