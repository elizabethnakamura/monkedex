import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SPECIES_OPTIONS, MEDIA_TYPE_OPTIONS } from '@/utils/constants';
import { parseCSV } from '@/utils/csvParser';
import { addUserEntry, generateEntryId } from '@/utils/entryStorage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Download } from 'lucide-react';
import { ImageUpload } from '@/components/entry/ImageUpload';
import { TagInput } from '@/components/tags/TagInput';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const Submit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    mediaType: '',
    title: '',
    year: '',
    country: '',
    realOrAnimated: '',
    sourceLink: '',
    tags: [] as string[],
  });
  
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isOptionalOpen, setIsOptionalOpen] = useState(false);

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target?.result as string;
        const entries = parseCSV(csvText);
        
        if (entries.length === 0) {
          toast.error('No valid entries found in CSV');
          return;
        }
        
        navigate('/submit/review', { state: { entries } });
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryId = generateEntryId(formData.name, formData.title, parseInt(formData.year));
    
    const newEntry = {
      id: entryId,
      name: formData.name,
      species: formData.species,
      mediaType: formData.mediaType as any,
      title: formData.title,
      year: parseInt(formData.year),
      country: formData.country,
      realOrAnimated: formData.realOrAnimated as any,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800',
      submittedBy: 'You',
      tags: formData.tags,
      isUserEntry: true,
      createdAt: new Date().toISOString(),
    };
    
    addUserEntry(newEntry);
    toast.success('Entry published to the archive!');
    
    // Reset form
    setFormData({
      name: '',
      species: '',
      mediaType: '',
      title: '',
      year: '',
      country: '',
      realOrAnimated: '',
      sourceLink: '',
      tags: [],
    });
    setImageUrl('');
    
    // Navigate to the new entry
    setTimeout(() => navigate(`/entry/${entryId}`), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Add Entry</h1>
          <p className="text-muted-foreground text-sm">
            Add a new primate appearance to your personal collection.
          </p>
        </div>

        {/* Single Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-6 border rounded-lg p-4 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="name">Character Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. King Kong"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="species">Species *</Label>
              <Select 
                required
                value={formData.species}
                onValueChange={(value) => setFormData({ ...formData, species: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIES_OPTIONS.map(species => (
                    <SelectItem key={species} value={species}>
                      {species}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mediaType">Media Type *</Label>
              <Select 
                required
                value={formData.mediaType}
                onValueChange={(value) => setFormData({ ...formData, mediaType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  {MEDIA_TYPE_OPTIONS.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title of Appearance *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. King Kong"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                min="1895"
                max={new Date().getFullYear()}
                placeholder="2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g. USA"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="realOrAnimated">Format *</Label>
            <Select 
              required
              value={formData.realOrAnimated}
              onValueChange={(value) => setFormData({ ...formData, realOrAnimated: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="animated">Animated</SelectItem>
                <SelectItem value="cgi">CGI / Digital</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Collapsible open={isOptionalOpen} onOpenChange={setIsOptionalOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between" type="button">
                Optional Fields
                <ChevronDown className={`h-4 w-4 transition-transform ${isOptionalOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-6 pt-4">
              <ImageUpload
                imageUrl={imageUrl}
                onImageChange={(url) => setImageUrl(url)}
              />

              <div className="space-y-2">
                <TagInput
                  tags={formData.tags}
                  onTagsChange={(tags) => setFormData({ ...formData, tags })}
                  placeholder="Add tags (press Enter)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sourceLink">Source Link</Label>
                <Input
                  id="sourceLink"
                  type="url"
                  value={formData.sourceLink}
                  onChange={(e) => setFormData({ ...formData, sourceLink: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="pt-4">
            <Button type="submit" className="w-full">
              Publish Entry
            </Button>
          </div>
        </form>

        <div className="my-8 text-center">
          <p className="text-sm text-muted-foreground">OR</p>
        </div>

        {/* CSV Upload Section */}
        <div className="border rounded-lg p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Bulk Upload (CSV)</h2>
            <a href="/monkedex_entry_template.csv" download>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </a>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="csv-upload">
              Upload CSV File
            </Label>
            <Input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
            />
            <p className="text-xs text-muted-foreground">
              Upload a CSV file to submit multiple entries at once. You'll be able to review before final submission.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Submit;
