import ProjectModel, { ProjectDocument } from '../models/project.model';

export async function getAllProjects(): Promise<ProjectDocument[]> {
    return await ProjectModel.find().populate('tasks').populate('sharedWith');
}

export async function getProject(id: string): Promise<ProjectDocument | null> {
    return await ProjectModel.findById(id).populate('tasks').populate('sharedWith');
}

export async function createProject(input: any): Promise<ProjectDocument> {
    return await ProjectModel.create(input);
}

export async function deleteProject(id: string): Promise<ProjectDocument | null> {
    return await ProjectModel.findByIdAndDelete(id);
}

export async function updateProject(id: string, input: any): Promise<ProjectDocument | null> {
    return await ProjectModel.findByIdAndUpdate(id, input, { new: true });
}
