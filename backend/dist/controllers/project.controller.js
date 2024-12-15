"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
exports.getProjectById = getProjectById;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
exports.getAllProjects = getAllProjects;
const project_service_1 = require("../services/project.service");
async function createProject(req, res) {
    try {
        await (0, project_service_1.createProjectUC)(req.body);
        res.status(201).json({ message: 'Project created successfully!' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function getProjectById(req, res) {
    try {
        const project = await (0, project_service_1.getProjectUC)(req.params);
        res.status(200).json(project);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}
async function updateProject(req, res) {
    try {
        await (0, project_service_1.updateProjectUC)(req.params, req.body);
        res.status(200).json({ message: 'Project updated successfully!' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function deleteProject(req, res) {
    try {
        await (0, project_service_1.deleteProjectUC)(req.params);
        res.status(200).json({ message: 'Project deleted successfully!' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function getAllProjects(req, res) {
    try {
        const projects = await (0, project_service_1.getAllProjectsUC)();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
