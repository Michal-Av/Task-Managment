"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.getTaskById = getTaskById;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
exports.getAllTasks = getAllTasks;
const task_service_1 = require("../services/task.service");
async function createTask(req, res) {
    try {
        const task = await (0, task_service_1.createTaskUC)(req.body);
        res.status(201).json({ message: 'Task created successfully!', task });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function getTaskById(req, res) {
    try {
        const task = await (0, task_service_1.getTaskUC)(req.params);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}
async function updateTask(req, res) {
    try {
        const task = await (0, task_service_1.updateTaskUC)(req.params, req.body);
        res.status(200).json({ message: 'Task updated successfully!', task });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function deleteTask(req, res) {
    try {
        await (0, task_service_1.deleteTaskUC)(req.params);
        res.status(200).json({ message: 'Task deleted successfully!' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function getAllTasks(req, res) {
    try {
        const tasks = await (0, task_service_1.getAllTasksUC)();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
