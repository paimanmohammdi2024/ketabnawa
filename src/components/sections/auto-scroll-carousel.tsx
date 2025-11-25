'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import React from 'react';

// Using an array to generate 14 placeholder books
const scrollingBooks = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  title: `Book Title ${i + 1}`,
}));

const Scroller = ({
  books,
  direction = 'rtl',
}: {
  books: typeof scrollingBooks;
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
      className={cn('w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]')}
    >
      <div
        className={cn(
          'scroller-inner flex min-w-full flex-nowrap gap-4',
          direction === 'ltr' ? 'animate-scroll-ltr' : 'animate-scroll-rtl'
        )}
      >
        {books.map((book, index) => (
          <div
            key={`${book.id}-${index}`}
            className="relative h-28 w-20 shrink-0 md:h-40 md:w-28"
          >
            <Image
              src={`https://picsum.photos/seed/${book.id}/300/400`}
              alt={book.title}
              fill
              className="rounded-md object-cover md:rounded-lg"
              data-ai-hint="book cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AutoScrollCarousel() {
  return (
    <section className="relative w-full max-w-7xl mx-auto mt-24 mb-16 px-4 hidden h-[260px] md:block">
      <div
        className="group relative z-10 w-full overflow-hidden"
      >
        <div className="flex flex-col gap-4">
          <div
            className="flex transform-gpu items-center gap-4 transition-transform duration-300 ease-in-out group-hover:scale-105"
            style={{ opacity: 0.95 }}
          >
            <Scroller books={scrollingBooks.slice(0, 7)} direction="rtl" />
          </div>

          <div
            className="flex transform-gpu items-center gap-4 transition-transform duration-300 ease-in-out group-hover:scale-105"
            style={{ opacity: 0.85 }}
          >
            <Scroller books={scrollingBooks.slice(7)} direction="ltr" />
          </div>
        </div>
      </div>
    </section>
  );
}
