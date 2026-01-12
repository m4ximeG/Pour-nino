
export type Section = 'accueil' | 'services' | 'galerie' | 'blog' | 'propos' | 'contact' | 'admin';

export interface Service {
  id: number;
  title: string;
  description: string;
  price?: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  image: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  category: string;
}
