"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    tasks: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'tasks',
        }],
    sharedWith: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'users',
        }],
});
exports.default = mongoose_1.default.model('projects', projectSchema);
