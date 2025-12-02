
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

// --- DUMMY DATA ---
const dummyBooks = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `کتاب عنوان ${i + 1}`,
  author: `نویسنده ${i + 1}`,
  description: 'این یک توضیح کوتاه برای کتاب است که جذابیت آن را نشان می‌دهد.',
  imageUrl: `https://picsum.photos/seed/${i + 100}/400/600`,
}));

const carouselBooks = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `کتاب اسلایدر ${i + 1}`,
  author: `نویسنده ${i + 1}`,
  imageUrl: `https://picsum.photos/seed/${i + 200}/300/400`,
}));

// --- SCROLLER COMPONENT ---
const Scroller = ({
  books,
  direction = 'rtl',
}: {
  books: typeof carouselBooks;
  direction?: 'ltr' | 'rtl';
}) => {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      const scrollerInner = scroller.querySelector('.scroller-inner');
      if (scrollerInner) {
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute('aria-hidden', 'true');
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    }
  }, []);

  return (
    <div
      ref={scrollerRef}
      className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
    >
      <div
        className={cn(
          'scroller-inner flex min-w-full flex-nowrap gap-6 py-4',
          direction === 'ltr'
            ? 'animate-scroll-fast-ltr'
            : 'animate-scroll-fast-rtl'
        )}
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="w-40 shrink-0"
            data-ai-hint="book cover"
          >
            <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl">
              <Image
                src={book.imageUrl}
                alt={book.title}
                fill
                className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-2 truncate font-semibold">{book.title}</h3>
            <p className="truncate text-sm text-muted-foreground">
              {book.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BOOK CARD COMPONENT ---
const BookCard = ({ book }: { book: typeof dummyBooks[0] }) => (
  <div
    className="group relative overflow-hidden rounded-xl bg-card/50 p-3 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10"
    style={{ animation: 'fade-in-up 0.5s ease-out forwards' }}
  >
    <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-lg">
      <Image
        src={book.imageUrl}
        alt={book.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        data-ai-hint="book cover"
      />
    </div>
    <h3 className="truncate text-lg font-bold">{book.title}</h3>
    <p className="mb-2 truncate text-sm text-muted-foreground">{book.author}</p>
    <p className="mb-4 text-xs text-muted-foreground/80 line-clamp-2">
      {book.description}
    </p>
    <Button variant="outline" size="sm" className="w-full">
      جزئیات بیشتر
    </Button>
  </div>
);

// --- FLOATING SUPPORT BUTTON ---
const FloatingSupportButton = () => (
  <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
    <Button
      aria-label="پشتیبانی"
      className="h-14 w-14 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 dark:support-button-glow"
    >
      <Sparkles className="h-7 w-7" />
    </Button>
    <span className="hidden rounded-full bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-lg backdrop-blur-sm sm:block">
      سوالی دارید؟
    </span>
  </div>
);

// --- MAIN BOOKS PAGE ---
export default function BooksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden futuristic-gradient py-24 sm:py-32 text-center animate-in fade-in-0 duration-500">
          <div className="container z-10 mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              کتاب‌ها
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
              کتابخانه وسیع ما را کاوش کنید و داستان بعدی مورد علاقه خود را پیدا
              کنید.
            </p>
          </div>
        </section>

        {/* Auto-Scrolling Carousel Section */}
        <section className="group/carousel w-full py-12">
          <div className="relative">
            <Scroller books={carouselBooks.slice(0, 10)} direction="ltr" />
            <Scroller books={carouselBooks.slice(10)} direction="rtl" />
          </div>
        </section>

        {/* Books Grid Section */}
        <section className="section-spacing">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    همه کتاب‌ها
                </h2>
                <p className="mt-4 text-muted-foreground">
                    مجموعه کامل کتاب‌های الکترونیکی ما را مرور کنید.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {dummyBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingSupportButton />
    </div>
  );
}
