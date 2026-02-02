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
    { label: 'Total Tasks', value: totalTasks, color: 'bg-anthropic-light-gray text-anthropic-dark border-anthropic-light-gray' },
    { label: 'Completed', value: completedTasks, color: 'bg-[#788c5d]/20 text-anthropic-green border-[#788c5d]/30' },
    { label: 'In Progress', value: inProgressTasks, color: 'bg-[#6a9bcc]/20 text-anthropic-blue border-[#6a9bcc]/30' },
    { label: 'On Hold', value: onHoldTasks, color: 'bg-[#d97757]/20 text-anthropic-orange border-[#d97757]/30' },
    { label: 'Todo', value: todoTasks, color: 'bg-anthropic-light-gray text-anthropic-mid-gray border-anthropic-light-gray' },
  ];

  const allStats = [
    ...stats,
    { label: 'Completion', value: `${completionPercentage}%`, color: 'bg-anthropic-dark text-anthropic-light border-anthropic-dark' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {allStats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.color} border p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md`}
        >
          <div className="text-sm font-heading font-medium opacity-80 mb-1">{stat.label}</div>
          <div className="text-2xl font-heading font-bold">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
