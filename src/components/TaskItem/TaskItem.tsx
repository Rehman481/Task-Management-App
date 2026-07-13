import React, { useState } from 'react';
import type { Task } from '../../types/Task';
import { getPriorityColor, getStatusColor } from '../../utils/validation';
import { Calendar, Check, Edit2, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const handleStatusToggle = () => {
    const statusMap = {
      todo: 'in-progress',
      'in-progress': 'done',
      done: 'todo',
    };
    onUpdate(task.id, { status: statusMap[task.status] as Task['status'] });
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, {
        title: editedTitle.trim(),
        description: editedDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`task-item ${task.status}`}>
      <div className="task-item-header">
        <div className="task-item-left">
          <button
            className={`status-toggle ${task.status}`}
            onClick={handleStatusToggle}
            title="Toggle status"
          >
            {task.status === 'done' ? <Check size={16} /> : <div className="status-dot" />}
          </button>

          {isEditing ? (
            <input
              className="edit-title-input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveEdit();
                if (e.key === 'Escape') handleCancelEdit();
              }}
              autoFocus
            />
          ) : (
            <div className="task-title-wrapper">
              <h3 className={`task-title ${task.status === 'done' ? 'completed' : ''}`}>
                {task.title}
              </h3>
              {task.priority && (
                <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="task-item-actions">
          <button
            className="action-btn expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {!isEditing && (
            <>
              <button
                className="action-btn edit-btn"
                onClick={() => setIsEditing(true)}
                title="Edit task"
              >
                <Edit2 size={16} />
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => onDelete(task.id)}
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
          
          {isEditing && (
            <>
              <button
                className="action-btn save-btn"
                onClick={handleSaveEdit}
                title="Save changes"
              >
                <Check size={16} />
              </button>
              <button
                className="action-btn cancel-btn"
                onClick={handleCancelEdit}
                title="Cancel"
              >
                <X size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {(isExpanded || isEditing) && (
        <div className="task-item-details">
          {isEditing ? (
            <textarea
              className="edit-description-input"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Description"
              rows={3}
            />
          ) : (
            task.description && (
              <p className="task-description">{task.description}</p>
            )
          )}

          <div className="task-metadata">
            {task.dueDate && (
              <div className="metadata-item">
                <Calendar size={14} />
                <span>Due: {formatDate(task.dueDate)}</span>
              </div>
            )}
            <div className="metadata-item">
              <span className={`status-badge ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ')}
              </span>
            </div>
            {task.tags && task.tags.length > 0 && (
              <div className="task-tags">
                {task.tags.map((tag) => (
                  <span key={tag} className="tag-badge">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;