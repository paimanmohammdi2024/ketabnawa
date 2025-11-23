import type { LucideIcon } from 'lucide-react';
import { Heart, BookOpen, BrainCircuit, Briefcase, GraduationCap, Dices } from 'lucide-react';

export type Book = {
  id: number;
  title: string;
  author: string;
  price: string;
  coverImageId: string;
};

export type Category = {
  name: string;
  icon: LucideIcon;
};

export const popularAudiobooks: Book[] = [
  { id: 1, title: 'The Digital Mind', author: 'Arvin Ash', price: '$19.99', coverImageId: 'audiobook-1' },
  { id: 2, title: 'Quantum Echoes', author: 'Eva Rostova', price: '$24.99', coverImageId: 'audiobook-2' },
  { id: 3, title: 'Cyberia', author: 'Kenji Tanaka', price: '$14.99', coverImageId: 'audiobook-3' },
  { id: 4, title: 'Zero Point', author: 'Lila Chen', price: '$29.99', coverImageId: 'audiobook-4' },
  { id: 5, title: 'Synthetic Dreams', author: 'Marcus Vance', price: '$22.50', coverImageId: 'audiobook-5' },
];

export const latestEbooks: Book[] = [
  { id: 1, title: 'Chronos Rift', author: 'Julian Verse', price: '$9.99', coverImageId: 'ebook-1' },
  { id: 2, title: 'Neon City', author: 'Alex Drake', price: '$12.99', coverImageId: 'ebook-2' },
  { id: 3, title: 'The Last Question', author: 'Isaac Asimov', price: '$7.99', coverImageId: 'ebook-3' },
  { id: 4, title: 'Project Hail Mary', author: 'Andy Weir', price: '$15.00', coverImageId: 'ebook-4' },
  { id: 5, title: 'Forest of Secrets', author: 'Elara Vance', price: '$8.50', coverImageId: 'ebook-5' },
  { id: 6, title: 'The Silent Patient', author: 'Alex Michaelides', price: '$11.25', coverImageId: 'ebook-6' },
  { id: 7, title: 'Starlight Overdrive', author: 'Zane Harris', price: '$10.99', coverImageId: 'ebook-7' },
  { id: 8, title: 'The Growth Mindset', author: 'Carol Dweck', price: '$14.50', coverImageId: 'ebook-8' },
];

export const categories: Category[] = [
  { name: 'Self-Help', icon: Heart },
  { name: 'Literature', icon: BookOpen },
  { name: 'Psychology', icon: BrainCircuit },
  { name: 'Romance', icon: Heart },
  { name: 'Business', icon: Briefcase },
  { name: 'Education', icon: GraduationCap },
];
