'use client';

import { LogoutButton } from './LogoutButton';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const isSignInPage = pathname === '/signin';

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Speller</h1>
        {!isSignInPage && <LogoutButton />}
      </div>
    </header>
  );
} 