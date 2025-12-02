
import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

interface BookCardProps {
  book: Book & { type: 'ebook' | 'audiobook' };
  className?: string;
}

const slugify = (text: string) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\u0600-\u06FF\w\-]+/g, '') // Remove all non-word chars except Farsi
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export default function BookCard({ book, className }: BookCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === book.coverImageId);
  const slug = slugify(book.title);

  return (
    <Link href={`/book/${book.id}/${slug}`}>
      <Card className={cn("overflow-hidden rounded-lg group border-none glass-card transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] h-full", className)}>
        <CardContent className="p-0 h-full flex flex-col">
          <div className="relative">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={`Cover of ${book.title}`}
                width={300}
                height={450}
                className="w-full h-auto object-cover aspect-[2/3] transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
              />
            ) : (
                 <div className="aspect-[2/3] w-full bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">No Image</span>
                 </div>
            )}
            {book.type === 'audiobook' && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="h-16 w-16 text-white/80" />
              </div>
            )}
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-lg truncate text-foreground">{book.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{book.author}</p>
            <div className="mt-4 flex justify-between items-center flex-grow items-end">
              <span className="font-bold text-primary">{book.price}</span>
              {book.type === 'ebook' && <Button variant="ghost" size="sm">جزئیات</Button>}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
