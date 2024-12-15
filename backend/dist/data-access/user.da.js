"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
const user_model_1 = __importDefault(require("../models/user.model"));
async function getAllUsers() {
    return await user_model_1.default.find();
}
async function getUser(id) {
    return await user_model_1.default.findById(id);
}
async function createUser(input) {
    return await user_model_1.default.create(input);
}
async function deleteUser(id) {
    return await user_model_1.default.findByIdAndDelete(id);
}
async function updateUser(id, input) {
    return await user_model_1.default.findByIdAndUpdate(id, input, { new: true });
}
