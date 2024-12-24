// services/tasks.ts
import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const addUser = async (User: { title: string; projectId: string }) => {
  const response = await api.post("/user", User);
  return response.data;
};

export const updateUser = async (id: string, updates: object) => {
  const response = await api.put(`/user/${id}`, updates);
  return response.data;
};

export const updateUserStatus = async (id: string, status: string) => {
  try {
    await api.post('/user/status', { id, status }); 
    console.log(`User ${id} status updated to ${status}`);
  } catch (error) {
    console.error('Failed to update user status:', error);
  }
};