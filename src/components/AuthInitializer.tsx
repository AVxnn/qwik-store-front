"use client"

import { useEffect } from 'react';
import { authActions } from '@/stores/authStore';

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Проверяем аутентификацию при загрузке приложения
    authActions.checkAuth();
  }, []);

  return <>{children}</>;
};
