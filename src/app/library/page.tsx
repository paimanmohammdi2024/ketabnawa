'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Book,
  Headphones,
  BookCheck,
  BookX,
  Search,
  ChevronDown,
  LayoutGrid,
  BookOpen,
} from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import LibraryItemCard from '@/components/library/LibraryItemCard';
import type { LibraryItem } from '@/store/libraryStore';
import { useLibraryStore } from '@/store/libraryStore';


// --- EMPTY STATE COMPONENT ---
const EmptyLibrary = () => (
  <div className="text-center flex flex-col items-center justify-center py-20 px-6 rounded-2xl bg-secondary/30 border border-dashed">
    <div className="p-6 bg-primary/10 rounded-full mb-6">
       <BookX className="h-16 w-16 text-primary" />
    </div>
    <h2 className="text-2xl font-bold mb-2">کتابخانه شما خالی است</h2>
    <p className="text-muted-foreground mb-6 max-w-sm">
      برای شروع، کتاب‌ها یا کتاب‌های صوتی مورد علاقه خود را به کتابخانه اضافه کنید تا همیشه در دسترس باشند.
    </p>
    <Button asChild>
      <a href="/books">
        <BookOpen className="ml-2 h-4 w-4" />
        رفتن به فروشگاه
      </a>
    </Button>
  </div>
);


// --- MAIN LIBRARY PAGE ---
export default function LibraryPage() {
  const { items: allItems } = useLibraryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('جدیدترین');
  const [activeTab, setActiveTab] = useState('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredItems = useMemo(() => {
    let items = allItems;
    
    // Tab filtering
    switch (activeTab) {
        case 'books':
            items = items.filter(item => item.type === 'ebook');
            break;
        case 'audiobooks':
            items = items.filter(item => item.type === 'audiobook');
            break;
        case 'reading':
            items = items.filter(item => item.progress > 0 && item.progress < 100);
            break;
        case 'finished':
             items = items.filter(item => item.progress === 100);
            break;
        default:
             break; // 'all' case
    }
    
    // Search filtering
    if (searchTerm) {
        items = items.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Sorting logic
    items.sort((a, b) => {
        switch(sortOption) {
            case 'قدیمی‌ترین':
                return a.id - b.id;
            case 'الفبا':
                return a.title.localeCompare(b.title);
            case 'بیشترین پیشرفت':
                 return b.progress - a.progress;
            case 'جدیدترین':
            default:
                return b.id - a.id;
        }
    })

    return items;
  }, [allItems, searchTerm, sortOption, activeTab]);

  const tabs = [
    { value: 'all', label: 'همه', icon: LayoutGrid },
    { value: 'books', label: 'کتاب‌ها', icon: Book },
    { value: 'audiobooks', label: 'کتاب‌های صوتی', icon: Headphones },
    { value: 'reading', label: 'در حال مطالعه', icon: BookOpen },
    { value: 'finished', label: 'تمام‌شده‌ها', icon: BookCheck },
  ];
  
  const sortOptions = ['جدیدترین', 'قدیمی‌ترین', 'الفبا', 'بیشترین پیشرفت'];

  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <Header />
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="futuristic-gradient py-12 sm:py-16 text-center animate-in fade-in-0 duration-500">
          <div className="container z-10 mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              کتابخانه من
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
              کتاب‌ها و کتاب‌های صوتی ذخیره‌شده شما در یک مکان.
            </p>
          </div>
        </section>

        {/* --- Main Content --- */}
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto p-1.5 rounded-xl bg-secondary/80">
                     {tabs.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value} className="flex gap-2 items-center text-xs sm:text-sm data-[state=active]:shadow-md data-[state=active]:bg-background rounded-lg py-2.5">
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </TabsTrigger>
                     ))}
                </TabsList>
                
                <div className="my-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="جستجو در کتابخانه..." 
                            className="pr-10 rounded-full bg-secondary border-none focus-visible:ring-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                     <div className='flex gap-2 items-center'>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="rounded-full h-10 px-5 whitespace-nowrap">
                                مرتب‌سازی: {sortOption}
                                <ChevronDown className="mr-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" dir="rtl">
                                {sortOptions.map((opt) => (
                                    <DropdownMenuItem key={opt} onClick={() => setSortOption(opt)}>{opt}</DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                </div>
                
                {isClient && (
                  <TabsContent value={activeTab} className="mt-8">
                      {filteredItems.length === 0 ? (
                          <EmptyLibrary />
                      ) : (
                          <div className={cn(
                              "grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                          )}>
                              {filteredItems.map(item => (
                                  <LibraryItemCard key={`${item.type}-${item.id}`} item={item} />
                              ))}
                          </div>
                      )}
                  </TabsContent>
                )}
            </Tabs>
        </div>

      </main>
      <Footer />
    </div>
  );
}
