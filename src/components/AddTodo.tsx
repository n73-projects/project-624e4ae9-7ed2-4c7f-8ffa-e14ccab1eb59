import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTodoStore } from '../store/todoStore';
import toast from 'react-hot-toast';

export function AddTodo() {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      toast.error('Please enter a todo item');
      return;
    }
    
    if (trimmedText.length > 200) {
      toast.error('Todo item is too long');
      return;
    }
    
    addTodo(trimmedText);
    setText('');
    toast.success('Todo added successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="h-12 text-base"
          maxLength={200}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-12 px-6"
        disabled={!text.trim()}
      >
        <Plus className="h-5 w-5 mr-2" />
        Add
      </Button>
    </form>
  );
}