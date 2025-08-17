"use client"

import { useAuthStore } from '@/hooks/useAuthStore';
import Button from '@/UI/Button';

export const UserProfile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  console.log(user);
  if (isLoading) {
    return (
      <div className="p-4 bg-surface rounded-lg">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-surface rounded-lg">
        <p>Пользователь не авторизован</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-surface rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Профиль пользователя</h3>
      <div className="space-y-2">
        <p><strong>Имя:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Роль:</strong> {user?.role}</p>
        <p><strong>Статус:</strong> {user?.isActive ? 'Активен' : 'Неактивен'}</p>
        <p><strong>Дата регистрации:</strong> {new Date(user?.createdAt || '').toLocaleDateString()}</p>
      </div>
      <div className="mt-4">
        <Button
          variant="danger"
          size="sm"
          onClick={logout}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
};
