import { useState } from 'react';
import { Check, X, Edit2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { useTodoStore, type Todo } from '../store/todoStore';
import { cn } from '../lib/utils';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { toggleTodo, deleteTodo, editTodo } = useTodoStore();

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      editTodo(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className={cn(
      "group flex items-center gap-3 p-4 rounded-lg border transition-all duration-200",
      "bg-card hover:bg-accent/50 border-border",
      todo.completed && "opacity-60"
    )}>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleEdit}
              className="flex-1"
              autoFocus
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEdit}
              className="flex-shrink-0"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setEditText(todo.text);
                setIsEditing(false);
              }}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <p className={cn(
            "text-sm font-medium break-words",
            todo.completed && "line-through text-muted-foreground"
          )}>
            {todo.text}
          </p>
        )}
      </div>
      
      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => deleteTodo(todo.id)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}