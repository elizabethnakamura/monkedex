export interface PrimateEntry {
  id: string; // Format: [charactername]_[title]_[year]
  name: string;
  species: string;
  mediaType: 'film' | 'tv' | 'video-game' | 'commercial' | 'animation' | 'other' | 'meme' | 'pop-culture' | 'fashion';
  title: string;
  year: number;
  country: string;
  realOrAnimated: 'physical' | 'animated' | 'cgi';
  submittedBy?: string;
  imageUrl: string;
  tags?: string[];
  isUserEntry?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserEntryData {
  hasSeen: boolean;
  notes: string;
}
