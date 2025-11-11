import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { getAllEntries, deleteUserEntry, addUserEntry, generateEntryId } from '@/utils/entryStorage';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { useUserEntryData } from '@/hooks/useUserEntryData';
import { useEntryEditor } from '@/hooks/useEntryEditor';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { EntryMetadata } from '@/components/entry/EntryMetadata';
import { EntryActions } from '@/components/entry/EntryActions';
import { EntryNavigation } from '@/components/entry/EntryNavigation';
import { EditableMetadataRow } from '@/components/entry/EditableMetadataRow';
import { TagManager } from '@/components/tags/TagManager';
import { ImageUpload } from '@/components/entry/ImageUpload';
import { SPECIES_OPTIONS, MEDIA_TYPE_OPTIONS } from '@/utils/constants';
import { toast } from '@/hooks/use-toast';

const EntryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allEntries = getAllEntries();
  const entry = allEntries.find(e => e.id === id);
  const { data, updateData } = useUserEntryData(id || '');
  const { isEditing, editedEntry, startEditing, cancelEditing, updateField, saveChanges } = 
    useEntryEditor(entry || {} as any);

  const currentIndex = allEntries.findIndex(e => e.id === id);
  const previousEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const nextEntry = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

  // Enable keyboard navigation (arrow keys) when not editing
  useKeyboardNavigation({
    previousId: previousEntry?.id,
    nextId: nextEntry?.id,
    enabled: !isEditing
  });

  if (!entry) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-muted-foreground">Entry not found</p>
          <Link to="/">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Index
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const handleDelete = () => {
    deleteUserEntry(entry.id);
    toast({
      title: "Entry deleted",
      description: "The entry has been removed from your collection.",
    });
    navigate('/');
  };

  const handleDuplicate = () => {
    const newEntry = {
      ...entry,
      id: generateEntryId(entry.name, entry.title, entry.year) + '_copy_' + Date.now(),
      isUserEntry: true,
      createdAt: new Date().toISOString(),
      submittedBy: 'You (duplicated)'
    };
    addUserEntry(newEntry);
    toast({
      title: "Entry duplicated",
      description: "A copy has been created in your collection.",
    });
    navigate(`/entry/${newEntry.id}`);
  };

  const speciesOptions = SPECIES_OPTIONS.map(s => ({ value: s, label: s }));
  const mediaTypeOptions = MEDIA_TYPE_OPTIONS.map(m => ({ value: m.value, label: m.label }));
  const formatOptions = [
    { value: 'physical', label: 'Physical' },
    { value: 'animated', label: 'Animated' },
    { value: 'cgi', label: 'CGI' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Index
            </Button>
          </Link>

          <EntryActions
            isEditing={isEditing}
            isUserEntry={entry.isUserEntry || false}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div>
            {isEditing ? (
              <ImageUpload
                imageUrl={editedEntry.imageUrl}
                onImageChange={(url) => updateField('imageUrl', url)}
              />
            ) : (
              <div className="aspect-square bg-muted border rounded-lg overflow-hidden">
                <img 
                  src={entry.imageUrl} 
                  alt={entry.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Metadata Section */}
          <div className="space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Character Name</Label>
                  <input
                    id="name"
                    type="text"
                    value={editedEntry.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full mt-2 px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                <div className="bg-card border rounded-lg p-4 space-y-3">
                  <EditableMetadataRow
                    label="Species"
                    value={editedEntry.species}
                    onChange={(v) => updateField('species', v)}
                    type="select"
                    options={speciesOptions}
                  />
                  <EditableMetadataRow
                    label="Media Type"
                    value={editedEntry.mediaType}
                    onChange={(v) => updateField('mediaType', v as any)}
                    type="select"
                    options={mediaTypeOptions}
                  />
                  <EditableMetadataRow
                    label="Title"
                    value={editedEntry.title}
                    onChange={(v) => updateField('title', v)}
                  />
                  <EditableMetadataRow
                    label="Year"
                    value={editedEntry.year}
                    onChange={(v) => updateField('year', parseInt(v) || 0)}
                    type="number"
                  />
                  <EditableMetadataRow
                    label="Country"
                    value={editedEntry.country}
                    onChange={(v) => updateField('country', v)}
                  />
                  <EditableMetadataRow
                    label="Format"
                    value={editedEntry.realOrAnimated}
                    onChange={(v) => updateField('realOrAnimated', v as any)}
                    type="select"
                    options={formatOptions}
                  />
                </div>

                <TagManager
                  tags={editedEntry.tags || []}
                  onTagsChange={(tags) => updateField('tags', tags)}
                  editable
                />
              </div>
            ) : (
              <>
                <EntryMetadata entry={entry} />
                
                {entry.tags && entry.tags.length > 0 && (
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Tags</h3>
                    <TagManager tags={entry.tags} />
                  </div>
                )}
              </>
            )}

            {/* User Notes Section */}
            {!isEditing && (
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasSeen" 
                    checked={data.hasSeen}
                    onCheckedChange={(checked) => updateData({ hasSeen: checked as boolean })}
                  />
                  <Label htmlFor="hasSeen" className="text-sm cursor-pointer">
                    I've seen this
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm">
                    Personal Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => updateData({ notes: e.target.value })}
                    placeholder="Add your thoughts about this entry..."
                    className="min-h-[100px] text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <EntryNavigation 
          previousId={previousEntry?.id} 
          nextId={nextEntry?.id}
        />
      </main>
    </div>
  );
};

export default EntryDetail;
