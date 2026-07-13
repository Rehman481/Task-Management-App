import React, { useState } from 'react';
import type{ Task, PriorityType } from '../../types/Task';
import { validateTask } from '../../utils/validation';
import { Calendar, Flag, X, Plus } from 'lucide-react';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialTask?: Partial<Task>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask = {} }) => {
  const [title, setTitle] = useState(initialTask.title || '');
  const [description, setDescription] = useState(initialTask.description || '');
  const [priority, setPriority] = useState<PriorityType>(initialTask.priority || 'medium');
  const [dueDate, setDueDate] = useState(initialTask.dueDate ? 
    new Date(initialTask.dueDate).toISOString().split('T')[0] : 
    ''
  );
  const [tags, setTags] = useState<string[]>(initialTask.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status: 'todo' as const,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags,
    };

    const { isValid, errors: validationErrors } = validateTask(taskData);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    onSubmit(taskData);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setTags([]);
    setTagInput('');
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="form-errors">
          {errors.map((error, index) => (
            <div key={index} className="error-item">{error}</div>
          ))}
        </div>
      )}

      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            <Flag className="form-icon" />
            Priority
          </label>
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as PriorityType)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            <Calendar className="form-icon" />
            Due Date
          </label>
          <input
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Tags</label>
        <div className="tags-input-container">
          <input
            type="text"
            className="form-input tags-input"
            placeholder="Add tags (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
          />
          <div className="tags-container">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => removeTag(tag)}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        <Plus size={20} />
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;