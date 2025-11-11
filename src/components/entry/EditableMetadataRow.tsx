import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditableMetadataRowProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'select';
  options?: { value: string; label: string }[];
}

export const EditableMetadataRow = ({
  label,
  value,
  onChange,
  type = 'text',
  options = []
}: EditableMetadataRowProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-border/50 last:border-0 gap-2">
      <span className="text-sm font-medium text-muted-foreground min-w-[120px]">{label}</span>
      
      {type === 'select' ? (
        <Select value={value.toString()} onValueChange={onChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full sm:w-[200px]"
        />
      )}
    </div>
  );
};
