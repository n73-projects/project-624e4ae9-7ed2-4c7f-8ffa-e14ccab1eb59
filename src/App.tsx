import { TodoApp } from "./components/TodoApp";

function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-white">Debug Test</h1>
        <div className="bg-zinc-800 p-4 rounded-lg mb-4">
          <p className="text-white">¿Puedes ver este texto blanco sobre fondo oscuro?</p>
        </div>
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
