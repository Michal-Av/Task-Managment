"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const task_validation_1 = require("../validations/task.validation");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const router = express_1.default.Router();
router.get('/', task_controller_1.getAllTasks);
router.post('/', (0, validateResource_1.default)(task_validation_1.validateCreateTask), task_controller_1.createTask);
router.get('/:id', (0, validateResource_1.default)(task_validation_1.validateGetTask), task_controller_1.getTaskById);
router.get('/project/:projectId', (0, validateResource_1.default)(task_validation_1.validateGetTasksByProject), task_controller_1.getTaskByProject);
router.put('/:id', (0, validateResource_1.default)(task_validation_1.validateUpdateTask), task_controller_1.updateTask);
router.delete('/:id', (0, validateResource_1.default)(task_validation_1.validateDeleteTask), task_controller_1.deleteTask);
exports.default = router;
