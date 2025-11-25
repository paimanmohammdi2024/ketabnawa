import Image from 'next/image';
import { cn } from '@/lib/utils';
import { autoScrollBooks as books } from '@/lib/placeholder-data';

const AutoScrollCarousel = () => {
  // We need to duplicate the books to create a seamless loop
  const extendedBooks = [...books, ...books];

  const firstRow = extendedBooks.slice(0, 20);
  const secondRow = extendedBooks.slice(0, 20).reverse(); // reverse for opposite direction visual
  
  const image = 'https://images.unsplash.com/photo-1612046312687-8e4a89885b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXJ8ZW58MHx8fHwxNzY0MDQ5MTM3fDA&ixlib=rb-4.1.0&q=80&w=400';

  const BookCover = ({ alt }: { alt: string }) => {
    return (
      <div className="group relative aspect-[2/3] w-full shrink-0 overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={alt}
          width={400}
          height={600}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="book cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
      </div>
    );
  };
  
  const Marquee = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("flex w-max items-center", className)}>
        {children}
        {children}
    </div>
  );

  return (
    <section className="relative -mt-20 md:-mt-28 section-spacing pt-0 overflow-hidden">
        <div className="relative flex flex-col gap-4 md:gap-6">
            <div className="scroll-container flex w-full">
                <Marquee className="animate-scroll-rtl gap-4 md:gap-6">
                    {firstRow.map((book, i) => (
                         <div key={`row1-${i}-${book.id}`} className="w-[180px] sm:w-[200px] md:w-[240px]">
                           <BookCover alt={book.title} />
                         </div>
                    ))}
                </Marquee>
            </div>
            <div className="scroll-container flex w-full">
                <Marquee className="animate-scroll-ltr gap-4 md:gap-6">
                    {secondRow.map((book, i) => (
                        <div key={`row2-${i}-${book.id}`} className="w-[180px] sm:w-[200px] md:w-[240px]">
                           <BookCover alt={book.title} />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    </section>
  );
};

export default AutoScrollCarousel;
