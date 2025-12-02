'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  ChevronDown,
  BookOpen,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Users,
  Building,
  Calendar,
  FileText,
  Languages,
  Tags,
  CheckCircle,
  Sparkles,
  Bookmark,
  BookCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { useLibraryStore } from '@/store/libraryStore';
import { latestEbooks, popularAudiobooks } from '@/lib/placeholder-data';
import type { LibraryItem } from '@/store/libraryStore';

const allBooks = [...latestEbooks, ...popularAudiobooks];

// --- DUMMY DATA ---
const userReviews = [
  {
    id: 1,
    name: 'سارا احمدی',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
    rating: 5,
    date: '۲ هفته پیش',
    text: 'یکی از بهترین کتاب‌هایی که در زمینه توسعه فردی خوانده‌ام. تحلیل‌های دقیق و مثال‌های کاربردی آن، واقعاً به من کمک کرد تا عادت‌هایم را بهتر بشناسم و تغییر دهم.',
  },
  {
    id: 2,
    name: 'رضا قاسمی',
    avatarUrl: 'https://picsum.photos/seed/user2/100/100',
    rating: 4,
    date: '۱ ماه پیش',
    text: 'کتاب بسیار خوبی است، اما برخی بخش‌ها کمی تکراری به نظر می‌رسید. در کل، ارزش خواندن را دارد و دیدگاه جدیدی ارائه می‌دهد.',
  },
  {
    id: 3,
    name: 'مریم حسینی',
    avatarUrl: 'https://picsum.photos/seed/user3/100/100',
    rating: 5,
    date: '۳ ماه پیش',
    text: 'فوق‌العاده! این کتاب زندگی من را تغییر داد. به همه توصیه می‌کنم آن را بخوانند.',
  },
];

const relatedBooks = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `کتاب مرتبط ${i + 1}`,
  author: `نویسنده ${i + 1}`,
  slug: `related-book-${i + 1}`,
  imageUrl: `https://picsum.photos/seed/related${i}/300/450`,
}));

// --- SUB-COMPONENTS ---

const RatingStars = ({ rating, className }: { rating: number, className?: string }) => (
  <div className={cn('flex items-center gap-1 text-amber-400', className)}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn('h-5 w-5', i < Math.floor(rating) ? 'fill-current' : 'fill-transparent stroke-current')}
      />
    ))}
  </div>
);

const ExpandableText = ({ text, maxLength = 300 }: { text: string; maxLength?: number }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

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


const BookSpecItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
  <div className="flex items-start gap-4">
    <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
    <div className="flex flex-col">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  </div>
);


// --- MAIN BOOK DETAILS PAGE ---

export default function BookDetailsPage({ params }: { params: { id: string; slug: string } }) {
  const { items: libraryItems, addToLibrary, removeFromLibrary } = useLibraryStore();
  const bookId = params.id;

  const book = useMemo(() => {
    const foundBook = allBooks.find(b => b.id.toString() === bookId);
    if (!foundBook) return null;
    return {
      ...foundBook,
      longDescription: 'در کتاب «قدرت عادت»، چارلز داهیگ، خبرنگار برنده جایزه پولیتزر، ما را به دنیای هیجان‌انگیز اکتشافات علمی می‌برد که توضیح می‌دهند چرا عادت‌ها وجود دارند و چگونه می‌توان آن‌ها را تغییر داد. با تلفیقی از تحقیقات دقیق و روایت‌های جذاب، داهیگ درک جدیدی از طبیعت انسان و پتانسیل آن برای تحول ارائه می‌دهد.\n\nاین کتاب به سه بخش تقسیم شده است: ابتدا به بررسی چگونگی شکل‌گیری عادت‌ها در زندگی افراد می‌پردازد. سپس عادت‌های سازمان‌ها و شرکت‌های موفق را تحلیل می‌کند و در نهایت، به عادت‌های جوامع و تأثیرات گسترده‌تر آن‌ها می‌پردازد. داهیGیگ با استفاده از مثال‌های واقعی از شرکت‌هایی مانند پروکتر اند گمبل، استارباکس، و تارگت، و همچنین داستان‌هایی از جنبش حقوق مدنی و زندگی مارتین لوتر کینگ جونیور، نشان می‌دهد که چگونه درک قدرت عادت‌ها می‌تواند کلید موفقیت در ورزش، کسب‌وکار و زندگی شخصی باشد.',
      publishYear: 2012,
      pages: 371,
      publisher: 'نشر نوین',
      language: 'فارسی (ترجمه)',
      rating: 4.8,
      reviewCount: 1250,
      discountPrice: 199000,
      imageUrl: `https://picsum.photos/seed/${foundBook.coverImageId}/600/900`,
      isbn: '978-600-8738-33-8',
    }
  }, [bookId]);

  const isInLibrary = useMemo(() => libraryItems.some(item => item.id === book?.id), [libraryItems, book]);

  const handleLibraryToggle = () => {
    if (!book) return;

    if (isInLibrary) {
      removeFromLibrary(book.id);
    } else {
      const libraryItem: LibraryItem = {
        id: book.id,
        title: book.title,
        author: book.author,
        coverImageId: book.coverImageId,
        progress: 0,
        type: 'ebook',
        category: book.category,
      };
      addToLibrary(libraryItem);
    }
  };
  
  if (!book) {
    return (
        <div className="flex min-h-screen flex-col bg-background font-body">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <p>کتاب مورد نظر یافت نشد.</p>
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
                      src={book.imageUrl}
                      alt={`کاور کتاب ${book.title}`}
                      width={600}
                      height={900}
                      className="aspect-[2/3] w-full max-w-sm object-cover"
                      data-ai-hint="book cover"
                      priority
                    />
                  </Card>
                </div>
              </div>

              {/* Book Info */}
              <div className="md:col-span-2">
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    {book.title}
                  </h1>
                  <div className="text-lg text-muted-foreground sm:text-xl">
                    <span>اثر </span>
                    <Link href="#" className="font-semibold text-primary hover:underline">
                      {book.author}
                    </Link>
                  </div>

                  <div className="flex items-center gap-4">
                    <RatingStars rating={book.rating} />
                    <span className="text-sm text-muted-foreground">({book.reviewCount} نظر)</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="rounded-lg px-3 py-1">{book.category}</Badge>
                    <span>سال انتشار: {book.publishYear}</span>
                  </div>
                  
                  <div className="my-6">
                      <p className="text-base leading-relaxed text-muted-foreground">{book.description}</p>
                  </div>
                  
                  {/* Price & Actions */}
                  <Card className="bg-card/70 backdrop-blur-sm border border-border/20 p-6 rounded-2xl">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                          <div>
                            <span className="text-sm text-muted-foreground line-through">
                              {parseInt(book.price.replace('$', '')).toLocaleString('fa-IR')} تومان
                            </span>
                            <div className="flex items-baseline gap-2">
                               <span className="text-3xl font-bold text-primary">
                                {book.discountPrice.toLocaleString('fa-IR')}
                               </span>
                               <span className="font-semibold text-primary">تومان</span>
                            </div>
                          </div>
                          <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-3">
                             <Button size="lg" variant="outline" className="w-full">
                                <BookOpen className="ml-2 h-5 w-5" />
                                خواندن نمونه
                             </Button>
                              <Button size="lg" className="w-full">
                                <ShoppingCart className="ml-2 h-5 w-5" />
                                خرید نسخه الکترونیک
                             </Button>
                          </div>
                      </div>
                  </Card>

                    <div className='flex flex-col sm:flex-row gap-3 mt-4'>
                        <Button size="lg" variant={isInLibrary ? 'secondary' : 'outline'} className="w-full" onClick={handleLibraryToggle}>
                           {isInLibrary ? <BookCheck className="ml-2 h-5 w-5" /> : <Bookmark className="ml-2 h-5 w-5" />}
                           {isInLibrary ? 'موجود در کتابخانه' : 'افزودن به کتابخانه'}
                        </Button>
                    </div>
                  
                   <div className="flex items-center gap-4 mt-4">
                        <Button variant="ghost">
                            <Heart className="ml-2 h-5 w-5" />
                            افزودن به علاقه‌مندی‌ها
                        </Button>
                        <Button variant="ghost">
                            <Share2 className="ml-2 h-5 w-5" />
                            اشتراک‌گذاری
                        </Button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto max-w-7xl px-4 space-y-16 md:space-y-24 mb-16 md:mb-24">
            {/* --- About Section --- */}
            <section>
              <Card className="glass-card p-6 md:p-8 rounded-2xl">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-bold">معرفی کتاب</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ExpandableText text={book.longDescription} />
                </CardContent>
              </Card>
            </section>
            
            {/* --- Specifications Section --- */}
            <section>
                 <Card className="glass-card p-6 md:p-8 rounded-2xl">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl font-bold">مشخصات</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                            <BookSpecItem icon={Users} label="نویسنده" value={book.author} />
                            <BookSpecItem icon={Building} label="ناشر" value={book.publisher} />
                            <BookSpecItem icon={Calendar} label="سال انتشار" value={book.publishYear} />
                            <BookSpecItem icon={FileText} label="تعداد صفحات" value={book.pages} />
                            <BookSpecItem icon={Languages} label="زبان" value={book.language} />
                            <BookSpecItem icon={Tags} label="دسته‌بندی" value={book.category} />
                            <BookSpecItem icon={CheckCircle} label="شابک" value={book.isbn} />
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* --- User Reviews Section --- */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight">نظرات کاربران</h2>
                <Button>
                  <Plus className="ml-2 h-5 w-5" />
                  ثبت نظر
                </Button>
              </div>
              <div className="space-y-6">
                {userReviews.map((review) => (
                  <Card key={review.id} className="glass-card p-6 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/50">
                        <AvatarImage src={review.avatarUrl} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-foreground">{review.name}</h3>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <RatingStars rating={review.rating} className="my-2" />
                        <p className="text-sm leading-relaxed text-muted-foreground">{review.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
            
            {/* --- Related Books Section --- */}
            <section>
              <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">کتاب‌های مشابه</h2>
              <Carousel opts={{ align: 'start', loop: true, direction: 'rtl' }} className="w-full">
                <CarouselContent>
                  {relatedBooks.map((relatedBook) => (
                    <CarouselItem key={relatedBook.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                       <Link href={`/book/${relatedBook.id}/${relatedBook.slug}`}>
                        <div className="p-1 group">
                           <Card className="overflow-hidden rounded-lg border-none glass-card transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/20">
                              <Image
                                src={relatedBook.imageUrl}
                                alt={relatedBook.title}
                                width={300}
                                height={450}
                                className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint="book cover"
                              />
                           </Card>
                           <h3 className="mt-2 text-sm font-semibold truncate">{relatedBook.title}</h3>
                           <p className="text-xs text-muted-foreground truncate">{relatedBook.author}</p>
                        </div>
                      </Link>
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
