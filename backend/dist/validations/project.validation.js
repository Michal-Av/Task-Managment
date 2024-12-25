"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteProject = exports.validateGetAllProjects = exports.validateGetProject = exports.validateUpdateProject = exports.validateCreateProject = void 0;
const Joi = require('joi');
// Validation schema for creating a project
exports.validateCreateProject = Joi.object({
    body: Joi.object({
        name: Joi.string()
            .required()
            .error(new Error('Project name is required')),
        description: Joi.string().allow('').optional(),
        owner: Joi.string()
            .required()
            .error(new Error('Owner ID is required')),
        tasks: Joi.array()
            .items(Joi.string())
            .optional()
            .error(new Error('Tasks must be an array of valid IDs')),
        sharedWith: Joi.array()
            .items(Joi.string())
            .optional()
            .error(new Error('SharedWith must be an array of valid IDs')),
    }),
    params: Joi.object(),
    query: Joi.object(),
});
// Validation schema for updating a project
exports.validateUpdateProject = Joi.object({
    params: Joi.object({
        id: Joi.string().required().error(new Error('Project ID is required')),
    }),
    body: Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().allow('').optional(),
        tasks: Joi.array()
            .items(Joi.string())
            .optional()
            .error(new Error('Tasks must be an array of valid IDs')),
        sharedWith: Joi.array()
            .items(Joi.string())
            .optional()
            .error(new Error('SharedWith must be an array of valid IDs')),
    }).min(1), // Ensure at least one field is updated
    query: Joi.object(),
});
// Validation schema for fetching a project by ID
exports.validateGetProject = Joi.object({
    params: Joi.object({
        id: Joi.string().required().error(new Error('Project ID is required')),
    }),
    body: Joi.object(),
    query: Joi.object(),
});
// Validation schema for fetching all projects
exports.validateGetAllProjects = Joi.object({
    params: Joi.object(),
    body: Joi.object(),
    query: Joi.object(),
});
// Validation schema for deleting a project
exports.validateDeleteProject = Joi.object({
    params: Joi.object({
        id: Joi.string().required().error(new Error('Project ID is required')),
    }),
    body: Joi.object(),
    query: Joi.object(),
});
