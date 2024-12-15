"use strict";
// services/todo.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoUC = createTodoUC;
exports.deleteTodoUC = deleteTodoUC;
exports.updateTodoUC = updateTodoUC;
exports.getAllTodosUC = getAllTodosUC;
exports.getTodoUC = getTodoUC;
const todo_da_1 = require("../data-access/todo.da");
async function createTodoUC(body) {
    return await (0, todo_da_1.createTodo)(body);
}
async function deleteTodoUC(params) {
    const { id } = params;
    return await (0, todo_da_1.deleteTodo)(id);
}
async function updateTodoUC(params, body) {
    const { id } = params;
    return await (0, todo_da_1.updateTodo)(id, body);
}
async function getAllTodosUC() {
    return await (0, todo_da_1.getAllTodos)();
}
async function getTodoUC(params) {
    const { id } = params;
    return await (0, todo_da_1.getTodo)(id);
}
