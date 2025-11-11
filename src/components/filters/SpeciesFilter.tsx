import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SpeciesFilterProps {
  species: Array<{ name: string; count: number }>;
  selectedSpecies: string[];
  onToggle: (species: string) => void;
}

export const SpeciesFilter = ({ species, selectedSpecies, onToggle }: SpeciesFilterProps) => {
  if (species.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Species</h3>
      <div className="flex flex-wrap gap-2">
        {species.map(({ name, count }) => {
          const isSelected = selectedSpecies.includes(name);
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
