import { Request, Response } from 'express';
import {
  createTaskUC,
  deleteTaskUC,
  getAllTasksUC,
  getTaskUC,
  updateTaskUC,
  getTasksByProjectUC
} from '../services/task.service';

export async function createTask(req: Request, res: Response): Promise<void> {
    try {
        const task = await createTaskUC(req.body);
        res.status(201).json({ message: 'Task created successfully!', task });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getTaskById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
        const task = await getTaskUC(req.params);
        res.status(200).json(task);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
}

export async function updateTask(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
        const task = await updateTaskUC(req.params, req.body);
        res.status(200).json({ message: 'Task updated successfully!', task });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteTask(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
        await deleteTaskUC(req.params);
        res.status(200).json({ message: 'Task deleted successfully!' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getAllTasks(req: Request, res: Response): Promise<void> {
    try {
        const tasks = await getAllTasksUC();
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getTaskByProject(req: Request<{ projectId: string }>, res: Response): Promise<void> {
    try {
        const tasks = await getTasksByProjectUC(req.params);
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

