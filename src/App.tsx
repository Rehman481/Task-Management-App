// src/App.tsx
import React, { useState, useMemo } from 'react';
import type { Task, FilterType } from './types/Task';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import FilterBar from './components/FilterBar/FilterBar';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import { CheckCircle2, ListTodo, Sparkles } from 'lucide-react';
import './App.css';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    return filter === 'all' 
      ? tasks 
      : tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const stats = useMemo(() => ({
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  }), [tasks]);

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <ListTodo className="logo-icon" />
            <h1>TaskFlow</h1>
          </div>
          <div className="header-right">
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-value">{stats.done}</span>
                <span className="stat-label">Done</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-value">{stats.inProgress}</span>
                <span className="stat-label">In Progress</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="app-grid">
            <div className="sidebar">
              <div className="sidebar-card">
                <h2 className="sidebar-title">
                  <Sparkles className="sidebar-icon" />
                  Create Task
                </h2>
                <TaskForm onSubmit={addTask} />
              </div>
            </div>

            <div className="main-content">
              <div className="content-header">
                <h2 className="content-title">
                  <CheckCircle2 className="content-icon" />
                  Your Tasks
                </h2>
                <FilterBar currentFilter={filter} onFilterChange={setFilter} />
              </div>

              <TaskList
                tasks={filteredTasks}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;