// services/api-projects.ts
import api from "./api";

export const getProjects = async () => {
  try {
    const response = await api.get("/project");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
};

export const addProject = async (project: { name: string; description?: string }) => {
  try {
    const response = await api.post("/project", project);
    return response.data;
  } catch (error) {
    console.error("Failed to create project:", error);
    throw error;
  }
};

/**
 * 
 * @param {string} id
 * delete obj by id from the local server 
 */
export const deleteProject = async (id: string): Promise<void> => {
  try {
    await api.delete(`/project/${id}`);
    console.log("Successfully deleted project with id:", id);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};