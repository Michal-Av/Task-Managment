import { Request, Response } from 'express';
import {
  createProjectUC,
  deleteProjectUC,
  getAllProjectsUC,
  getProjectUC,
  updateProjectUC,
} from '../services/project.service';

export async function createProject(req: Request, res: Response): Promise<void> {
    try {
        await createProjectUC(req.body);
        res.status(201).json({ message: 'Project created successfully!' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getProjectById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
        const project = await getProjectUC(req.params);
        res.status(200).json(project);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
}

export async function updateProject(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
        await updateProjectUC(req.params, req.body);
        res.status(200).json({ message: 'Project updated successfully!' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteProject(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
        await deleteProjectUC(req.params);
        res.status(200).json({ message: 'Project deleted successfully!' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getAllProjects(req: Request, res: Response): Promise<void> {
    try {
        const projects = await getAllProjectsUC();
        res.status(200).json(projects);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
