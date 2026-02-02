'use client';

import { useState, useMemo } from 'react';
import { Task, TaskStatus } from '@/types/task';
import useLocalStorage from '@/hooks/useLocalStorage';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import StatusFilter from '@/components/StatusFilter';
import SearchBar from '@/components/SearchBar';
import Statistics from '@/components/Statistics';
import ViewToggle, { ViewType } from '@/components/ViewToggle';
import KanbanBoard from '@/components/KanbanBoard';
import Link from 'next/link';

export default function TasksPage() {
  const [tasks, setTasks, isHydrated] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [view, setView] = useState<ViewType>('list');

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter !== 'all') {
      result = result.filter((task) => task.status === filter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)
      );
    }

    return result.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [tasks, filter, searchQuery]);

  const kanbanTasks = useMemo(() => {
    let result = tasks;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)
      );
    }

    return result.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [tasks, searchQuery]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...taskData,
                updatedAt: new Date().toISOString(),
              }
            : task
        )
      );
    } else {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 mb-2 inline-block text-sm font-medium"
              aria-label="Back to home"
              tabIndex={0}
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Manager</h1>
            <p className="text-gray-600">Organize and track your tasks efficiently</p>
          </div>
        </div>

        <Statistics tasks={tasks} />

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="flex-1 w-full md:w-auto">
              <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            </div>
            <div className="flex items-center gap-4">
              <ViewToggle currentView={view} onViewChange={setView} />
              <button
                onClick={handleCreateTask}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium whitespace-nowrap"
                aria-label="Create new task"
                tabIndex={0}
              >
                + New Task
              </button>
            </div>
          </div>

          {view === 'list' && (
            <StatusFilter activeFilter={filter} onFilterChange={setFilter} />
          )}
        </div>

        {view === 'list' ? (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ) : (
          <KanbanBoard
            tasks={kanbanTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      <TaskForm
        task={editingTask}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitTask}
      />
    </main>
  );
}
