'use client';

import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '@/types/task';

interface TaskFormProps {
  task?: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const TaskForm = ({ task, isOpen, onClose, onSubmit }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
    }
    setError('');
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
    });

    setTitle('');
    setDescription('');
    setStatus('todo');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setStatus('todo');
    setError('');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#141413]/60 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <div
        className="bg-anthropic-light rounded-lg shadow-xl max-w-md w-full p-6 border border-anthropic-light-gray"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="task-form-title" className="text-xl font-heading font-semibold text-anthropic-dark">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClose();
              }
            }}
            className="text-anthropic-mid-gray hover:text-anthropic-dark transition-colors"
            aria-label="Close dialog"
            tabIndex={0}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-heading font-medium text-anthropic-dark mb-1">
              Title <span className="text-anthropic-orange">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-anthropic-orange transition-all font-body text-anthropic-dark placeholder-anthropic-mid-gray ${
                error ? 'border-anthropic-orange' : 'border-anthropic-light-gray'
              }`}
              placeholder="Enter task title"
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? 'title-error' : undefined}
            />
            {error && (
              <p id="title-error" className="mt-1 text-sm text-anthropic-orange font-body" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-heading font-medium text-anthropic-dark mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-anthropic-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-anthropic-orange transition-all resize-none font-body text-anthropic-dark placeholder-anthropic-mid-gray"
              placeholder="Enter task description (optional)"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="status" className="block text-sm font-heading font-medium text-anthropic-dark mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full px-3 py-2 border border-anthropic-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-anthropic-orange transition-all font-body text-anthropic-dark bg-white"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-anthropic-dark bg-anthropic-light-gray rounded-lg hover:bg-anthropic-mid-gray hover:text-white transition-colors font-heading font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-anthropic-dark rounded-lg hover:bg-[#141413]/90 transition-colors font-heading font-medium shadow-md"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
