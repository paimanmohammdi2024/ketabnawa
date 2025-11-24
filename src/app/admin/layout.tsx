'use client';
import AdminSidebar from '@/components/admin/sidebar';
import AdminHeader from '@/components/admin/header';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex min-h-screen w-full flex-row bg-secondary/30" dir="rtl">
      <AdminSidebar isCollapsed={isCollapsed} />
      
      <div className="fixed top-4 right-4 z-50 sm:hidden">
          {/* This button is for mobile view, handled by the Sheet in AdminHeader */}
      </div>

      <div className={cn("flex flex-1 flex-col transition-all duration-300 ease-in-out",
         isCollapsed ? "mr-20" : "mr-[260px]"
      )}>
        <AdminHeader isSidebarCollapsed={isCollapsed} />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Sidebar Toggle Button for Desktop */}
      <div className={cn(
        "fixed top-4 z-50 transition-all duration-300 ease-in-out hidden sm:block",
        isCollapsed ? "right-4" : "right-[220px]"
      )}>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? <PanelRightClose /> : <PanelLeftClose />}
            <span className="sr-only">{isCollapsed ? 'گسترش نوار کناری' : 'جمع کردن نوار کناری'}</span>
        </Button>
      </div>
    </div>
  );
}
