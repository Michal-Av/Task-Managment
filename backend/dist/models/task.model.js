"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done', 'stuck'],
        default: 'todo',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    deadline: {
        type: Date,
    },
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    assignedTo: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'users',
        }],
    dependentTasks: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'tasks',
        }],
});
exports.default = mongoose_1.default.model('tasks', taskSchema);
