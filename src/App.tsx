import { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([...todos, {
        id: crypto.randomUUID(),
        text: inputText.trim(),
        completed: false
      }]);
      setInputText("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Todo App
        </h1>
        
        {/* Add Todo Form */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No todos yet. Add one above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? "bg-green-600 border-green-600"
                      : "border-gray-400 hover:border-green-400"
                  }`}
                >
                  {todo.completed && <Check className="h-4 w-4 text-white" />}
                </button>
                
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "text-gray-400 line-through"
                      : "text-white"
                  }`}
                >
                  {todo.text}
                </span>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-center gap-6 text-sm">
              <span className="text-gray-300">
                Total: <span className="text-white font-semibold">{todos.length}</span>
              </span>
              <span className="text-gray-300">
                Active: <span className="text-blue-400 font-semibold">{todos.filter(t => !t.completed).length}</span>
              </span>
              <span className="text-gray-300">
                Completed: <span className="text-green-400 font-semibold">{todos.filter(t => t.completed).length}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
