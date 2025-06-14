'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { spellCheck } from '../lib/gemini';
import type { SpellCheckResult } from '../lib/supabase';
import { MessageAssistant } from '@/components/MessageAssistant';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<SpellCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (!session) {
          router.push('/auth/signin');
          return;
        }
      } catch (err) {
        console.error('Session check error:', err);
        setError('Failed to check authentication status');
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router, supabase.auth]);

  const handleSpellCheck = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await spellCheck(message);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check spelling');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <div>Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <MessageAssistant />
    </main>
  );
}
