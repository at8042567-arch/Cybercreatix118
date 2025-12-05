export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  image: string;
  badge?: string;
  features: string[];
  rating: number;
  reviews: number;
}

export const categories = [
  { id: "cybersecurity", name: "Cybersecurity", icon: "Shield", count: 0 },
  { id: "graphic-design", name: "Graphic Design", icon: "Palette", count: 0 },
  { id: "video-editing", name: "Video Editing", icon: "Video", count: 0 },
  { id: "ebooks", name: "eBooks", icon: "BookOpen", count: 0 },
  { id: "software", name: "Software", icon: "Code", count: 0 },
];

// Products will be fetched from database
export const products: Product[] = [];
