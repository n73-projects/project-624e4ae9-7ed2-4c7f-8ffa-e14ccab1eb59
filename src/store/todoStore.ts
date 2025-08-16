import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

interface TodoStore {
  todos: Todo[];
  filter: FilterType;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  setFilter: (filter: FilterType) => void;
  clearCompleted: () => void;
  getFilteredTodos: () => Todo[];
  getStats: () => { total: number; completed: number; active: number };
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      
      addTodo: (text: string) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text: text.trim(),
          completed: false,
          createdAt: new Date(),
        };
        set((state) => ({ todos: [newTodo, ...state.todos] }));
      },
      
      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },
      
      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      
      editTodo: (id: string, text: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: text.trim() } : todo
          ),
        }));
      },
      
      setFilter: (filter: FilterType) => {
        set({ filter });
      },
      
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },
      
      getFilteredTodos: () => {
        const { todos, filter } = get();
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed);
          case 'completed':
            return todos.filter((todo) => todo.completed);
          default:
            return todos;
        }
      },
      
      getStats: () => {
        const { todos } = get();
        return {
          total: todos.length,
          completed: todos.filter((todo) => todo.completed).length,
          active: todos.filter((todo) => !todo.completed).length,
        };
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);