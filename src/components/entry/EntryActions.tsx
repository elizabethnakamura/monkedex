import { Button } from '@/components/ui/button';
import { Edit, Trash2, Copy, Save, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface EntryActionsProps {
  isEditing: boolean;
  isUserEntry: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export const EntryActions = ({
  isEditing,
  isUserEntry,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onDuplicate
}: EntryActionsProps) => {
  if (!isUserEntry) {
    return (
      <Button onClick={onDuplicate} variant="outline" size="sm">
        <Copy className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Duplicate as User Entry</span>
        <span className="sm:hidden">Duplicate</span>
      </Button>
    );
  }

  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Button onClick={onSave} size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button onClick={onCancel} variant="outline" size="sm">
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={onEdit} variant="outline" size="sm">
        <Edit className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Edit</span>
      </Button>
      <Button onClick={onDuplicate} variant="outline" size="sm">
        <Copy className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Duplicate</span>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this entry from your collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
