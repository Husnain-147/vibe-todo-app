'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types/task';

interface KanbanCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const KanbanCard = ({ task, onEdit, onDelete }: KanbanCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'ring-2 ring-gray-900' : ''
      }`}
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="text-xs text-gray-400">
            {new Date(task.updatedAt).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={(e) => handleEdit(e)}
            onKeyDown={(e) => {
              e.stopPropagation();
              handleKeyDown(e, () => handleEdit());
            }}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            aria-label={`Edit task: ${task.title}`}
            tabIndex={0}
          >
            <svg
              className="w-4 h-4"
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
            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            aria-label={`Delete task: ${task.title}`}
            tabIndex={0}
          >
            <svg
              className="w-4 h-4"
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

export default KanbanCard;
