'use client';

type ViewType = 'list' | 'kanban';

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  const handleClick = (view: ViewType) => {
    onViewChange(view);
  };

  const handleKeyDown = (event: React.KeyboardEvent, view: ViewType) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onViewChange(view);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => handleClick('list')}
        onKeyDown={(e) => handleKeyDown(e, 'list')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          currentView === 'list'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label="Switch to list view"
        aria-pressed={currentView === 'list'}
        tabIndex={0}
      >
        <span className="flex items-center gap-2">
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
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          List
        </span>
      </button>
      <button
        onClick={() => handleClick('kanban')}
        onKeyDown={(e) => handleKeyDown(e, 'kanban')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          currentView === 'kanban'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label="Switch to kanban view"
        aria-pressed={currentView === 'kanban'}
        tabIndex={0}
      >
        <span className="flex items-center gap-2">
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
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
            />
          </svg>
          Kanban
        </span>
      </button>
    </div>
  );
};

export default ViewToggle;
export type { ViewType };
