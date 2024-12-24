import {
    createTask,
    deleteTask,
    getAllTasks,
    getTask,
    updateTask,
    getTasksByProject
  } from '../data-access/task.da';
  
  export async function createTaskUC(body: any): Promise<any> {
    return await createTask(body);
  }
  
  export async function deleteTaskUC(params: { id: string }): Promise<any> {
    const { id } = params;
    return await deleteTask(id);
  }
  
  export async function updateTaskUC(params: { id: string }, body: any): Promise<any> {
    const { id } = params;
    return await updateTask(id, body);
  }
  
  export async function getAllTasksUC(): Promise<any> {
    return await getAllTasks();
  }
  
  export async function getTaskUC(params: { id: string }): Promise<any> {
    const { id } = params;
    const task = await getTask(id);
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
}

export async function getTasksByProjectUC(params: { projectId: string }): Promise<any> {
  const { projectId } = params;
  return await getTasksByProject(projectId);
}

  