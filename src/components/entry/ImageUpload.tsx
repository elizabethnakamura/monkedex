import { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string, file?: File) => void;
  showPreview?: boolean;
}

export const ImageUpload = ({ imageUrl, onImageChange, showPreview = true }: ImageUploadProps) => {
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string, file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={uploadMethod} onValueChange={(v) => setUploadMethod(v as 'url' | 'file')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url">Image URL</TabsTrigger>
          <TabsTrigger value="file">Upload File</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => onImageChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </TabsContent>
        
        <TabsContent value="file" className="space-y-2">
          <Label htmlFor="imageFile">Upload Image</Label>
          <Input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </TabsContent>
      </Tabs>

      {showPreview && imageUrl && (
        <div className="mt-4">
          <Label>Preview</Label>
          <div className="mt-2 relative w-full h-48 sm:h-64 bg-muted rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
