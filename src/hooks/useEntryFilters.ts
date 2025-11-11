import { useState, useMemo } from 'react';
import { PrimateEntry } from '@/types/primate';

export const useEntryFilters = (allEntries: PrimateEntry[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [selectedMediaTypes, setSelectedMediaTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Calculate unique species with counts
  const speciesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allEntries.forEach(entry => {
      counts[entry.species] = (counts[entry.species] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [allEntries]);

  // Calculate unique media types with counts
  const mediaTypesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allEntries.forEach(entry => {
      counts[entry.mediaType] = (counts[entry.mediaType] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [allEntries]);

  // Calculate unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allEntries.forEach(entry => {
      entry.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [allEntries]);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return allEntries.filter(entry => {
      const matchesSearch = !searchQuery || 
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.species.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecies = selectedSpecies.length === 0 || 
        selectedSpecies.includes(entry.species);

      const matchesMediaType = selectedMediaTypes.length === 0 || 
        selectedMediaTypes.includes(entry.mediaType);

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => entry.tags?.includes(tag));

      return matchesSearch && matchesSpecies && matchesMediaType && matchesTags;
    });
  }, [allEntries, searchQuery, selectedSpecies, selectedMediaTypes, selectedTags]);

  const toggleSpecies = (species: string) => {
    setSelectedSpecies(prev =>
      prev.includes(species)
        ? prev.filter(s => s !== species)
        : [...prev, species]
    );
  };

  const toggleMediaType = (mediaType: string) => {
    setSelectedMediaTypes(prev =>
      prev.includes(mediaType)
        ? prev.filter(m => m !== mediaType)
        : [...prev, mediaType]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpecies([]);
    setSelectedMediaTypes([]);
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery !== '' || 
    selectedSpecies.length > 0 || 
    selectedMediaTypes.length > 0 || 
    selectedTags.length > 0;

  return {
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
  };
};
