'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu } from 'lucide-react';
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavContent from '@/components/admin/nav-content';


const getPageTitle = (pathname: string) => {
    if (pathname.includes('/admin/dashboard')) return 'داشبورد';
    if (pathname.includes('/admin/books')) return 'کتاب‌ها';
    if (pathname.includes('/admin/audiobooks')) return 'کتاب‌های صوتی';
    if (pathname.includes('/admin/categories')) return 'دسته‌بندی‌ها';
    if (pathname.includes('/admin/users')) return 'کاربران';
    if (pathname.includes('/admin/publishers')) return 'ناشران';
    if (pathname.includes('/admin/analytics')) return 'تحلیل‌ها';
    if (pathname.includes('/admin/settings')) return 'تنظیمات';
    return 'ادمین';
};


export default function AdminHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
       <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="h-5 w-5" />
                <span className="sr-only">باز کردن منو</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-xs bg-card/80 backdrop-blur-xl border-none p-0">
                <NavContent isMobile={true} />
            </SheetContent>
          </Sheet>
       </div>
       <h1 className="flex-1 text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">اعلان‌ها</span>
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
          <DropdownMenuContent align="end" dir="rtl">
            <DropdownMenuLabel>حساب کاربری من</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/admin/settings">تنظیمات</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>پشتیبانی</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/">خروج</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
