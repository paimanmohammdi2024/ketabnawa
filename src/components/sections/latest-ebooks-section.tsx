import { latestEbooks } from '@/lib/placeholder-data';
import BookCard from '@/components/book-card';

export default function LatestEbooksSection() {
  const ebooksWithTypes = latestEbooks.map(book => ({ ...book, type: 'ebook' as const }));

  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Latest E-Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {ebooksWithTypes.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
