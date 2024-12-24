// services/tasks.ts
import api from "./api";

export const getTasks = async () => {
  const response = await api.get("/task");
  return response.data;
};

export const getTasksByProject = async (projectId: string) => {
    const response = await api.get(`/task/project/${projectId}`);
    return response.data;
  };
  

export const addTask = async (task: { title: string; projectId: string }) => {
  const response = await api.post("/task", task);
  return response.data;
};

export const updateTask = async (id: string, updates: object) => {
  const response = await api.put(`/task/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await api.delete(`task/${id}`);
    console.log("Successfully deleted task with id:", id);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};
