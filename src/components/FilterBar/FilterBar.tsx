import React from 'react';
import type{ FilterType } from '../../types/Task';
import './FilterBar.css';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ currentFilter, onFilterChange }) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;