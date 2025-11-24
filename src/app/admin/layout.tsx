'use client';
import type { Metadata } from 'next';
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
  
  return (
    <div className="flex min-h-screen w-full bg-secondary/30" dir="rtl">
      <AdminSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <div className={cn("flex flex-1 flex-col transition-all duration-300 ease-in-out",
         isCollapsed ? "sm:mr-16" : "sm:mr-64"
      )}>
        <AdminHeader />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
