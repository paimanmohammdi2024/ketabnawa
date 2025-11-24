'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/admin/books', icon: Book, label: 'Books' },
  { href: '/admin/audiobooks', icon: Headphones, label: 'Audiobooks' },
  { href: '/admin/categories', icon: LayoutGrid, label: 'Categories' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/publishers', icon: Building, label: 'Publishers' },
  { href: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

function NavContent() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-16 shrink-0 items-center justify-center px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
          <NawaBookLogo className="h-8 w-8 text-primary" />
          <span className="text-xl">BookNova</span>
        </Link>
      </div>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8",
                    "hover:text-foreground hover:bg-accent/20 hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)]",
                    pathname.startsWith(item.href) && "bg-accent/20 text-accent-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </>
  );
}

export default function AdminSidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-card/60 backdrop-blur-lg sm:flex">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden fixed top-4 left-4 z-20">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs bg-card/80 backdrop-blur-xl border-none">
            <NavContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
