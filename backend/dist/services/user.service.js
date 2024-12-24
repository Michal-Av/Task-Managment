"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserUC = createUserUC;
exports.deleteUserUC = deleteUserUC;
exports.updateUserUC = updateUserUC;
exports.updateUserStatusUC = updateUserStatusUC;
exports.getAllUsersUC = getAllUsersUC;
exports.getUserUC = getUserUC;
exports.getUserByEmailUC = getUserByEmailUC;
exports.updateUserPasswordUC = updateUserPasswordUC;
const user_da_1 = require("../data-access/user.da");
async function createUserUC(body) {
    return await (0, user_da_1.createUser)(body);
}
async function deleteUserUC(params) {
    const { id } = params;
    return await (0, user_da_1.deleteUser)(id);
}
async function updateUserUC(params, body) {
    const { id } = params;
    return await (0, user_da_1.updateUser)(id, body);
}
async function updateUserStatusUC(id, status) {
    return await (0, user_da_1.updateUserStatus)(id, status);
}
async function getAllUsersUC() {
    return await (0, user_da_1.getAllUsers)();
}
async function getUserUC(params) {
    const { id } = params;
    return await (0, user_da_1.getUser)(id);
}
async function getUserByEmailUC(email) {
    return await (0, user_da_1.getUserByEmail)(email);
}
async function updateUserPasswordUC(email, pass) {
    return await (0, user_da_1.updateUserPassword)(email, pass);
}
