import { PrimateEntry } from '@/types/primate';

export const exportEntriesToCsv = (entries: PrimateEntry[], filename: string = 'monkedex_entries.csv') => {
  // Define CSV headers
  const headers = [
    'Character Name',
    'Species',
    'Media Type',
    'Title',
    'Year',
    'Country',
    'Format (Real/Animated)',
    'Tags',
    'Image URL',
    'Submitted By'
  ];

  // Convert entries to CSV rows
  const rows = entries.map(entry => [
    entry.name,
    entry.species,
    entry.mediaType,
    entry.title,
    entry.year.toString(),
    entry.country,
    entry.realOrAnimated,
    (entry.tags || []).join('; '),
    entry.imageUrl,
    entry.submittedBy || ''
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
