
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Logo } from '../icons/logo';
import dynamic from 'next/dynamic';

const UserNav = dynamic(() => import('./user-nav').then(mod => mod.UserNav), { ssr: false });

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
       <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">CampusZen</span>
        </Link>
      </div>
      <UserNav />
    </header>
  );
}
