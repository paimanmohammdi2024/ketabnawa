'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { popularAudiobooks } from '@/lib/placeholder-data';
import BookCard from '@/components/book-card';

export default function PopularAudiobooksSection() {
    const audiobooksWithTypes = popularAudiobooks.map(book => ({ ...book, type: 'audiobook' as const }));

  return (
    <section className="section-spacing">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          کتاب‌های صوتی محبوب
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {audiobooksWithTypes.map((book) => (
              <CarouselItem key={book.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-1">
                  <BookCard book={book} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}
