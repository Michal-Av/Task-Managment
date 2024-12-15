"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectUC = createProjectUC;
exports.deleteProjectUC = deleteProjectUC;
exports.updateProjectUC = updateProjectUC;
exports.getAllProjectsUC = getAllProjectsUC;
exports.getProjectUC = getProjectUC;
const project_da_1 = require("../data-access/project.da");
async function createProjectUC(body) {
    return await (0, project_da_1.createProject)(body);
}
async function deleteProjectUC(params) {
    const { id } = params;
    return await (0, project_da_1.deleteProject)(id);
}
async function updateProjectUC(params, body) {
    const { id } = params;
    return await (0, project_da_1.updateProject)(id, body);
}
async function getAllProjectsUC() {
    return await (0, project_da_1.getAllProjects)();
}
async function getProjectUC(params) {
    const { id } = params;
    return await (0, project_da_1.getProject)(id);
}
