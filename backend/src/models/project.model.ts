import mongoose, { Document } from 'mongoose';

export interface Project {
  name: string;
  description?: string;
  owner: mongoose.Types.ObjectId; // קישור למשתמש שיצר את הפרויקט
  tasks: mongoose.Types.ObjectId[]; // רשימת משימות בפרויקט
  sharedWith: mongoose.Types.ObjectId[]; // משתמשים ששותפים בפרויקט
}

export interface ProjectDocument extends Project, Document {}

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tasks',
  }],
  sharedWith: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }],
});

export default mongoose.model<ProjectDocument>('projects', projectSchema);
