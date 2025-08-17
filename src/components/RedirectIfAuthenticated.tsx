"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/useAuthStore';

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const RedirectIfAuthenticated = ({ 
  children, 
  redirectTo = '/dashboard' 
}: RedirectIfAuthenticatedProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Показываем загрузку пока проверяем аутентификацию
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  // Если авторизован, не показываем контент (будет перенаправление)
  if (isAuthenticated) {
    return null;
  }

  // Если не авторизован, показываем контент (страницу логина/регистрации)
  return <>{children}</>;
};
