import mongoose, { Document } from 'mongoose';

export interface Task {
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done' | 'stuck';
  priority: 'low' | 'medium' | 'high';
  deadline?: Date;
  projectId: mongoose.Types.ObjectId; // קישור לפרויקט
  createdBy: mongoose.Types.ObjectId; // קישור למשתמש שיצר את המשימה
  assignedTo?: mongoose.Types.ObjectId[]; // רשימת משתמשים שהמשימה הוקצתה להם
  dependentTasks?: mongoose.Types.ObjectId[]; // משימות שתלויות במשימה זו
}

export interface TaskDocument extends Task, Document {}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done', 'stuck'],
    default: 'todo',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  deadline: {
    type: Date,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }],
  dependentTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tasks',
  }],
});

export default mongoose.model<TaskDocument>('tasks', taskSchema);
