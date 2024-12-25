import express, { Router } from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import {
  validateCreateProject,
  validateUpdateProject,
  validateGetProject,
  validateGetAllProjects,
  validateDeleteProject,
} from '../validations/project.validation';
import validateRequest from '../middleware/validateResource'; // Middleware for validation

const router: Router = express.Router();

router.get('/', validateRequest(validateGetAllProjects), getAllProjects);
router.post('/', validateRequest(validateCreateProject), createProject);
router.get('/:id', validateRequest(validateGetProject), getProjectById);
router.put('/:id', validateRequest(validateUpdateProject), updateProject);
router.delete('/:id', validateRequest(validateDeleteProject), deleteProject);

export default router;
