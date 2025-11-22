import { useState } from "react";
import { Plus, Trash2, Check, CheckCircle2, Circle, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([...todos, {
        id: crypto.randomUUID(),
        text: inputText.trim(),
        completed: false,
        createdAt: new Date()
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

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const activeCount = totalCount - completedCount;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Todo Dashboard
          </h1>
          <p className="text-muted-foreground">Stay organized and productive</p>
        </div>
        
        {/* Add Todo Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                placeholder="What needs to be done?"
                className="flex-1"
              />
              <Button onClick={addTodo} size="lg" className="px-6">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Tasks</span>
                    <span className="font-semibold">{totalCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active</span>
                    <span className="font-semibold text-primary">{activeCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <span className="font-semibold text-green-500">{completedCount}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">
                    {completionRate}% Complete
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Todo List */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Your Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {todos.length === 0 ? (
                  <div className="text-center py-12">
                    <Circle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg font-medium mb-2">No tasks yet</p>
                    <p className="text-sm text-muted-foreground">Add your first task above to get started!</p>
                  </div>
                ) : (
                  todos.map((todo, index) => (
                    <div key={todo.id}>
                      <div className={cn(
                        "group flex items-center gap-3 p-4 rounded-lg transition-all duration-200",
                        "hover:bg-accent/50",
                        todo.completed && "opacity-75"
                      )}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleTodo(todo.id)}
                          className={cn(
                            "h-6 w-6 rounded-full transition-all duration-200",
                            todo.completed 
                              ? "bg-green-500 text-white hover:bg-green-600" 
                              : "border-2 border-muted-foreground hover:border-primary hover:bg-primary/10"
                          )}
                        >
                          {todo.completed && <Check className="h-3 w-3" />}
                        </Button>
                        
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "font-medium transition-all duration-200",
                            todo.completed 
                              ? "text-muted-foreground line-through" 
                              : "text-foreground"
                          )}>
                            {todo.text}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {todo.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTodo(todo.id)}
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {index < todos.length - 1 && <Separator />}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
