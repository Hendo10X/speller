'use client';

import { LogoutButton } from './LogoutButton';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();
  const isSignInPage = pathname === '/signin';

  if (isSignInPage) {
    return null;
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/speller.svg"
            alt="Speller Logo"
            width={30}
            height={30}
            priority
          />
        </div>
        <LogoutButton />
      </div>
    </header>
  );
} 