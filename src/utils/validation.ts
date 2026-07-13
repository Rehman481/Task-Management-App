// src/utils/validation.ts
import type { Task } from '../types/Task';

export const validateTask = (task: Partial<Task>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!task.title || task.title.trim().length < 1) {
    errors.push('Title is required');
  }
  
  if (task.title && task.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }
  
  if (task.dueDate && new Date(task.dueDate) < new Date()) {
    errors.push('Due date cannot be in the past');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const getPriorityColor = (priority: Task['priority']): string => {
  const colors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };
  return colors[priority];
};

export const getStatusColor = (status: Task['status']): string => {
  const colors = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    done: 'bg-purple-100 text-purple-800',
  };
  return colors[status];
};