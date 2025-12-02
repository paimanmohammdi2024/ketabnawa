'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NawaBookLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LayoutDashboard, Menu, Search, LogIn, LogOut, User as UserIcon, Library } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth, useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

const navLinks = [
  { name: 'کتاب‌ها', href: '/books' },
  { name: 'کتاب‌های صوتی', href: '/audiobooks' },
  { name: 'دسته‌بندی‌ها', href: '/categories' },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo and Main Nav (Desktop) */}
        <div className="mr-4 hidden md:flex items-center">
          <Link href="/" className="ml-6 flex items-center space-x-2 rtl:space-x-reverse">
            <NawaBookLogo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">کتاب نوا</span>
          </Link>
          <nav className="flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <Link href="/" className="mb-6 flex items-center space-x-2 rtl:space-x-reverse">
                <NawaBookLogo className="h-6 w-6 text-primary" />
                <span className="font-bold">کتاب نوا</span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsSheetOpen(false)}
                    className="transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
                 <Link
                    href="/admin/dashboard"
                    onClick={() => setIsSheetOpen(false)}
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    داشبورد
                  </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 items-center justify-center md:justify-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="جستجوی کتاب..." className="pr-10 rounded-full" />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
          <ThemeToggle />
          {isUserLoading ? (
            <div className='h-9 w-24 animate-pulse rounded-full bg-muted-foreground/30' />
          ) : user ? (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                      <AvatarFallback>{user.displayName?.charAt(0) ?? user.email?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  dir="rtl"
                  className="w-56"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <UserIcon className="ml-2 h-4 w-4" />
                      <span>پروفایل</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard">
                      <LayoutDashboard className="ml-2 h-4 w-4" />
                      <span>داشبورد</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/library">
                      <Library className="ml-2 h-4 w-4" />
                      <span>کتابخانه</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="ml-2 h-4 w-4" />
                    <span>خروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" className="rounded-full !px-3">
              <Link href="/login">
                <LogIn className="ml-2 h-4 w-4" />
                ورود / ثبت‌نام
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
