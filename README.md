# Task Manager App

A minimalistic SaaS-style task management application built with Next.js, TypeScript, and Tailwind CSS.

🌐 **Live Demo**: [https://todo-app-anthropic.surge.sh](https://todo-app-anthropic.surge.sh)

## Features

- ✅ Create, read, update, and delete tasks
- 📊 Filter tasks by status (Todo, In Progress, On Hold, Completed)
- 🔍 Search tasks by title or description
- 📈 Statistics dashboard with task counts and completion percentage
- 💾 Local storage persistence
- 🎨 Minimalistic and modern UI design
- ♿ Fully accessible with keyboard navigation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Local Storage** - Client-side data persistence

## Project Structure

```
todo-app/
├── app/              # Next.js app directory
├── components/       # React components
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Usage

1. **Create a Task**: Click the "New Task" button and fill in the form
2. **Edit a Task**: Click on a task card or use the edit button
3. **Delete a Task**: Click the delete button and confirm
4. **Filter Tasks**: Use the status filter buttons to view specific task statuses
5. **Search Tasks**: Use the search bar to find tasks by title or description
6. **View Statistics**: Check the statistics cards at the top for task overview

## Task Statuses

- **Todo**: New tasks that haven't been started
- **In Progress**: Tasks currently being worked on
- **On Hold**: Tasks temporarily paused
- **Completed**: Finished tasks

## License

MIT
