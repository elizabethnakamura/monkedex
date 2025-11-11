import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MediaTypeFilterProps {
  mediaTypes: Array<{ name: string; count: number }>;
  selectedMediaTypes: string[];
  onToggle: (mediaType: string) => void;
}

export const MediaTypeFilter = ({ mediaTypes, selectedMediaTypes, onToggle }: MediaTypeFilterProps) => {
  if (mediaTypes.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Media Type</h3>
      <div className="flex flex-wrap gap-2">
        {mediaTypes.map(({ name, count }) => {
          const isSelected = selectedMediaTypes.includes(name);
          return (
            <Button
              key={name}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onToggle(name)}
              className="text-xs sm:text-sm"
            >
              {name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
