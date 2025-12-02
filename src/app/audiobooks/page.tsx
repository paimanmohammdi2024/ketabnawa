'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ListFilter,
  Search,
} from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BookCard from '@/components/book-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { popularAudiobooks } from '@/lib/placeholder-data';
import type { Book } from '@/lib/placeholder-data';

// --- DUMMY DATA ---
const filters = ['همه', 'جدیدترین', 'پرفروش‌ترین', 'رایگان'];
const categories = ['داستانی', 'غیرداستانی', 'کودک و نوجوان', 'کسب و کار', 'شعر'];
const allAudiobooks: (Book & { duration: string; type: 'audiobook' })[] = Array.from(
  { length: 12 },
  (_, i) => ({
    id: 100 + i,
    title: `کتاب صوتی ${i + 1}`,
    author: `گوینده ${i + 1}`,
    price: i % 3 === 0 ? 'رایگان' : `${((i + 1) * 5.5).toFixed(2)}$`,
    coverImageId: `audiobook-${(i % 10) + 1}`,
    duration: `${Math.floor(i/2) + 2} ساعت و ${i * 15 % 60} دقیقه`,
    type: 'audiobook',
  })
);


// --- FILTER CHIP COMPONENT ---
const FilterChip = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <Button
    variant={isActive ? 'default' : 'outline'}
    className={cn(
      'rounded-full h-9 px-5 whitespace-nowrap transition-all duration-200',
      isActive
        ? 'shadow-md shadow-primary/30'
        : 'bg-background hover:bg-accent/80'
    )}
    onClick={onClick}
  >
    {label}
  </Button>
);

// --- MAIN AUDIOBOOKS PAGE ---
export default function AudiobooksPage() {
  const [activeFilter, setActiveFilter] = React.useState('همه');
  const audiobooksWithTypes = popularAudiobooks.map(book => ({ ...book, type: 'audiobook' as const, duration: `${Math.floor(Math.random() * 8) + 2} ساعت و ${Math.floor(Math.random() * 59)} دقیقه` }));

  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <Header />
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="futuristic-gradient py-12 sm:py-16 text-center animate-in fade-in-0 duration-500">
          <div className="container z-10 mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              کتاب‌های صوتی
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
              هزاران کتاب صوتی برای گوش دادن در هر زمان و هر مکان.
            </p>
          </div>
        </section>

        {/* --- Filter & Search Bar --- */}
        <section className="sticky top-16 z-40 bg-background/90 backdrop-blur-lg py-4 border-b">
            <div className="container mx-auto max-w-7xl px-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="w-full flex-1 flex items-center gap-2 overflow-x-auto scroll-container pr-2">
                     {filters.map((filter) => (
                        <FilterChip
                        key={filter}
                        label={filter}
                        isActive={activeFilter === filter}
                        onClick={() => setActiveFilter(filter)}
                        />
                    ))}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="rounded-full h-9 px-5 whitespace-nowrap">
                            دسته‌بندی‌ها
                            <ChevronDown className="mr-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" dir="rtl">
                            {categories.map((cat) => (
                                <DropdownMenuItem key={cat}>{cat}</DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                 <div className="relative w-full sm:w-auto sm:max-w-xs hidden md:block">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="جستجوی کتاب صوتی..." className="pr-10 rounded-full bg-secondary border-none focus-visible:ring-primary" />
                </div>
            </div>
        </section>
        
        {/* --- Featured Audiobooks Section --- */}
        <section className="section-spacing">
            <div className="container mx-auto max-w-7xl px-4">
                <h2 className="text-2xl font-bold tracking-tight mb-8">ویژه‌ها</h2>
                 <Carousel opts={{ align: 'start', loop: true, direction: 'rtl' }} className="w-full">
                    <CarouselContent>
                        {audiobooksWithTypes.slice(0, 8).map((book) => (
                        <CarouselItem key={book.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                             <BookCard book={{...book, duration: `${Math.floor(Math.random() * 8) + 2} ساعت`}} />
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden lg:flex" />
                    <CarouselNext className="hidden lg:flex" />
                </Carousel>
            </div>
        </section>
        
        <Separator className="my-8 container max-w-7xl" />

        {/* --- All Audiobooks Grid Section --- */}
        <section className="section-spacing pt-0">
          <div className="container mx-auto max-w-7xl px-4">
             <div className="mb-12 text-right">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    همه کتاب‌های صوتی
                </h2>
                <p className="mt-4 text-muted-foreground">
                    مجموعه کامل کتاب‌های صوتی ما را مرور کنید.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
              {allAudiobooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}