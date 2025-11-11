import { Link } from 'react-router-dom';
import { PrimateEntry } from '@/types/primate';
import { Badge } from '@/components/ui/badge';

interface PrimateCardProps {
  entry: PrimateEntry;
}

const PrimateCard = ({ entry }: PrimateCardProps) => {
  return (
    <Link 
      to={`/entry/${entry.id}`}
      className="group block border border-border hover:border-primary/50 rounded-lg overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img 
          src={entry.imageUrl} 
          alt={entry.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {entry.isUserEntry && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 text-xs"
          >
            User
          </Badge>
        )}
      </div>
      <div className="p-3 space-y-1.5 bg-card">
        <h3 className="font-medium text-sm line-clamp-1">{entry.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{entry.species}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {entry.title} ({entry.year})
        </p>
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {entry.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0">
                {tag}
              </Badge>
            ))}
            {entry.tags.length > 2 && (
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                +{entry.tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default PrimateCard;
