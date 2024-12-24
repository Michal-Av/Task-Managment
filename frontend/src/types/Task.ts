// types/Task.ts

export type Status = 'Todo' | 'In Progress' | 'Done' | 'Need Attention';
export type Priority = 'Low' | 'Medium' | 'High';

// types/Task.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string; // Ensure `status` is a string (e.g., "Todo", "In Progress").
  owner: string; // `owner` is the owner's ID (string).
  priority: string; // Priority as string ("High", "Medium", etc.).
  deadline: string; // ISO date string or formatted date.
  project: string; // Project ID this task belongs to
  createdBy: string;
  [key: string]: string | undefined;
}
