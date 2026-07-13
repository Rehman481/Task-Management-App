import React from 'react';
import type { Task } from '../../types/Task';
import TaskItem from '../TaskItem/TaskItem';
import { Inbox } from 'lucide-react';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <Inbox className="empty-icon" />
        <h3 className="empty-title">No tasks here</h3>
        <p className="empty-description">
          Create a new task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;