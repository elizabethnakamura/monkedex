import { Badge } from '@/components/ui/badge';
import { TagInput } from './TagInput';

interface TagManagerProps {
  tags: string[];
  onTagsChange?: (tags: string[]) => void;
  editable?: boolean;
}

export const TagManager = ({ tags, onTagsChange, editable = false }: TagManagerProps) => {
  if (editable && onTagsChange) {
    return (
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          Tags
        </label>
        <TagInput tags={tags} onTagsChange={onTagsChange} />
      </div>
    );
  }

  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Badge key={tag} variant="outline">
          {tag}
        </Badge>
      ))}
    </div>
  );
};
