"use strict";
// const Joi = require('joi');
// // Validation schema for creating a project
// export const validateCreateProject = Joi.object({
//   body: Joi.object({
//     name: Joi.string()
//       .required()
//       .error(new Error('Project name is required')),
//     description: Joi.string().allow('').optional(),
//     owner: Joi.string()
//       .required()
//       .error(new Error('Owner ID is required')),
//     tasks: Joi.array()
//       .items(Joi.string())
//       .optional()
//       .error(new Error('Tasks must be an array of valid IDs')),
//     sharedWith: Joi.array()
//       .items(Joi.string())
//       .optional()
//       .error(new Error('SharedWith must be an array of valid IDs')),
//   }),
//   params: Joi.object(),
//   query: Joi.object(),
// });
// // Validation schema for updating a project
// export const validateUpdateProject = Joi.object({
//   params: Joi.object({
//     id: Joi.string().required().error(new Error('Project ID is required')),
//   }),
//   body: Joi.object({
//     name: Joi.string().optional(),
//     description: Joi.string().allow('').optional(),
//     tasks: Joi.array()
//       .items(Joi.string())
//       .optional()
//       .error(new Error('Tasks must be an array of valid IDs')),
//     sharedWith: Joi.array()
//       .items(Joi.string())
//       .optional()
//       .error(new Error('SharedWith must be an array of valid IDs')),
//   }).min(1), // Ensure at least one field is updated
//   query: Joi.object(),
// });
// // Validation schema for fetching a project by ID
// export const validateGetProject = Joi.object({
//   params: Joi.object({
//     id: Joi.string().required().error(new Error('Project ID is required')),
//   }),
//   body: Joi.object(),
//   query: Joi.object(),
// });
// // Validation schema for fetching all projects
// export const validateGetAllProjects = Joi.object({
//   params: Joi.object(),
//   body: Joi.object(),
//   query: Joi.object(),
// });
// // Validation schema for deleting a project
// export const validateDeleteProject = Joi.object({
//   params: Joi.object({
//     id: Joi.string().required().error(new Error('Project ID is required')),
//   }),
//   body: Joi.object(),
//   query: Joi.object(),
// });
