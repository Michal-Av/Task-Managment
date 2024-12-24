import TaskModel, { TaskDocument } from '../models/task.model';

export async function getAllTasks(): Promise<TaskDocument[]> {
    return await TaskModel.find().populate('projectId').populate('assignedTo').populate('dependentTasks');
}

export async function getTask(id: string): Promise<TaskDocument | null> {
    return await TaskModel.findById(id).populate('projectId').populate('assignedTo').populate('dependentTasks');
}

export async function createTask(input: any): Promise<TaskDocument> {
    return await TaskModel.create(input);
}

export async function deleteTask(id: string): Promise<TaskDocument | null> {
    return await TaskModel.findByIdAndDelete(id);
}

export async function updateTask(id: string, input: any): Promise<TaskDocument | null> {
    return await TaskModel.findByIdAndUpdate(id, input, { new: true });
}

export async function getTasksByProject(projectId: string): Promise<any> {
    return await TaskModel.find({ projectId });
}

