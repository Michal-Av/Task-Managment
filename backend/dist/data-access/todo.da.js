"use strict";
// data-access/todo.da.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTodos = getAllTodos;
exports.getTodo = getTodo;
exports.createTodo = createTodo;
exports.deleteTodo = deleteTodo;
exports.updateTodo = updateTodo;
const todo_model_1 = __importDefault(require("../models/todo.model"));
async function getAllTodos() {
    return await todo_model_1.default.find();
}
async function getTodo(id) {
    return await todo_model_1.default.findById(id);
}
async function createTodo(input) {
    return await todo_model_1.default.create(input);
}
async function deleteTodo(id) {
    return await todo_model_1.default.findByIdAndDelete(id);
}
async function updateTodo(id, input) {
    return await todo_model_1.default.findByIdAndUpdate(id, input, { new: true });
}
