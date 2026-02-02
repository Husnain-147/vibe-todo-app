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

  return (
    <div 
      ref={setNodeRef}
      className={`flex flex-col h-full min-h-[500px] transition-colors ${
        isOver ? 'bg-anthropic-light-gray' : ''
      }`}
    >
      <div className={`mb-4 transition-colors ${isOver ? 'bg-anthropic-light-gray rounded-lg p-2' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-heading font-semibold text-anthropic-dark">
            {getStatusLabel(status)}
          </h2>
          <span
            className={`px-2 py-1 text-xs font-heading font-medium rounded-full ${getStatusColor(status)}`}
          >
            {tasks.length}
          </span>
        </div>
      </div>
      <div
        className={`flex-1 rounded-lg p-3 transition-colors ${
          isOver ? 'bg-anthropic-light-gray border-2 border-dashed border-anthropic-orange' : 'bg-anthropic-light-gray'
        }`}
      >
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-anthropic-mid-gray text-sm font-body">
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
