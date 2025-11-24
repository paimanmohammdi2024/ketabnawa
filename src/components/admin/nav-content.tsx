'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
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
];

const settingsItem = { href: '/admin/settings', icon: Settings, label: 'تنظیمات' };

interface NavContentProps {
  isCollapsed?: boolean;
  isMobile?: boolean;
}

const NavLink = ({ item, pathname, isCollapsed }: { item: typeof navItems[0], pathname: string, isCollapsed?: boolean }) => {
    const isActive = pathname.startsWith(item.href);
    const linkContent = (
         <>
            <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "")} />
            <span className={cn(
                "transition-opacity font-medium", 
                isCollapsed ? "opacity-0 w-0" : "opacity-100",
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
            )}>
              {item.label}
            </span>
         </>
    );
    const commonClasses = cn(
        "flex items-center gap-4 rounded-none transition-colors duration-200 ease-in-out relative",
        "hover:bg-accent/10",
        isCollapsed ? "w-10 h-10 justify-center" : "w-full justify-start px-4 py-3"
    );

    if (isCollapsed) {
        return (
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link href={item.href} className={commonClasses}>
                        {isActive && <div className="absolute right-0 h-full w-1 bg-primary rounded-l-full"></div>}
                        {linkContent}
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="left" sideOffset={5}>
                    {item.label}
                </TooltipContent>
            </Tooltip>
        )
    }

    return (
        <Link href={item.href} className={commonClasses}>
           {isActive && <div className="absolute right-0 h-full w-1 bg-primary rounded-l-full"></div>}
           {linkContent}
        </Link>
    )
};


const MobileNavLink = ({ item, pathname }: { item: typeof navItems[0], pathname: string }) => {
    const isActive = pathname.startsWith(item.href);
    return (
         <Link
            href={item.href}
            className={cn(
            "flex items-center gap-4 rounded-md px-4 py-3 transition-colors duration-200 ease-in-out relative",
            "hover:bg-accent/10",
            isActive ? "text-primary font-semibold" : "text-muted-foreground"
            )}
        >
            {isActive && <div className="absolute right-0 h-full w-1 bg-primary rounded-l-full"></div>}
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
        </Link>
    );
};


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
            <nav className="flex flex-col gap-1 p-2">
              {navItems.map((item) => (
                <MobileNavLink key={item.href} item={item} pathname={pathname} />
              ))}
            </nav>
            <div className="mt-auto p-2">
                 <MobileNavLink item={settingsItem} pathname={pathname} />
            </div>
        </>
    )
  }

  return (
    <TooltipProvider>
      <nav className="flex flex-col items-stretch gap-1 py-4 flex-grow">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} isCollapsed={isCollapsed} />
        ))}
      </nav>
      <div className="mt-auto border-t p-2">
        <NavLink item={settingsItem} pathname={pathname} isCollapsed={isCollapsed} />
      </div>
    </TooltipProvider>
  );
}
