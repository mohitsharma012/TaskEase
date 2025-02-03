export interface User {
  _id: string;
  email: string;
  password: string;
}

export interface Task {
  _id: string;
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  userId: string;
  createdAt: string;
}