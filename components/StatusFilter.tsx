'use client';

import { TaskStatus } from '@/types/task';

interface StatusFilterProps {
  activeFilter: TaskStatus | 'all';
  onFilterChange: (filter: TaskStatus | 'all') => void;
}

const StatusFilter = ({ activeFilter, onFilterChange }: StatusFilterProps) => {
  const filters: Array<{ label: string; value: TaskStatus | 'all' }> = [
    { label: 'All', value: 'all' },
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'On Hold', value: 'on-hold' },
    { label: 'Completed', value: 'completed' },
  ];

  const handleClick = (filter: TaskStatus | 'all') => {
    onFilterChange(filter);
  };

  const handleKeyDown = (event: React.KeyboardEvent, filter: TaskStatus | 'all') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onFilterChange(filter);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleClick(filter.value)}
          onKeyDown={(e) => handleKeyDown(e, filter.value)}
          className={`px-4 py-2 rounded-full text-sm font-heading font-medium transition-all duration-200 ${
            activeFilter === filter.value
              ? 'bg-anthropic-dark text-anthropic-light shadow-md'
              : 'bg-anthropic-light-gray text-anthropic-dark hover:bg-anthropic-mid-gray hover:text-white'
          }`}
          aria-label={`Filter by ${filter.label}`}
          aria-pressed={activeFilter === filter.value}
          tabIndex={0}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
