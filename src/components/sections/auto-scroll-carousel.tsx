'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { scrollingBooks } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const Scroller = ({
  books,
  direction = 'rtl',
  className,
}: {
  books: typeof scrollingBooks;
  direction?: 'ltr' | 'rtl';
  className?: string;
}) => {
  const extendedBooks = [...books, ...books];
  const image = PlaceHolderImages.find((img) => img.id === 'scroll-1');

  return (
    <div
      className={cn(
        'group flex min-w-full flex-nowrap',
        direction === 'ltr' && 'scroller-animation-ltr',
        direction === 'rtl' && 'scroller-animation-rtl'
      )}
      style={{ animationPlayState: 'paused' }}
    >
      {extendedBooks.map((book, index) =>
        image ? (
          <div
            key={`${book.id}-${index}`}
            className="relative h-28 w-20 shrink-0 md:h-40 md:w-28"
          >
            <Image
              src={image.imageUrl}
              alt={book.title}
              fill
              className="rounded-md object-cover md:rounded-lg"
              data-ai-hint="book cover"
            />
          </div>
        ) : null
      )}
    </div>
  );
};

export default function AutoScrollCarousel() {
  return (
    <section className="relative w-full max-w-7xl mx-auto mt-24 mb-16 px-4 hidden h-[260px] md:block">
      <div
        className="group/scroller relative z-10 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
      >
        <div className="flex flex-col gap-4">
          <div
            className="flex transform-gpu items-center gap-4 transition-transform duration-300 ease-in-out group-hover/scroller:[animation-play-state:running] hover:!scale-105"
            style={{ opacity: 0.95 }}
          >
            <Scroller books={scrollingBooks.slice(0, 7)} direction="rtl" />
          </div>

          <div
            className="flex transform-gpu items-center gap-4 transition-transform duration-300 ease-in-out group-hover/scroller:[animation-play-state:running] hover:!scale-105"
            style={{ opacity: 0.85 }}
          >
            <Scroller books={scrollingBooks.slice(7)} direction="ltr" />
          </div>
        </div>
      </div>
    </section>
  );
}
