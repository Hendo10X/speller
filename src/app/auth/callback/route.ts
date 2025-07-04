import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async get(name: string) {
            return (await cookieStore).get(name)?.value;
          },
          async set(name: string, value: string, options: any) {
            try {
              (await cookieStore).set({ name, value, ...options });
            } catch (error) {
              // Handle cookie setting error
            }
          },
          async remove(name: string, options: any) {
            try {
              (await cookieStore).delete({ name, ...options });
            } catch (error) {
              // Handle cookie removal error
            }
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(new URL('/signin', requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL('/', requestUrl.origin));
} 