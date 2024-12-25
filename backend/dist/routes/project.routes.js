"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("../controllers/project.controller");
const project_validation_1 = require("../validations/project.validation");
const validateResource_1 = __importDefault(require("../middleware/validateResource")); // Middleware for validation
const router = express_1.default.Router();
router.get('/', (0, validateResource_1.default)(project_validation_1.validateGetAllProjects), project_controller_1.getAllProjects);
router.post('/', (0, validateResource_1.default)(project_validation_1.validateCreateProject), project_controller_1.createProject);
router.get('/:id', (0, validateResource_1.default)(project_validation_1.validateGetProject), project_controller_1.getProjectById);
router.put('/:id', (0, validateResource_1.default)(project_validation_1.validateUpdateProject), project_controller_1.updateProject);
router.delete('/:id', (0, validateResource_1.default)(project_validation_1.validateDeleteProject), project_controller_1.deleteProject);
exports.default = router;
