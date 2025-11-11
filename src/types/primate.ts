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

export const SPECIES_OPTIONS = [
  // Great Apes
  'Chimpanzee',
  'Bonobo',
  'Gorilla',
  'Orangutan',
  'Human',
  // Lesser Apes
  'Gibbon',
  'Siamang',
  // Old World Monkeys
  'Baboon',
  'Macaque',
  'Langur',
  'Colobus',
  // New World Monkeys
  'Capuchin',
  'Squirrel Monkey',
  'Howler Monkey',
  'Spider Monkey',
  'Woolly Monkey',
  'Marmoset',
  'Tamarin',
  // Prosimians
  'Lemur',
  'Loris',
  'Galago (Bushbaby)',
  'Tarsier',
  // Unknown/Ambiguous
  'Hybrid',
  'Stylized',
  'Unclear Species',
  // Cartoon/Stylized
  'Animated',
  'Mascot',
  'Toy',
  // Extinct/Prehistoric
  'Gigantopithecus',
  'Australopithecus',
  'Early Hominid',
  // Mythic/Cryptid
  'Bigfoot',
  'Yeti',
  'Sun Wukong',
  'Hanuman',
  'Other',
] as const;

export const SPECIES_CATEGORIES = {
  'Great Apes': {
    species: ['Chimpanzee', 'Bonobo', 'Gorilla', 'Orangutan', 'Human'],
    region: 'Africa / SE Asia / Global',
    description: 'Large-bodied, highly intelligent apes; frequent media representation'
  },
  'Lesser Apes': {
    species: ['Gibbon', 'Siamang'],
    region: 'SE Asia',
    description: 'Smaller apes with long arms, no tail; agile and vocal'
  },
  'Old World Monkeys': {
    species: ['Baboon', 'Macaque', 'Langur', 'Colobus'],
    region: 'Africa / Asia',
    description: 'Ground- and tree-dwelling monkeys with narrow noses; often troop-based'
  },
  'New World Monkeys': {
    species: ['Capuchin', 'Squirrel Monkey', 'Howler Monkey', 'Spider Monkey', 'Woolly Monkey', 'Marmoset', 'Tamarin'],
    region: 'Central / South America',
    description: 'Tree-dwelling monkeys with prehensile tails and expressive faces'
  },
  'Prosimians': {
    species: ['Lemur', 'Loris', 'Galago (Bushbaby)', 'Tarsier'],
    region: 'Madagascar / Africa / SE Asia',
    description: 'Small, nocturnal or early primates with large eyes and grooming claws'
  },
  'Unknown / Ambiguous': {
    species: ['Hybrid', 'Stylized', 'Unclear Species'],
    region: 'Any',
    description: 'Species not clearly identified or combining multiple primate traits'
  },
  'Cartoon / Stylized': {
    species: ['Animated', 'Mascot', 'Toy'],
    region: 'Fictional',
    description: 'Anthropomorphic or simplified designs; appears in animation, games'
  },
  'Extinct / Prehistoric': {
    species: ['Gigantopithecus', 'Australopithecus', 'Early Hominid'],
    region: 'Prehistoric',
    description: 'Fossil primates or imagined ancient species'
  },
  'Mythic / Cryptid': {
    species: ['Bigfoot', 'Yeti', 'Sun Wukong', 'Hanuman'],
    region: 'Global / Mythic realms',
    description: 'Folkloric, divine, or urban-legend primates'
  }
} as const;

export const MEDIA_TYPE_OPTIONS = [
  { value: 'film', label: 'Film' },
  { value: 'tv', label: 'TV' },
  { value: 'video-game', label: 'Video Game' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'animation', label: 'Animation' },
  { value: 'other', label: 'Other' },
] as const;

export const ROLE_OPTIONS = [
  { value: 'main', label: 'Main Character' },
  { value: 'supporting', label: 'Supporting' },
  { value: 'background', label: 'Background' },
  { value: 'mascot', label: 'Mascot' },
  { value: 'cameo', label: 'Cameo' },
] as const;
