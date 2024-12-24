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
