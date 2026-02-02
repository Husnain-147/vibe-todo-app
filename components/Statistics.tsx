'use client';

import { Task, TaskStatus } from '@/types/task';

interface StatisticsProps {
  tasks: Task[];
}

const Statistics = ({ tasks }: StatisticsProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress').length;
  const onHoldTasks = tasks.filter((task) => task.status === 'on-hold').length;
  const todoTasks = tasks.filter((task) => task.status === 'todo').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    { label: 'Total Tasks', value: totalTasks, color: 'bg-gray-100 text-gray-900' },
    { label: 'Completed', value: completedTasks, color: 'bg-green-100 text-green-900' },
    { label: 'In Progress', value: inProgressTasks, color: 'bg-blue-100 text-blue-900' },
    { label: 'On Hold', value: onHoldTasks, color: 'bg-amber-100 text-amber-900' },
    { label: 'Todo', value: todoTasks, color: 'bg-gray-100 text-gray-700' },
  ];

  const allStats = [
    ...stats,
    { label: 'Completion', value: `${completionPercentage}%`, color: 'bg-gray-900 text-white' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {allStats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.color} p-4 rounded-lg shadow-sm transition-shadow hover:shadow-md`}
        >
          <div className="text-sm font-medium opacity-80 mb-1">{stat.label}</div>
          <div className="text-2xl font-bold">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
