'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type LibraryItem = {
    id: number;
    title: string;
    author: string;
    coverImageId: string;
    progress: number; 
    type: 'ebook' | 'audiobook';
    category: string;
    duration?: string;
};

interface LibraryState {
  items: LibraryItem[];
  addToLibrary: (item: LibraryItem) => void;
  removeFromLibrary: (itemId: number) => void;
  isInLibrary: (itemId: number) => boolean;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      items: [],
      addToLibrary: (item) => set((state) => ({ items: [...state.items, item] })),
      removeFromLibrary: (itemId) => set((state) => ({ items: state.items.filter(item => item.id !== itemId) })),
      isInLibrary: (itemId) => get().items.some(item => item.id === itemId),
    }),
    {
      name: 'booknova-library-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
