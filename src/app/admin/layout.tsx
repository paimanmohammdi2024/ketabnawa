'use client';
import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/sidebar';
import AdminHeader from '@/components/admin/header';
import * as React from 'react';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Since we cannot pass state between server components, we manage the collapsed state here
  // and pass it down. But sidebar is now client component.
  // A better approach would be using a state management library or React Context.
  // For now, the sidebar manages its own state.
  
  return (
    <div className="flex min-h-screen w-full bg-secondary/30" dir="rtl">
      <AdminSidebar />
      <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out sm:mr-64 data-[collapsed=true]:sm:mr-16">
        <AdminHeader />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
