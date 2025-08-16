import { Badge } from './ui/badge';
import { useTodoStore } from '../store/todoStore';
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

export function TodoStats() {
  const stats = useTodoStore((state) => state.getStats());
  
  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center gap-2">
        <ListTodo className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Total</span>
        <Badge variant="secondary">{stats.total}</Badge>
      </div>
      
      <div className="w-px h-6 bg-border" />
      
      <div className="flex items-center gap-2">
        <Circle className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium">Active</span>
        <Badge variant="outline" className="border-blue-500 text-blue-500">
          {stats.active}
        </Badge>
      </div>
      
      <div className="w-px h-6 bg-border" />
      
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <span className="text-sm font-medium">Completed</span>
        <Badge variant="outline" className="border-green-500 text-green-500">
          {stats.completed}
        </Badge>
      </div>
      
      {stats.total > 0 && (
        <>
          <div className="w-px h-6 bg-border" />
          <div className="text-sm text-muted-foreground">
            {Math.round((stats.completed / stats.total) * 100)}% complete
          </div>
        </>
      )}
    </div>
  );
}