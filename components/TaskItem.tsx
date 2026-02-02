'use client';

import { Task, TaskStatus } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onEdit, onDelete }: TaskItemProps) => {
  const handleEdit = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onEdit(task);
  };

  const handleDelete = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case 'todo':
        return 'bg-anthropic-light-gray text-anthropic-dark';
      case 'in-progress':
        return 'bg-[#6a9bcc]/20 text-anthropic-blue';
      case 'on-hold':
        return 'bg-[#d97757]/20 text-anthropic-orange';
      case 'completed':
        return 'bg-[#788c5d]/20 text-anthropic-green';
      default:
        return 'bg-anthropic-light-gray text-anthropic-dark';
    }
  };

  const getStatusLabel = (status: TaskStatus): string => {
    switch (status) {
      case 'todo':
        return 'Todo';
      case 'in-progress':
        return 'In Progress';
      case 'on-hold':
        return 'On Hold';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white border border-anthropic-light-gray rounded-lg p-4 shadow-sm hover:shadow-md hover:border-anthropic-orange transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0" onClick={handleEdit} role="button" tabIndex={0} onKeyDown={(e) => handleKeyDown(e, handleEdit)}>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-heading font-semibold text-anthropic-dark truncate">{task.title}</h3>
            <span
              className={`px-2 py-1 text-xs font-heading font-medium rounded-full whitespace-nowrap ${getStatusColor(task.status)}`}
            >
              {getStatusLabel(task.status)}
            </span>
          </div>
          {task.description && (
            <p className="text-anthropic-mid-gray text-sm mb-2 line-clamp-2 font-body">{task.description}</p>
          )}
          <div className="text-xs text-anthropic-mid-gray font-body">
            Updated: {new Date(task.updatedAt).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => handleEdit(e)}
            onKeyDown={(e) => {
              e.stopPropagation();
              handleKeyDown(e, () => handleEdit());
            }}
            className="p-2 text-anthropic-mid-gray hover:text-anthropic-dark hover:bg-anthropic-light-gray rounded transition-colors"
            aria-label={`Edit task: ${task.title}`}
            tabIndex={0}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => handleDelete(e)}
            onKeyDown={(e) => {
              e.stopPropagation();
              handleKeyDown(e, () => handleDelete());
            }}
            className="p-2 text-anthropic-mid-gray hover:text-anthropic-orange hover:bg-[#d97757]/10 rounded transition-colors"
            aria-label={`Delete task: ${task.title}`}
            tabIndex={0}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
