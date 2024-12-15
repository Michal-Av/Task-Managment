import mongoose, { Document } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
  projects: mongoose.Types.ObjectId[]; // קישורים לפרויקטים
}

export interface UserDocument extends User, Document {}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects',
  }],
});

export default mongoose.model<UserDocument>('users', userSchema);
