'use client';

import * as React from 'react';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';
import { NawaBookLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import NavContent from './nav-content';

interface AdminSidebarProps {
    isCollapsed: boolean;
}

export default function AdminSidebar({ isCollapsed }: AdminSidebarProps) {
    return (
        <TooltipProvider>
            <aside 
                className={cn(
                    "fixed inset-y-0 right-0 z-40 h-screen flex-col border-l bg-card/60 backdrop-blur-lg transition-all duration-300 ease-in-out hidden sm:flex",
                    isCollapsed ? "w-20" : "w-[260px]"
                )}
            >
                <div className="flex h-16 shrink-0 items-center justify-center px-4">
                     <div className={cn("flex items-center gap-2 font-semibold transition-all")}>
                        <NawaBookLogo className="h-8 w-8 text-primary" />
                        <span className={cn("text-xl transition-opacity duration-200", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
                          کتاب نوا
                        </span>
                    </div>
                </div>
                <NavContent isCollapsed={isCollapsed} />
            </aside>
        </TooltipProvider>
    );
}
