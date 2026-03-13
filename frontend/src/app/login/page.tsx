'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Boxes } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { ROUTES } from '@/lib/constants';

export default function LoginPage() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      if (user?.role === 'MANAGER') {
        router.replace(ROUTES.DASHBOARD);
      } else {
        router.replace(ROUTES.PRODUCTS);
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
            <Boxes className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Slooze Commodities</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in to manage your commodities
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Welcome back</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Enter your credentials to access your account
          </p>
          <LoginForm />
        </div>

        <div className="mt-6 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Demo Accounts
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-300">manager@example.com</span>
              <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 rounded-full font-medium">Manager</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-300">keeper@example.com</span>
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 rounded-full font-medium">Store Keeper</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

