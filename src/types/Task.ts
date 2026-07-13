// src/types/Task.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags?: string[];
}

export type FilterType = 'all' | 'todo' | 'in-progress' | 'done';
export type PriorityType = 'low' | 'medium' | 'high';