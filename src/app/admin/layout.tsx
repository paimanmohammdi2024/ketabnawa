import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/sidebar';
import AdminHeader from '@/components/admin/header';

export const metadata: Metadata = {
  title: 'BookNova Admin',
  description: 'Admin Dashboard for BookNova',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-secondary/30">
      <AdminSidebar />
      <div className="flex flex-1 flex-col sm:ml-14">
        <AdminHeader />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
