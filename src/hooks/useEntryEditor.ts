import { useState } from 'react';
import { PrimateEntry } from '@/types/primate';
import { updateUserEntry } from '@/utils/entryStorage';
import { toast } from '@/hooks/use-toast';

export const useEntryEditor = (initialEntry: PrimateEntry) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState<PrimateEntry>(initialEntry);

  const startEditing = () => {
    setEditedEntry(initialEntry);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setEditedEntry(initialEntry);
    setIsEditing(false);
  };

  const updateField = <K extends keyof PrimateEntry>(
    field: K,
    value: PrimateEntry[K]
  ) => {
    setEditedEntry(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    updateUserEntry(editedEntry.id, editedEntry);
    setIsEditing(false);
    toast({
      title: "Entry updated",
      description: "Your changes have been saved successfully.",
    });
    // Force page reload to show updated data
    window.location.reload();
  };

  return {
    isEditing,
    editedEntry,
    startEditing,
    cancelEditing,
    updateField,
    saveChanges
  };
};
