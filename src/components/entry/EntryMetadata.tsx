import { PrimateEntry } from '@/types/primate';
import { Badge } from '@/components/ui/badge';

interface EntryMetadataProps {
  entry: PrimateEntry;
}

const MetadataRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border/50 last:border-0">
    <span className="text-sm font-medium text-muted-foreground mb-1 sm:mb-0">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

export const EntryMetadata = ({ entry }: EntryMetadataProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{entry.name}</h1>
        {entry.isUserEntry && (
          <Badge variant="secondary" className="mb-4">
            User Entry
          </Badge>
        )}
      </div>

      <div className="bg-card border rounded-lg p-4 space-y-1">
        <MetadataRow label="Species" value={entry.species} />
        <MetadataRow label="Media Type" value={entry.mediaType} />
        <MetadataRow label="Title" value={entry.title} />
        <MetadataRow label="Year" value={entry.year} />
        <MetadataRow label="Country" value={entry.country} />
        <MetadataRow label="Format" value={entry.realOrAnimated} />
        {entry.submittedBy && (
          <MetadataRow label="Submitted By" value={entry.submittedBy} />
        )}
      </div>
    </div>
  );
};
