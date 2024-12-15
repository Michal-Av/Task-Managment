"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskUC = createTaskUC;
exports.deleteTaskUC = deleteTaskUC;
exports.updateTaskUC = updateTaskUC;
exports.getAllTasksUC = getAllTasksUC;
exports.getTaskUC = getTaskUC;
const task_da_1 = require("../data-access/task.da");
async function createTaskUC(body) {
    return await (0, task_da_1.createTask)(body);
}
async function deleteTaskUC(params) {
    const { id } = params;
    return await (0, task_da_1.deleteTask)(id);
}
async function updateTaskUC(params, body) {
    const { id } = params;
    return await (0, task_da_1.updateTask)(id, body);
}
async function getAllTasksUC() {
    return await (0, task_da_1.getAllTasks)();
}
async function getTaskUC(params) {
    const { id } = params;
    const task = await (0, task_da_1.getTask)(id);
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
}
