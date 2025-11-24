'use client';
import AdminSidebar from '@/components/admin/sidebar';
import AdminHeader from '@/components/admin/header';
import * as React from 'react';
import { cn } from '@/lib/utils';

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
      
      <div className={cn("flex flex-1 flex-col transition-all duration-300 ease-in-out",
         isCollapsed ? "mr-20" : "mr-[260px]"
      )}>
        <AdminHeader 
          isSidebarCollapsed={isCollapsed} 
          toggleSidebar={toggleSidebar} 
        />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
