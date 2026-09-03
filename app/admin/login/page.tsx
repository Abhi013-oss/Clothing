'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage('Invalid administrative credentials. Please verify your email and password.');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setErrorMessage('Authentication request failed. Please check your network connection.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas-muted flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-ink">
          BANWARILAL
        </span>
        <p className="font-sans text-xs tracking-widest text-accent-gold uppercase font-semibold mt-1">
          Cloth House • Admin Portal
        </p>
        <h2 className="mt-6 text-center font-serif text-xl sm:text-2xl font-medium text-ink">
          Sign In to Merchant Console
        </h2>
        <p className="mt-1 text-center font-sans text-xs text-ink-secondary">
          Restricted access for store managers and catalogue merchandisers
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-canvas-pure py-8 px-6 sm:px-10 shadow-card-rest border border-ink-border rounded-sm">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-sm bg-status-error/10 border border-status-error/30 flex items-start gap-3 text-xs text-status-error">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block font-sans text-xs font-semibold text-ink uppercase tracking-wider mb-2"
              >
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@banwarilalclothhouse.com"
                  className="w-full pl-10 pr-4 py-3 bg-canvas-sand/40 border border-ink-border rounded-sm text-sm text-ink placeholder:text-ink-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-sans text-xs font-semibold text-ink uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-canvas-sand/40 border border-ink-border rounded-sm text-sm text-ink placeholder:text-ink-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-sm bg-ink text-white font-sans text-xs font-semibold uppercase tracking-wider hover:bg-ink-hover transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating…' : 'Sign In to Console'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-ink-border text-center">
            <p className="font-sans text-[11px] text-ink-muted">
              Internal business system. Public account registration is permanently disabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
