// types/Task.ts

export type TaskStatus = "todo" | "in-progress" | "done" | "stuck";

export type Priority = 'low' | 'medium' | 'high';


// types/Task.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  owner?: string;
  priority?: string;
  deadline?: string;
  createdBy?: string;
  projectId?: string;
  [key: string]: string | undefined;
}
