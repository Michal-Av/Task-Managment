import {
    createProject,
    deleteProject,
    getAllProjects,
    getProject,
    updateProject,
  } from '../data-access/project.da';
  
  export async function createProjectUC(body: any): Promise<any> {
    return await createProject(body);
  }
  
  export async function deleteProjectUC(params: { id: string }): Promise<any> {
    const { id } = params;
    return await deleteProject(id);
  }
  
  export async function updateProjectUC(params: { id: string }, body: any): Promise<any> {
    const { id } = params;
    return await updateProject(id, body);
  }
  
  export async function getAllProjectsUC(): Promise<any> {
    return await getAllProjects();
  }
  
  export async function getProjectUC(params: { id: string }): Promise<any> {
    const { id } = params;
    return await getProject(id);
  }
  