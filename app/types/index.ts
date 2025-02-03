export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  userId: string;
  createdAt: string;
}