import { TodoItem } from './TodoItem';
import { useTodoStore } from '../store/todoStore';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

export function TodoList() {
  const filteredTodos = useTodoStore((state) => state.getFilteredTodos());
  const filter = useTodoStore((state) => state.filter);
  
  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
          {filter === 'completed' ? (
            <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
          ) : filter === 'active' ? (
            <Circle className="h-8 w-8 text-muted-foreground" />
          ) : (
            <ListTodo className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          {filter === 'completed' 
            ? 'No completed todos'
            : filter === 'active'
            ? 'No active todos'
            : 'No todos yet'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {filter === 'all' 
            ? 'Add your first todo above to get started!'
            : `Switch to "All" to see your ${filter === 'completed' ? 'active' : 'completed'} todos.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}