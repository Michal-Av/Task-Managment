// types/User.ts

export interface User {
  _id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  location: string;
  status?: "online" | "offline";
}
