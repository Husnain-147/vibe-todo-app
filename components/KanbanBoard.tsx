'use client';

import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Task, TaskStatus } from '@/types/task';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import { useState } from 'react';

interface KanbanBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

const KanbanBoard = ({ tasks, onEdit, onDelete, onStatusChange }: KanbanBoardProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<TaskStatus | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const statuses: TaskStatus[] = ['todo', 'in-progress', 'on-hold', 'completed'];

  const tasksByStatus = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) {
      setOverColumnId(null);
      return;
    }

    const overId = over.id as string;
    
    // Check if over is a column status
    if (statuses.includes(overId as TaskStatus)) {
      setOverColumnId(overId as TaskStatus);
      return;
    }

    // If over is a card, find which column it belongs to
    const overTask = tasks.find((t) => t.id === overId);
    if (overTask) {
      setOverColumnId(overTask.status);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    const taskId = active.id as string;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      setOverColumnId(null);
      return;
    }

    let newStatus: TaskStatus | null = null;

    if (over) {
      const overId = over.id as string;
      
      // Check if over is a column status
      if (statuses.includes(overId as TaskStatus)) {
        newStatus = overId as TaskStatus;
      } else {
        // If over is a card, find which column it belongs to
        const overTask = tasks.find((t) => t.id === overId);
        if (overTask) {
          newStatus = overTask.status;
        }
      }
    }

    // Fallback to the last known column if over is null but we have a tracked column
    if (!newStatus && overColumnId) {
      newStatus = overColumnId;
    }

    // Only update if we have a valid new status and it's different from current
    if (newStatus && task.status !== newStatus) {
      onStatusChange(taskId, newStatus);
    }

    setOverColumnId(null);
  };

  const activeTask = activeId ? tasks.find((task) => task.id === activeId) : null;

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart} 
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status]}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="opacity-90 rotate-3">
            <KanbanCard task={activeTask} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
