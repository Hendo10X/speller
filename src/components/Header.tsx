'use client';

import { LogoutButton } from './LogoutButton';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isSignInPage = pathname === '/signin';

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2"
          >
            {mounted && (theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
            {mounted && (theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
          </Button>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
} 