import { SearchInput } from './SearchInput';
import { SpeciesFilter } from './SpeciesFilter';
import { MediaTypeFilter } from './MediaTypeFilter';
import { TagFilter } from '../tags/TagFilter';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  species: Array<{ name: string; count: number }>;
  selectedSpecies: string[];
  onSpeciesToggle: (species: string) => void;
  mediaTypes: Array<{ name: string; count: number }>;
  selectedMediaTypes: string[];
  onMediaTypeToggle: (mediaType: string) => void;
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  species,
  selectedSpecies,
  onSpeciesToggle,
  mediaTypes,
  selectedMediaTypes,
  onMediaTypeToggle,
  tags,
  selectedTags,
  onTagToggle,
  hasActiveFilters,
  onClearFilters
}: FilterBarProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search by name, title, or species..."
        />
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="whitespace-nowrap"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <SpeciesFilter
          species={species}
          selectedSpecies={selectedSpecies}
          onToggle={onSpeciesToggle}
        />
        
        <MediaTypeFilter
          mediaTypes={mediaTypes}
          selectedMediaTypes={selectedMediaTypes}
          onToggle={onMediaTypeToggle}
        />
        
        <TagFilter
          availableTags={tags}
          selectedTags={selectedTags}
          onTagToggle={onTagToggle}
        />
      </div>
    </div>
  );
};
