import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { autoScrollBooks as books } from '@/lib/placeholder-data';

const AutoScrollCarousel = () => {
  // We need to duplicate the books to create a seamless loop
  const extendedBooks = [...books, ...books];

  const firstRow = extendedBooks.slice(0, 10);
  const secondRow = extendedBooks.slice(10, 20);

  const BookCover = ({ bookId }: { bookId: string }) => {
    const image = PlaceHolderImages.find((img) => img.id === bookId);
    if (!image) return null;

    return (
      <div className="group relative aspect-[2/3] w-32 shrink-0 overflow-hidden rounded-xl md:w-40">
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={image.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
      </div>
    );
  };
  
  const Scroller = ({
    children,
    direction = 'rtl',
    className,
  }: {
    children: React.ReactNode;
    direction?: 'rtl' | 'ltr';
    className?: string;
  }) => {
    return (
      <div className={cn('w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]', className)}>
        <div
          className={cn(
            'flex w-max min-w-full shrink-0 animate-scroll-rtl gap-4 py-4 pr-4 [animation-play-state:paused] hover:[animation-play-state:running] md:gap-6',
            direction === 'ltr' && 'animate-scroll-ltr',
          )}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <section className="relative -mt-16 hidden md:block">
      <div className="container mx-auto flex flex-col gap-4">
        <Scroller direction="rtl" className="opacity-95">
          {firstRow.map((book, i) => (
            <BookCover key={`row1-${i}-${book.id}`} bookId={book.coverImageId} />
          ))}
        </Scroller>
        <Scroller direction="ltr" className="opacity-85">
          {secondRow.map((book, i) => (
            <BookCover key={`row2-${i}-${book.id}`} bookId={book.coverImageId} />
          ))}
        </Scroller>
      </div>
    </section>
  );
};

export default AutoScrollCarousel;
