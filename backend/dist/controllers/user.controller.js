"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.updateUserStatus = updateUserStatus;
exports.deleteUser = deleteUser;
exports.getAllUsers = getAllUsers;
const user_service_1 = require("../services/user.service");
async function createUser(req, res) {
    try {
        await (0, user_service_1.createUserUC)(req.body);
        res.status(201).json({ message: 'User created successfully!' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function getUserById(req, res) {
    try {
        const user = await (0, user_service_1.getUserUC)(req.params);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}
async function updateUser(req, res) {
    try {
        await (0, user_service_1.updateUserUC)(req.params, req.body);
        res.status(200).json({ message: 'User updated successfully!' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function updateUserStatus(req, res) {
    const { id, status } = req.body;
    try {
        const user = await (0, user_service_1.updateUserStatusUC)(id, status);
        res.status(200).json({ message: 'User status updated successfully!', user });
    }
    catch (error) {
        console.error('Error updating user status:', error.message);
        res.status(500).json({ error: 'Failed to update user status' });
    }
}
async function deleteUser(req, res) {
    try {
        await (0, user_service_1.deleteUserUC)(req.params);
        res.status(200).json({ message: 'User deleted successfully!' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function getAllUsers(req, res) {
    try {
        const users = await (0, user_service_1.getAllUsersUC)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
