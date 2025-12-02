'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  ChevronDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  Heart,
  Share2,
  Bookmark,
  ShoppingBag,
  Sparkles,
  BookCheck,
} from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import BookCard from '@/components/book-card';
import { useLibraryStore, type LibraryItem } from '@/store/libraryStore';
import { popularAudiobooks } from '@/lib/placeholder-data';


const allAudiobooks = [...popularAudiobooks];

// --- DUMMY DATA ---
const userReviews = [
    // ... same as book page
];


// --- SUB-COMPONENTS ---

const RatingStars = ({ rating, className }: { rating: number; className?: string }) => (
  <div className={cn('flex items-center gap-1 text-amber-400', className)}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          'h-5 w-5',
          i < Math.floor(rating) ? 'fill-current' : 'fill-transparent stroke-current'
        )}
      />
    ))}
  </div>
);

const ExpandableText = ({ text, maxLength = 250 }: { text: string; maxLength?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (text.length <= maxLength) {
    return <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{text}</p>;
  }
  return (
    <div>
      <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <Button
        variant="link"
        className="mt-2 px-0 text-primary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'نمایش کمتر' : 'نمایش بیشتر'}
        <ChevronDown className={cn('mr-2 h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
      </Button>
    </div>
  );
};

const AudioPlayer = ({ src, coverImageId }: { src: string; coverImageId: string }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.75);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => setDuration(audio.duration);
        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (value: number[]) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = value[0];
        setCurrentTime(value[0]);
    };
    
    const handleVolumeChange = (value: number[]) => {
         const audio = audioRef.current;
        if (!audio) return;
        audio.volume = value[0];
        setVolume(value[0]);
    }

    const formatTime = (time: number) => {
        if (isNaN(time) || time === 0) return '۰۰:۰۰';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <Card className="glass-card p-4 md:p-6 rounded-2xl">
            <div className="flex items-center gap-4">
                <Image
                    src={`https://picsum.photos/seed/${coverImageId}/100/100`}
                    alt="Audiobook Cover"
                    width={80}
                    height={80}
                    className="rounded-lg hidden sm:block"
                />
                <div className="w-full flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <Button onClick={togglePlayPause} size="icon" className="rounded-full h-12 w-12">
                            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        </Button>
                        <div className='w-full'>
                            <p className='text-sm font-semibold'>پخش نمونه</p>
                             <div className="flex items-center gap-2 w-full text-xs text-muted-foreground">
                                <span>{formatTime(currentTime)}</span>
                                <Slider
                                    value={[currentTime]}
                                    max={duration}
                                    onValueChange={handleSeek}
                                    className="w-full"
                                />
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 justify-end">
                        <Button onClick={() => handleVolumeChange([0])} size='icon' variant='ghost' className='h-8 w-8 rounded-full'>
                            <VolumeX className="h-4 w-4" />
                        </Button>
                        <Slider
                            value={[volume]}
                            max={1}
                            step={0.01}
                            onValueChange={handleVolumeChange}
                            className="max-w-24"
                        />
                        <Button onClick={() => handleVolumeChange([1])} size='icon' variant='ghost' className='h-8 w-8 rounded-full'>
                           <Volume2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
        </Card>
    );
};

// --- MAIN AUDIOBOOK DETAILS PAGE ---

export default function AudiobookDetailsPage({ params }: { params: { id: string; slug: string } }) {
  const { items: libraryItems, addToLibrary, removeFromLibrary } = useLibraryStore();
  
  const audiobook = useMemo(() => {
    const foundBook = allAudiobooks.find(b => b.id.toString() === params.id);
    if (!foundBook) return null;
    return {
      ...foundBook,
      narrator: 'صدای ماندگار',
      rating: 4.9,
      reviewCount: 850,
      tags: ['آینده‌نگر', 'هوش مصنوعی', 'فناوری'],
      description: 'در دنیایی که مرز بین انسان و ماشین در حال محو شدن است، یک برنامه‌نویس جوان کدی را کشف می‌کند که می‌تواند آگاهی را شبیه‌سازی کند. این کشف او را به سفری خطرناک در اعماق اخلاق، هویت و معنای واقعی انسان بودن می‌برد. «ذهن دیجیتال» یک کاوش هیجان‌انگیز در آینده احتمالی بشریت است.',
      chapters: [
        { id: 1, title: 'فصل اول: بیداری کد', duration: '۲۵:۱۴' },
        { id: 2, title: 'فصل دوم: پژواک در شبکه', duration: '۳۱:۰۲' },
        { id: 3, title: 'فصل سوم: شبح در ماشین', duration: '۲۸:۴۵' },
        { id: 4, title: 'فصل چهارم: پارادوکس آگاهی', duration: '۳۵:۲۰' },
        { id: 5, title: 'فصل پنجم: دیوار آتشین اخلاق', duration: '۲۹:۵۵' },
        { id: 6, title: 'فصل ششم: فرار از سیلیس', duration: '۳۳:۱۰' },
      ],
      sampleAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    };
  }, [params.id]);

  const isInLibrary = useMemo(() => libraryItems.some(item => item.id === audiobook?.id), [libraryItems, audiobook]);

  const handleLibraryToggle = () => {
    if (!audiobook) return;

    if (isInLibrary) {
      removeFromLibrary(audiobook.id);
    } else {
      const libraryItem: LibraryItem = {
        id: audiobook.id,
        title: audiobook.title,
        author: audiobook.author,
        coverImageId: audiobook.coverImageId,
        progress: 0,
        type: 'audiobook',
        category: audiobook.category,
        duration: audiobook.duration,
      };
      addToLibrary(libraryItem);
    }
  };

  const relatedAudiobooks = useMemo(() => 
    popularAudiobooks.filter(b => b.id !== audiobook?.id).map(book => ({ 
        ...book, 
        type: 'audiobook' as const
    })),
    [audiobook]
  );
  
  if (!audiobook) {
    return (
        <div className="flex min-h-screen flex-col bg-background font-body">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <p>کتاب صوتی مورد نظر یافت نشد.</p>
            </main>
            <Footer />
        </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <Header />
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="section-spacing futuristic-gradient animate-in fade-in-0 duration-500">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
              {/* Book Cover */}
              <div className="md:col-span-1 flex justify-center items-start">
                <div className="sticky top-24">
                  <Card className="overflow-hidden rounded-2xl border-none shadow-2xl shadow-primary/10">
                    <Image
                      src={`https://picsum.photos/seed/${audiobook.coverImageId}/600/900`}
                      alt={`کاور کتاب ${audiobook.title}`}
                      width={600}
                      height={900}
                      className="aspect-[2/3] w-full max-w-sm object-cover"
                      priority
                    />
                  </Card>
                </div>
              </div>

              {/* Book Info */}
              <div className="md:col-span-2">
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{audiobook.title}</h1>
                  <div className="text-lg text-muted-foreground sm:text-xl">
                    <span>اثر </span>
                    <Link href="#" className="font-semibold text-primary hover:underline">{audiobook.author}</Link>
                    <span className="mx-2">/</span>
                    <span>گوینده: </span>
                    <Link href="#" className="font-semibold text-primary hover:underline">{audiobook.narrator}</Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <RatingStars rating={audiobook.rating} />
                    <span className="text-sm text-muted-foreground">({audiobook.reviewCount} نظر)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{audiobook.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="rounded-lg px-3 py-1">{audiobook.category}</Badge>
                    {audiobook.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="rounded-lg px-3 py-1">{tag}</Badge>
                    ))}
                  </div>
                  
                  <div className="my-6">
                    <AudioPlayer src={audiobook.sampleAudioUrl} coverImageId={audiobook.coverImageId} />
                  </div>
                  
                  <div className='flex flex-col sm:flex-row gap-3'>
                    <Button size="lg" className="w-full">
                       <ShoppingBag className="ml-2 h-5 w-5" />
                       خرید نسخه صوتی ({audiobook.price} تومان)
                    </Button>
                     <Button size="lg" variant={isInLibrary ? 'secondary' : 'outline'} className="w-full" onClick={handleLibraryToggle}>
                        {isInLibrary ? <BookCheck className="ml-2 h-5 w-5" /> : <Bookmark className="ml-2 h-5 w-5" />}
                        {isInLibrary ? 'موجود در کتابخانه' : 'افزودن به کتابخانه'}
                     </Button>
                  </div>
                   <div className="flex items-center gap-2 mt-4">
                        <Button variant="ghost">
                            <Heart className="ml-2 h-4 w-4" />
                            لیست علاقه‌مندی
                        </Button>
                        <Button variant="ghost">
                            <Share2 className="ml-2 h-4 w-4" />
                            اشتراک‌گذاری
                        </Button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 space-y-16 md:space-y-24 mb-16 md:mb-24">
            {/* --- Description & Chapters --- */}
            <section className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                    <Card className="glass-card p-6 md:p-8 rounded-2xl">
                        <CardContent className="p-0">
                           <h2 className="text-2xl font-bold mb-4">معرفی کتاب صوتی</h2>
                           <ExpandableText text={audiobook.description} />
                        </CardContent>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card className="glass-card p-6 md:p-8 rounded-2xl">
                        <CardContent className="p-0">
                           <h2 className="text-2xl font-bold mb-4">فهرست</h2>
                           <ul className="space-y-2">
                               {audiobook.chapters.map((chapter) => (
                                   <li key={chapter.id}>
                                       <Button variant='ghost' className='w-full justify-between h-auto py-3 px-2'>
                                            <div className="flex items-center gap-3 text-right">
                                               <Play className="h-5 w-5 text-primary" />
                                               <span className="font-semibold">{chapter.title}</span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">{chapter.duration}</span>
                                       </Button>
                                   </li>
                               ))}
                           </ul>
                        </CardContent>
                    </Card>
                 </div>
            </section>
            
            {/* --- Related Audiobooks --- */}
            <section>
              <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">کتاب‌های صوتی مشابه</h2>
              <Carousel opts={{ align: 'start', loop: true, direction: 'rtl' }} className="w-full">
                <CarouselContent>
                  {relatedAudiobooks.map((relatedBook) => (
                    <CarouselItem key={relatedBook.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                       <BookCard book={relatedBook} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
              </Carousel>
            </section>
        </div>
      </main>

      <Footer />
       <Button
        aria-label="پشتیبانی"
        className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 dark:support-button-glow"
      >
        <Sparkles className="h-7 w-7" />
        <span className="sr-only">سوالی دارید؟</span>
      </Button>
    </div>
  );
}
