import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import { TodoStats } from './TodoStats';
import { TodoFilter } from './TodoFilter';
import { CheckSquare } from 'lucide-react';

export function TodoApp() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary rounded-lg">
              <CheckSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Todo App</h1>
          </div>
          <p className="text-muted-foreground">
            Stay organized and productive with your modern todo list
          </p>
        </div>

        {/* Add Todo Form */}
        <div className="mb-6">
          <AddTodo />
        </div>

        {/* Stats */}
        <div className="mb-6">
          <TodoStats />
        </div>

        {/* Filter */}
        <div className="mb-6">
          <TodoFilter />
        </div>

        {/* Todo List */}
        <div className="bg-card border border-border rounded-lg p-4">
          <TodoList />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          Built with React, TypeScript, and Tailwind CSS
        </div>
      </div>
    </div>
  );
}