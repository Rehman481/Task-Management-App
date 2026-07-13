// src/components/ThemeToggle/ThemeToggle.tsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${theme}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          {theme === 'light' ? (
            <Sun size={16} className="theme-icon" />
          ) : (
            <Moon size={16} className="theme-icon" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;