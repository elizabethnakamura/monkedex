import Header from "@/components/Header";
import PrimateCard from "@/components/PrimateCard";
import { getAllEntries, getUserEntries } from "@/utils/entryStorage";
import { Button } from "@/components/ui/button";
import { Shuffle, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEntryFilters } from "@/hooks/useEntryFilters";
import { FilterBar } from "@/components/filters/FilterBar";
import { exportEntriesToCsv } from "@/utils/exportToCsv";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/monkedex-logo.png";

const Index = () => {
  const navigate = useNavigate();
  const allEntries = getAllEntries();
  
  const {
    searchQuery,
    setSearchQuery,
    selectedSpecies,
    toggleSpecies,
    selectedMediaTypes,
    toggleMediaType,
    selectedTags,
    toggleTag,
    speciesWithCounts,
    mediaTypesWithCounts,
    allTags,
    filteredEntries,
    clearFilters,
    hasActiveFilters
  } = useEntryFilters(allEntries);

  const handleShuffle = () => {
    if (filteredEntries.length > 0) {
      const randomEntry = filteredEntries[Math.floor(Math.random() * filteredEntries.length)];
      navigate(`/entry/${randomEntry.id}`);
    }
  };

  const handleExport = () => {
    const userEntries = getUserEntries();
    if (userEntries.length === 0) {
      toast({
        title: "No entries to export",
        description: "You don't have any user-created entries yet.",
        variant: "destructive"
      });
      return;
    }
    exportEntriesToCsv(userEntries, 'my_monkedex_entries.csv');
    toast({
      title: "Exported successfully",
      description: `${userEntries.length} entries exported to CSV.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <img src={logo} alt="The Monkedex" className="h-12 sm:h-16 md:h-20" />
            
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleShuffle}
                variant="outline"
                size="sm"
                disabled={filteredEntries.length === 0}
              >
                <Shuffle className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Random</span>
              </Button>
              <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>

          <p className="text-muted-foreground text-sm max-w-2xl mb-6 sm:mb-8">
            A personal catalog for tracking primates across film, games, and pop culture.
          </p>

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            species={speciesWithCounts}
            selectedSpecies={selectedSpecies}
            onSpeciesToggle={toggleSpecies}
            mediaTypes={mediaTypesWithCounts}
            selectedMediaTypes={selectedMediaTypes}
            onMediaTypeToggle={toggleMediaType}
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />
        </div>

        {filteredEntries.length > 0 && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredEntries.length} of {allEntries.length} entries
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredEntries.map((entry) => (
            <PrimateCard key={entry.id} entry={entry} />
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-2">No entries found</p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline" size="sm" className="mt-4">
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
