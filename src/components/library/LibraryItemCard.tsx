'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Headphones, MoreVertical, Trash2 } from 'lucide-react';
import type { LibraryItem } from '@/store/libraryStore';
import { useLibraryStore } from '@/store/libraryStore';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LibraryItemCardProps {
  item: LibraryItem;
  className?: string;
}

const slugify = (text: string): string => {
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

export default function LibraryItemCard({ item, className }: LibraryItemCardProps) {
  const { removeFromLibrary } = useLibraryStore();
  const image = PlaceHolderImages.find((img) => img.id === item.coverImageId);
  const slug = slugify(item.title);
  const detailsHref = item.type === 'audiobook' ? `/audiobook/${item.id}/${slug}` : `/book/${item.id}/${slug}`;

  const isAudiobook = item.type === 'audiobook';

  return (
    <Card className={cn("overflow-hidden rounded-xl group border-none glass-card transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] h-full", className)}>
      <CardContent className="p-0 h-full flex flex-col">
        <Link href={detailsHref} className="relative block">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={`Cover of ${item.title}`}
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
          {isAudiobook && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Headphones className="h-14 w-14 text-white/90 drop-shadow-lg" />
            </div>
          )}
        </Link>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            <div className="flex-1 overflow-hidden">
                <h3 className="font-semibold text-base truncate text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{item.author}</p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 -mr-2">
                        <MoreVertical className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" dir='rtl'>
                    <DropdownMenuItem>علامت‌گذاری به عنوان تمام شده</DropdownMenuItem>
                    <DropdownMenuItem>آرشیو کردن</DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => removeFromLibrary(item.id)}
                    >
                      <Trash2 className="ml-2 h-4 w-4" />
                      حذف از کتابخانه
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {item.progress > 0 && (
             <div className="mt-3 space-y-1.5">
                <ProgressBar value={item.progress} />
                <p className="text-xs text-muted-foreground">{item.progress}% خوانده شده</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-border/50 flex flex-col sm:flex-row gap-2 flex-grow items-end">
             <Button className="w-full">
                {isAudiobook ? <Headphones className="ml-2 h-4 w-4" /> : <BookOpen className="ml-2 h-4 w-4" />}
                 {item.progress > 0 ? (isAudiobook ? 'ادامه گوش دادن' : 'ادامه مطالعه') : (isAudiobook ? 'شروع به گوش دادن' : 'شروع به مطالعه')}
             </Button>
             <Button variant="outline" className="w-full" asChild>
                <Link href={detailsHref}>مشاهده جزئیات</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
