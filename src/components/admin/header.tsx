'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Menu, PanelLeftClose, PanelRightClose, Search, User, Settings, LogOut, Home, Library } from 'lucide-react';
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
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuth, useUser } from '@/firebase';


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


export default function AdminHeader({ isSidebarCollapsed, toggleSidebar }: { isSidebarCollapsed: boolean; toggleSidebar: () => void; }) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (auth) {
        await auth.signOut();
      }
    } catch (error) {
        console.error("Error signing out: ", error);
    } finally {
        // Clear any local storage session data if needed
        localStorage.removeItem('booknova-library-storage');
        router.push('/');
    }
  };


  return (
    <header className={cn(
        "sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out sm:px-6"
    )}>
       <div className="flex items-center gap-4">
          {/* Sidebar Toggle Button for Desktop and Mobile Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">باز کردن منو</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-xs bg-card/80 backdrop-blur-xl border-none p-0">
                <NavContent isMobile={true} />
            </SheetContent>
          </Sheet>
          
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden sm:inline-flex">
            {isSidebarCollapsed ? <PanelRightClose /> : <PanelLeftClose />}
            <span className="sr-only">{isSidebarCollapsed ? 'گسترش نوار کناری' : 'جمع کردن نوار کناری'}</span>
          </Button>

          <h1 className="text-xl font-semibold hidden sm:block">{title}</h1>
       </div>
       
       <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="جستجو در داشبورد..." className="pr-10 rounded-full bg-secondary" />
          </div>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">اعلان‌ها</span>
          </Button>
          {isUserLoading ? (
            <div className='h-9 w-9 rounded-full bg-muted animate-pulse' />
          ) : user ? (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL ?? "https://picsum.photos/seed/admin-avatar/100/100"} alt={user.displayName ?? "Admin"} />
                    <AvatarFallback>{user.displayName?.charAt(0) ?? user.email?.charAt(0)?.toUpperCase() ?? 'A'}</AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                align="end" 
                dir="rtl"
                className="w-56 rounded-xl p-2 glass-card data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
                >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.displayName ?? 'کاربر'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                    </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                    <Link href="/profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>پروفایل من</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                    <Link href="/library" className="flex items-center gap-2">
                        <Library className="h-4 w-4" />
                        <span>کتابخانه</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                    <Link href="/" className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <span>بازگشت به وبسایت</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                    <Link href="/admin/settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>تنظیمات</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-lg text-destructive focus:text-destructive focus:bg-destructive/10">
                    <div className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        <span>خروج</span>
                    </div>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            ) : (
                <Button asChild>
                    <Link href="/login">ورود</Link>
                </Button>
            )}
       </div>
    </header>
  );
}
