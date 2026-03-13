'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Role } from '@/types/auth';
import { ROUTES } from '@/lib/constants';

export function useRequireRole(requiredRole?: Role) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.replace(ROUTES.PRODUCTS);
    }
  }, [isAuthenticated, user, isLoading, requiredRole, router]);

  return { isAuthenticated, user, isLoading };
}

