"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    projects: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "projects",
        },
    ],
    role: {
        type: String,
        enum: ["Admin", "Editor", "Viewer"],
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline",
    },
});
exports.default = mongoose_1.default.model("users", userSchema);
