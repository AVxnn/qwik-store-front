"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CreateStoreModal from '@/components/CreateStoreModal';
import { useShopStore } from '@/hooks/useShopStore';
import { useAuthStore } from '@/hooks/useAuthStore';
import Image from 'next/image';

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { loadUserShops, isLoading } = useShopStore();
  const { user } = useAuthStore();

  // Загружаем магазины при монтировании
  useEffect(() => {
    loadUserShops();
  }, [loadUserShops]);

  // Проверяем параметр create в URL
  useEffect(() => {
    const createParam = searchParams?.get('create');
    if (createParam === 'true') {
      setIsCreateModalOpen(true);
    }
  }, [searchParams]);

  // Обработчик закрытия модального окна
  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    // Убираем параметр create из URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('create');
    router.replace(newUrl.pathname + newUrl.search);
  };

  return (
    <>
      <div className='max-w-7xl mx-auto'>
        {/* Dashboard content will go here */}
        <div className='bg-surface rounded-[16px] p-6'>
          <h2 className='text-white text-[24px] font-regular mb-4'>
            Добро пожаловать в дашборд
          </h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : user?.primaryShopId ? (
            <div className="space-y-4">
              {user?.primaryShop && (
                <div className="bg-background rounded-[16px] p-6">
                  <Image src={user?.primaryShop?.imageUrl} className='rounded-[16px] mb-4' alt={user?.primaryShop?.name} width={100} height={100} />
                  <h3 className="text-white text-lg font-medium mb-2">
                    Текущий магазин: {user?.primaryShop?.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Описание: {user?.primaryShop?.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Товаров: {user?.primaryShop?.name}</span>
                    <span>Мин. заказ: {user?.primaryShop?.minOrderAmount} ₽</span>
                    <span>Статус: {user?.primaryShop?.isActive ? 'Активен' : 'Неактивен'}</span>
                    <span>Телеграм админа: {user?.primaryShop?.adminUsername}</span>
                    <span>Id создателя: {user?.primaryShop?.ownerId}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className='text-muted text-[14px] mb-4'>
                У вас пока нет магазинов
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors"
              >
                Создать первый магазин
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно создания магазина */}
      <CreateStoreModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default DashboardPage;
