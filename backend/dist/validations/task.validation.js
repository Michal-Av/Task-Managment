"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteTask = exports.validateGetTasksByProject = exports.validateGetTask = exports.validateUpdateTask = exports.validateCreateTask = void 0;
const Joi = require('joi');
// Validation schema for creating a task
exports.validateCreateTask = Joi.object({
    body: Joi.object({
        title: Joi.string()
            .required()
            .error(new Error('Title is required')),
        description: Joi.string().allow('').optional(),
        status: Joi.string()
            .valid('todo', 'in-progress', 'done', 'stuck')
            .default('todo')
            .optional()
            .error(new Error('Status must be one of todo, in-progress, done, or stuck')),
        priority: Joi.string()
            .valid('low', 'medium', 'high')
            .default('medium')
            .optional()
            .error(new Error('Priority must be one of low, medium, or high')),
        deadline: Joi.date().optional().allow(null),
        projectId: Joi.string()
            .required()
            .error(new Error('Project ID is required')),
        createdBy: Joi.string()
            .required()
            .error(new Error('Creator ID is required')),
        assignedTo: Joi.array()
            .items(Joi.string())
            .optional(),
        dependentTasks: Joi.array()
            .items(Joi.string())
            .optional(),
    }),
    params: Joi.object(),
    query: Joi.object(),
});
// Validation schema for updating a task
exports.validateUpdateTask = Joi.object({
    params: Joi.object({
        id: Joi.string().required().error(new Error('Task ID is required')),
    }),
    body: Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().allow('').optional(),
        status: Joi.string()
            .valid('todo', 'in-progress', 'done', 'stuck')
            .optional()
            .error(new Error('Status must be one of todo, in-progress, done, or stuck')),
        priority: Joi.string()
            .valid('low', 'medium', 'high')
            .optional()
            .error(new Error('Priority must be one of low, medium, or high')),
        deadline: Joi.date().optional().allow(null),
        assignedTo: Joi.array()
            .items(Joi.string())
            .optional(),
        dependentTasks: Joi.array()
            .items(Joi.string())
            .optional(),
    }).min(1), // Ensure at least one field is updated
    query: Joi.object(),
});
// Validation schema for fetching a task by ID
exports.validateGetTask = Joi.object({
    params: Joi.object({
        id: Joi.string().required().error(new Error('Task ID is required')),
    }),
    body: Joi.object(),
    query: Joi.object(),
});
// Validation schema for fetching tasks by project ID
exports.validateGetTasksByProject = Joi.object({
    params: Joi.object({
        projectId: Joi.string().required().error(new Error('Project ID is required')),
    }),
    body: Joi.object(),
    query: Joi.object(),
});
// Validation schema for deleting a task
exports.validateDeleteTask = Joi.object({
    params: Joi.object({
        id: Joi.string().required().error(new Error('Task ID is required')),
    }),
    body: Joi.object(),
    query: Joi.object(),
});
