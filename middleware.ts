import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { safeRedirectUrl } from '@/lib/security/sanitize';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Defense-in-depth security response headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  const pathname = request.nextUrl.pathname;

  // Only intercept /admin routes
  if (!pathname.startsWith('/admin')) {
    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Check auth session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is on /admin/login and already authenticated, redirect to /admin dashboard
  if (pathname === '/admin/login') {
    if (user) {
      const targetParam = request.nextUrl.searchParams.get('redirect');
      const safeTarget = safeRedirectUrl(targetParam, '/admin');
      return NextResponse.redirect(new URL(safeTarget, request.url));
    }
    return response;
  }

  // If accessing protected /admin/* without active session, redirect to /admin/login
  if (!user) {
    // Security Hardening: In production, demo/placeholder bypass is strictly prohibited
    if (process.env.NODE_ENV === 'production' && supabaseUrl.includes('placeholder')) {
      const redirectUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // In local development only, allow preview with warning header
    if (process.env.NODE_ENV !== 'production' && supabaseUrl.includes('placeholder')) {
      response.headers.set('x-admin-dev-mode', 'true');
      return response;
    }

    const redirectUrl = new URL('/admin/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
