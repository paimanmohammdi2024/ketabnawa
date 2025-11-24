'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, LayoutGrid, Library, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'خانه', icon: Home },
  { href: '/books', label: 'کتاب‌ها', icon: BookOpen },
  { href: '/categories', label: 'دسته‌بندی‌ها', icon: LayoutGrid },
  { href: '/library', label: 'کتابخانه', icon: Library },
  { href: '/profile', label: 'پروفایل', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[999] h-20 border-t border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:hidden animate-in fade-in-0 slide-in-from-bottom-5 duration-300">
      <div className="container mx-auto flex h-full items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 rounded-lg py-2 text-muted-foreground transition-all duration-200',
                'hover:bg-primary/5 hover:text-primary',
                {
                  'text-primary font-semibold bg-primary/10': isActive,
                }
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
