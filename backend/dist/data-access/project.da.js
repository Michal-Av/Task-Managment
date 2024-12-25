"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = getAllProjects;
exports.getProject = getProject;
exports.createProject = createProject;
exports.deleteProject = deleteProject;
exports.updateProject = updateProject;
exports.deleteProjectWithTasks = deleteProjectWithTasks;
const project_model_1 = __importDefault(require("../models/project.model"));
const task_da_1 = require("./task.da");
async function getAllProjects() {
    return await project_model_1.default.find().populate('tasks').populate('sharedWith');
}
async function getProject(id) {
    return await project_model_1.default.findById(id).populate('tasks').populate('sharedWith');
}
async function createProject(input) {
    return await project_model_1.default.create(input);
}
async function deleteProject(id) {
    return await project_model_1.default.findByIdAndDelete(id);
}
async function updateProject(id, input) {
    return await project_model_1.default.findByIdAndUpdate(id, input, { new: true });
}
async function deleteProjectWithTasks(projectId) {
    // Delete tasks associated with the project
    await (0, task_da_1.deleteTasksByProjectId)(projectId);
    // Delete the project itself
    await project_model_1.default.findByIdAndDelete(projectId);
}
