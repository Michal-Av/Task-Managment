"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasks = getAllTasks;
exports.getTask = getTask;
exports.createTask = createTask;
exports.deleteTask = deleteTask;
exports.updateTask = updateTask;
const task_model_1 = __importDefault(require("../models/task.model"));
async function getAllTasks() {
    return await task_model_1.default.find().populate('projectId').populate('assignedTo').populate('dependentTasks');
}
async function getTask(id) {
    return await task_model_1.default.findById(id).populate('projectId').populate('assignedTo').populate('dependentTasks');
}
async function createTask(input) {
    return await task_model_1.default.create(input);
}
async function deleteTask(id) {
    return await task_model_1.default.findByIdAndDelete(id);
}
async function updateTask(id, input) {
    return await task_model_1.default.findByIdAndUpdate(id, input, { new: true });
}
