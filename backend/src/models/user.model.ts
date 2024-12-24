import mongoose, { Document } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  projects: mongoose.Types.ObjectId[]; // קישורים לפרויקטים
  role: "Admin" | "Editor" | "Viewer"; // סוגי תפקידים
  location: string; // מיקום
  status?: "online" | "offline"; // סטטוס (אופציונלי)
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
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
  ],
  role: {
    type: String,
    enum: ["Admin", "Editor", "Viewer"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
});

export default mongoose.model<UserDocument>("users", userSchema);
