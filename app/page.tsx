'use client';

import Link from 'next/link';

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-anthropic-light">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-anthropic-dark mb-6 text-balance">
            <span>Organize Your Tasks</span>
            <span className="block text-anthropic-orange mt-2">Effortlessly</span>
          </h1>
          <p className="text-xl md:text-2xl text-anthropic-mid-gray mb-8 max-w-2xl mx-auto text-balance font-body">
            A minimalistic task management application that helps you stay organized and productive.
            Track your tasks with multiple views, smart filtering, and real-time statistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tasks"
              className="px-8 py-4 bg-anthropic-dark text-anthropic-light rounded-lg hover:bg-[#141413]/90 transition-all duration-200 font-heading font-medium text-lg shadow-md hover:shadow-lg"
              aria-label="Get started with task manager"
              tabIndex={0}
            >
              Get Started
            </Link>
            <Link
              href="/tasks"
              className="px-8 py-4 bg-anthropic-light text-anthropic-dark border-2 border-anthropic-dark rounded-lg hover:bg-anthropic-light-gray transition-all duration-200 font-heading font-medium text-lg"
              aria-label="View tasks"
              tabIndex={0}
            >
              View Tasks
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-anthropic-dark text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg border border-anthropic-light-gray p-6 hover:shadow-lg transition-all duration-200 hover:border-anthropic-orange">
            <div className="w-12 h-12 bg-anthropic-orange rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold text-anthropic-dark mb-2">Task Management</h3>
            <p className="text-anthropic-mid-gray font-body">
              Create, edit, and organize your tasks with ease. Track status, add descriptions, and manage your workflow efficiently.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg border border-anthropic-light-gray p-6 hover:shadow-lg transition-all duration-200 hover:border-anthropic-blue">
            <div className="w-12 h-12 bg-anthropic-blue rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
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
            </div>
            <h3 className="text-xl font-heading font-semibold text-anthropic-dark mb-2">Kanban Board</h3>
            <p className="text-anthropic-mid-gray font-body">
              Visualize your workflow with a drag-and-drop Kanban board. Move tasks between columns seamlessly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg border border-anthropic-light-gray p-6 hover:shadow-lg transition-all duration-200 hover:border-anthropic-green">
            <div className="w-12 h-12 bg-anthropic-green rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold text-anthropic-dark mb-2">Smart Search</h3>
            <p className="text-anthropic-mid-gray font-body">
              Find tasks instantly with powerful search and filtering. Filter by status or search by title and description.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg border border-anthropic-light-gray p-6 hover:shadow-lg transition-all duration-200 hover:border-anthropic-orange">
            <div className="w-12 h-12 bg-anthropic-orange rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold text-anthropic-dark mb-2">Statistics</h3>
            <p className="text-anthropic-mid-gray font-body">
              Track your productivity with real-time statistics. Monitor task completion and progress at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-anthropic-dark rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-anthropic-light mb-4">
            Ready to Get Organized?
          </h2>
          <p className="text-xl text-anthropic-mid-gray mb-8 max-w-2xl mx-auto font-body">
            Start managing your tasks today. It's free, simple, and works entirely in your browser.
          </p>
          <Link
            href="/tasks"
            className="inline-block px-8 py-4 bg-anthropic-orange text-white rounded-lg hover:bg-[#d97757]/90 transition-all duration-200 font-heading font-medium text-lg shadow-lg"
            aria-label="Start using task manager"
            tabIndex={0}
          >
            Start Managing Tasks
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
