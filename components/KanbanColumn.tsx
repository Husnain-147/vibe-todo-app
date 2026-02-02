'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/types/task';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const KanbanColumn = ({ status, tasks, onEdit, onDelete }: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

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

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'on-hold':
        return 'bg-amber-100 text-amber-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      ref={setNodeRef}
      className={`flex flex-col h-full min-h-[500px] transition-colors ${
        isOver ? 'bg-gray-50' : ''
      }`}
    >
      <div className={`mb-4 transition-colors ${isOver ? 'bg-gray-50 rounded-lg p-2' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {getStatusLabel(status)}
          </h2>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}
          >
            {tasks.length}
          </span>
        </div>
      </div>
      <div
        className={`flex-1 rounded-lg p-3 transition-colors ${
          isOver ? 'bg-gray-50 border-2 border-dashed border-gray-300' : 'bg-gray-50'
        }`}
      >
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                <p>No tasks</p>
              </div>
            ) : (
              tasks.map((task) => (
                <KanbanCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
