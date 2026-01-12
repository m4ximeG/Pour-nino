
import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import { Service, BlogPost, GalleryImage } from './types';

export const SITE_NAME = "L'Herbier du Temps";
export const OWNER_NAME = "Myriam Grandemange";
export const ACTIVITY = "Herboristerie & Bien-être Naturel";

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/herbierdutemps.88150",
    icon: <Instagram className="w-5 h-5" />
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/myriam-grandemange-0704a4272",
    icon: <Linkedin className="w-5 h-5" />
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Atelier Plantes Médicinales",
    description: "Apprenez à reconnaître, cueillir et transformer les plantes sauvages de nos régions dans le respect de la biodiversité.",
    price: "45€ / session",
    image: "https://images.unsplash.com/photo-1515202913167-d9a698095ebf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Conseils en Herboristerie",
    description: "Un accompagnement personnalisé pour intégrer les bienfaits de la nature dans votre quotidien.",
    price: "60€ / consultation",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Sortie Botanique",
    description: "Immersion en pleine nature pour découvrir la flore locale et ses secrets ancestraux.",
    price: "25€ / personne",
    image: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&w=600&q=80"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Les bienfaits de l'ortie au printemps",
    excerpt: "Souvent mal-aimée, l'ortie est pourtant une véritable mine d'or pour notre organisme...",
    date: "12 Mai 2024",
    content: "L'ortie est riche en minéraux, notamment en fer et en silice. Elle aide à détoxifier l'organisme après l'hiver...",
    image: "https://images.unsplash.com/photo-1596715614119-035985097f5f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Récolter le calendula",
    excerpt: "Comment cueillir et faire sécher les fleurs de souci pour vos huiles de soin fait-maison.",
    date: "05 Juin 2024",
    content: "Le souci officinal se récolte par temps sec, idéalement en fin de matinée quand la rosée s'est évaporée...",
    image: "https://images.unsplash.com/photo-1508748303406-7bc54fd0311d?auto=format&fit=crop&w=800&q=80"
  }
];

export const GALLERY: GalleryImage[] = [
  { id: 1, url: "https://images.unsplash.com/photo-1464333527333-c24c21961427?auto=format&fit=crop&w=800&q=80", alt: "Fleurs sauvages", category: "Nature" },
  { id: 2, url: "https://images.unsplash.com/photo-1543089145-982fcd620c78?auto=format&fit=crop&w=800&q=80", alt: "Herbes séchées", category: "Atelier" },
  { id: 3, url: "https://images.unsplash.com/photo-1544787210-2824317b6294?auto=format&fit=crop&w=800&q=80", alt: "Tisane fumante", category: "Produits" },
  { id: 4, url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80", alt: "Panier de récolte", category: "Nature" },
  { id: 5, url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80", alt: "Préparation de baume", category: "Atelier" },
  { id: 6, url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", alt: "Sous-bois", category: "Nature" },
];
