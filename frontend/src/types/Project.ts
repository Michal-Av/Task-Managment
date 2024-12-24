// types/Project.ts

export interface Project {
  _id: string | undefined;
  id: string; 
  name: string; 
  description?: string; 
  owner: string; 
  tasks: string[]; 
  sharedWith: string[]; 
  createdAt?: string; 
  updatedAt?: string; 
}