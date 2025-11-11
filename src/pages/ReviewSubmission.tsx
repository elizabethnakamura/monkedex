import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { SPECIES_OPTIONS, MEDIA_TYPE_OPTIONS } from '@/utils/constants';
import { ParsedEntry } from '@/utils/csvParser';
import { addMultipleUserEntries } from '@/utils/entryStorage';
import { PrimateEntry } from '@/types/primate';
import { toast } from 'sonner';
import { ArrowLeft, Trash2 } from 'lucide-react';

const ReviewSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [entries, setEntries] = useState<ParsedEntry[]>([]);

  useEffect(() => {
    if (location.state?.entries) {
      setEntries(location.state.entries);
    } else {
      navigate('/submit');
    }
  }, [location, navigate]);

  const updateEntry = (index: number, updates: Partial<ParsedEntry>) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], ...updates };
    setEntries(newEntries);
  };

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateEntry(index, {
          imageFile: file,
          imagePreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newEntries: PrimateEntry[] = entries.map(entry => ({
      id: entry.id,
      name: entry.name,
      species: entry.species,
      mediaType: entry.mediaType as any,
      title: entry.title,
      year: entry.year,
      country: entry.country,
      realOrAnimated: entry.realOrAnimated as any,
      imageUrl: entry.imagePreview || 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800',
      submittedBy: entry.submittedBy || 'User',
    }));
    
    addMultipleUserEntries(newEntries);
    toast.success(`${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} published to the archive!`);
    navigate('/');
  };

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/submit')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Submit
          </Button>
          
          <h1 className="text-4xl font-mono mb-4">REVIEW ENTRIES</h1>
          <p className="text-muted-foreground text-sm">
            Review and edit your CSV entries. Add images before publishing to the archive.
          </p>
        </div>

        <div className="space-y-6">
          {entries.map((entry, index) => (
            <Card key={index} className="p-6 border-border">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-mono">Entry {index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEntry(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${index}`} className="font-mono text-sm">Character Name</Label>
                  <Input
                    id={`name-${index}`}
                    value={entry.name}
                    onChange={(e) => updateEntry(index, { name: e.target.value })}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`species-${index}`} className="font-mono text-sm">Species</Label>
                  <Select 
                    value={entry.species}
                    onValueChange={(value) => updateEntry(index, { species: value })}
                  >
                    <SelectTrigger className="font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIES_OPTIONS.map(species => (
                        <SelectItem key={species} value={species} className="font-mono">
                          {species}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`mediaType-${index}`} className="font-mono text-sm">Media Type</Label>
                  <Select 
                    value={entry.mediaType}
                    onValueChange={(value) => updateEntry(index, { mediaType: value })}
                  >
                    <SelectTrigger className="font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MEDIA_TYPE_OPTIONS.map(type => (
                        <SelectItem key={type.value} value={type.value} className="font-mono">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`} className="font-mono text-sm">Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={entry.title}
                    onChange={(e) => updateEntry(index, { title: e.target.value })}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`year-${index}`} className="font-mono text-sm">Year</Label>
                  <Input
                    id={`year-${index}`}
                    type="number"
                    value={entry.year}
                    onChange={(e) => updateEntry(index, { year: parseInt(e.target.value) })}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`country-${index}`} className="font-mono text-sm">Country</Label>
                  <Input
                    id={`country-${index}`}
                    value={entry.country}
                    onChange={(e) => updateEntry(index, { country: e.target.value })}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`format-${index}`} className="font-mono text-sm">Format</Label>
                  <Select 
                    value={entry.realOrAnimated}
                    onValueChange={(value) => updateEntry(index, { realOrAnimated: value })}
                  >
                    <SelectTrigger className="font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical" className="font-mono">Physical</SelectItem>
                      <SelectItem value="animated" className="font-mono">Animated</SelectItem>
                      <SelectItem value="cgi" className="font-mono">CGI / Digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`image-${index}`} className="font-mono text-sm">Image</Label>
                  <Input
                    id={`image-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e)}
                    className="font-mono"
                  />
                  {entry.imagePreview && (
                    <div className="mt-2 border border-border p-2">
                      <img src={entry.imagePreview} alt="Preview" className="max-h-32 object-contain" />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground font-mono">
                    ID: {entry.id}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <Button onClick={handleSubmit} className="flex-1 font-mono">
            Publish {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ReviewSubmission;
