import { Request, Response } from 'express';
import {
  createUserUC,
  deleteUserUC,
  getAllUsersUC,
  getUserUC,
  updateUserUC,
} from '../services/user.service';

export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        await createUserUC(req.body);
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getUserById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
        const user = await getUserUC(req.params);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
}

export async function updateUser(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
        await updateUserUC(req.params, req.body);
        res.status(200).json({ message: 'User updated successfully!' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteUser(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
        await deleteUserUC(req.params);
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const users = await getAllUsersUC();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
