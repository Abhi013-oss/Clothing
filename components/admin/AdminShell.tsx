'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  FolderTree,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Do not render full admin shell on the login route
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    router.push('/admin/login');
    router.refresh();
  };

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: ShoppingBag },
    { href: '/admin/categories', label: 'Categories', icon: FolderTree },
    { href: '/admin/settings', label: 'Business Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-canvas-sand/30 flex flex-col font-sans">
      {/* Admin Top Navigation Bar */}
      <header className="bg-canvas-pure border-b border-ink-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand Title */}
            <div className="flex items-center gap-6">
              <Link href="/admin" className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-ink-border shadow-sm bg-white flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Banwari Lal Cloth House Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-base font-semibold text-ink tracking-wide leading-tight">
                    BANWARILAL
                  </span>
                  <span className="font-sans text-[9px] tracking-widest text-accent-gold uppercase font-bold">
                    Merchant Console
                  </span>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-1">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-semibold tracking-wide transition-colors ${
                        isActive
                          ? 'bg-ink text-white'
                          : 'text-ink-secondary hover:text-ink hover:bg-canvas-muted'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Action Items */}
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-sm border border-ink-border text-xs font-semibold text-ink hover:bg-canvas-muted transition-colors"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3 h-3 text-accent-gold" />
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold text-ink-secondary hover:text-status-error hover:bg-status-error/10 transition-colors"
                aria-label="Sign out of admin console"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Sub-bar */}
        <div className="md:hidden border-t border-ink-border/60 bg-canvas-pure px-4 py-2 flex items-center justify-around overflow-x-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-sm text-[10px] font-semibold ${
                  isActive ? 'text-ink font-bold' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Admin Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
