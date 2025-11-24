'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { NawaBookLogo } from '@/components/icons';
import {
  Home,
  Book,
  Headphones,
  LayoutGrid,
  Users,
  Building,
  BarChart2,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', icon: Home, label: 'داشبورد' },
  { href: '/admin/books', icon: Book, label: 'کتاب‌ها' },
  { href: '/admin/audiobooks', icon: Headphones, label: 'کتاب‌های صوتی' },
  { href: '/admin/categories', icon: LayoutGrid, label: 'دسته‌بندی‌ها' },
  { href: '/admin/users', icon: Users, label: 'کاربران' },
  { href: '/admin/publishers', icon: Building, label: 'ناشران' },
  { href: '/admin/analytics', icon: BarChart2, label: 'تحلیل‌ها' },
  { href: '/admin/settings', icon: Settings, label: 'تنظیمات' },
];

interface NavContentProps {
  isCollapsed?: boolean;
  isMobile?: boolean;
}

export default function NavContent({ isCollapsed = false, isMobile = false }: NavContentProps) {
  const pathname = usePathname();

  if (isMobile) {
    return (
        <>
            <div className="flex h-16 shrink-0 items-center justify-center border-b px-4">
              <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                <NawaBookLogo className="h-8 w-8 text-primary" />
                <span className="text-xl">کتاب نوا</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
                    "hover:text-foreground hover:bg-accent/20 hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)]",
                    pathname.startsWith(item.href) && "bg-accent/20 text-accent-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
        </>
    )
  }

  return (
    <nav className="flex flex-col items-stretch gap-4 px-4 sm:py-5">
      {navItems.map((item) => (
        <Tooltip key={item.href} delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                "flex items-center justify-center gap-3 rounded-lg text-muted-foreground transition-all h-10",
                "hover:text-foreground hover:bg-accent/20 hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)]",
                pathname.startsWith(item.href) && "bg-accent/20 text-accent-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]",
                isCollapsed ? "w-10 justify-center" : "w-full justify-start px-3"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className={cn("transition-opacity", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                {item.label}
              </span>
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right" sideOffset={5}>
                {item.label}
            </TooltipContent>
          )}
        </Tooltip>
      ))}
    </nav>
  );
}
