import { PrimateEntry } from '@/types/primate';
import { sampleEntries } from '@/data/sampleEntries';

const STORAGE_KEY = 'monkedex_user_entries';

export const getUserEntries = (): PrimateEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const entries = stored ? JSON.parse(stored) : [];
    // Mark all user entries
    return entries.map((entry: PrimateEntry) => ({ ...entry, isUserEntry: true }));
  } catch (e) {
    console.error('Error loading user entries:', e);
    return [];
  }
};

export const getAllEntries = (): PrimateEntry[] => {
  return [...sampleEntries, ...getUserEntries()];
};

export const addUserEntry = (entry: PrimateEntry): void => {
  const current = getUserEntries();
  const updated = [...current, entry];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const addMultipleUserEntries = (entries: PrimateEntry[]): void => {
  const current = getUserEntries();
  const updated = [...current, ...entries];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const generateEntryId = (name: string, title: string, year: number): string => {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '');
  return `${cleanName}_${cleanTitle}_${year}`;
};

export const updateUserEntry = (entryId: string, updates: Partial<PrimateEntry>): void => {
  const current = getUserEntries();
  const index = current.findIndex(entry => entry.id === entryId);
  
  if (index !== -1) {
    const updated = current.map((entry, i) => 
      i === index 
        ? { ...entry, ...updates, updatedAt: new Date().toISOString(), isUserEntry: true }
        : entry
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};

export const deleteUserEntry = (entryId: string): void => {
  const current = getUserEntries();
  const updated = current.filter(entry => entry.id !== entryId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const isUserEntry = (entryId: string): boolean => {
  const userEntries = getUserEntries();
  return userEntries.some(entry => entry.id === entryId);
};
