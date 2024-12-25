// types/Task.ts

export type Status = 'Todo' | 'In Progress' | 'Done' | 'Need Attention';
export type Priority = 'Low' | 'Medium' | 'High';
export enum TaskStatus {
  Todo = "todo",
  InProgress = "in-progress",
  Done = "done",
  Stuck = "stuck",
}

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
