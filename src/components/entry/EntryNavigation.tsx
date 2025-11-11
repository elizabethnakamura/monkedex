import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EntryNavigationProps {
  previousId?: string;
  nextId?: string;
}

export const EntryNavigation = ({ previousId, nextId }: EntryNavigationProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        {previousId ? (
          <Button asChild variant="outline" size="sm">
            <Link to={`/entry/${previousId}`}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          </Button>
        ) : (
          <div />
        )}
        
        {nextId && (
          <Button asChild variant="outline" size="sm">
            <Link to={`/entry/${nextId}`}>
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        )}
      </div>
      
      <p className="text-center text-xs text-muted-foreground">
        Use arrow keys ← → to navigate
      </p>
    </div>
  );
};
