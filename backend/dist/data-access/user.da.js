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
exports.updateUserPassword = updateUserPassword;
exports.updateUserStatus = updateUserStatus;
exports.getUserByEmail = getUserByEmail;
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
async function updateUserPassword(email, newPasswordHash) {
    // Update user's password in the database
    return await user_model_1.default.findOneAndUpdate({ email }, { password: newPasswordHash });
}
async function updateUserStatus(_id, status) {
    return await user_model_1.default.findOneAndUpdate({ _id }, { $set: { status } }, { new: true, upsert: false } // Update existing only, no upsert
    );
}
async function getUserByEmail(email) {
    return await user_model_1.default.findOne({ email });
}
