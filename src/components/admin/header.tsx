'use client';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const getPageTitle = (pathname: string) => {
    if (pathname.includes('/admin/dashboard')) return 'Dashboard';
    if (pathname.includes('/admin/books')) return 'Books';
    if (pathname.includes('/admin/audiobooks')) return 'Audiobooks';
    if (pathname.includes('/admin/categories')) return 'Categories';
    if (pathname.includes('/admin/users')) return 'Users';
    if (pathname.includes('/admin/publishers')) return 'Publishers';
    if (pathname.includes('/admin/analytics')) return 'Analytics';
    if (pathname.includes('/admin/settings')) return 'Settings';
    return 'Admin';
};


export default function AdminHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
       <div className="flex-1 sm:hidden" /> {/* Spacer for mobile menu button */}
       <h1 className="flex-1 text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/admin-avatar/100/100" alt="@admin" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
