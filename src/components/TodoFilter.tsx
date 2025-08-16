import { Button } from './ui/button';
import { useTodoStore, type FilterType } from '../store/todoStore';
import { cn } from '../lib/utils';

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export function TodoFilter() {
  const { filter, setFilter, clearCompleted, getStats } = useTodoStore();
  const stats = getStats();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
        {filters.map((filterItem) => (
          <Button
            key={filterItem.key}
            variant={filter === filterItem.key ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter(filterItem.key)}
            className={cn(
              "relative transition-all duration-200",
              filter === filterItem.key 
                ? "shadow-sm" 
                : "hover:bg-background/80"
            )}
          >
            {filterItem.label}
          </Button>
        ))}
      </div>
      
      {stats.completed > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCompleted}
          className="text-muted-foreground hover:text-destructive"
        >
          Clear completed ({stats.completed})
        </Button>
      )}
    </div>
  );
}