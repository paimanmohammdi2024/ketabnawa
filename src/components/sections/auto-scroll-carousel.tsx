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
      <div className="group relative aspect-[2/3] w-full shrink-0 overflow-hidden rounded-xl">
        <Image
          src={image.imageUrl}
          alt={image.description}
          width={400}
          height={600}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={image.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
      </div>
    );
  };

  return (
    <section className="relative -mt-20 md:-mt-28">
        <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-4 md:gap-6">
                {firstRow.map((book, i) => (
                    <BookCover key={`row1-${i}-${book.id}`} bookId={book.coverImageId} />
                ))}
                {secondRow.map((book, i) => (
                    <BookCover key={`row2-${i}-${book.id}`} bookId={book.coverImageId} />
                ))}
            </div>
        </div>
    </section>
  );
};

export default AutoScrollCarousel;
