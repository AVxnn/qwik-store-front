"use client"

import React, { useState } from 'react';
import Modal from '@/UI/Modal';
import ImageUpload from '@/UI/ImageUpload';
import Input from '@/UI/Input';
import Textarea from '@/UI/Textarea';
import Button from '@/UI/Button';
import { useNotifications } from '@/hooks/useNotifications';
import { useShopStore } from '@/hooks/useShopStore';
import { CreateShopData, ShopService } from '@/services/shopService';

interface CreateStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StoreFormData {
  logo: File | null;
  name: string;
  description: string;
  administrator: string;
  minOrderAmount: string;
  botToken: string;
}

const CreateStoreModal: React.FC<CreateStoreModalProps> = ({
  isOpen,
  onClose
}) => {
  const { showSuccess, showError } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<StoreFormData>({
    logo: null,
    name: '',
    description: '',
    administrator: '@primer',
    minOrderAmount: '100',
    botToken: ''
  });

  const handleInputChange = (field: keyof StoreFormData, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const { createShop } = useShopStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl: string | undefined;

      // Загружаем изображение, если оно выбрано
      if (formData.logo) {
        imageUrl = await ShopService.uploadImage(formData.logo);
      }

      // Подготавливаем данные для API
      const shopData: CreateShopData = {
        name: formData.name,
        description: formData.description,
        telegramBotToken: formData.botToken,
        adminUsername: formData.administrator,
        minOrderAmount: parseFloat(formData.minOrderAmount) || 0,
        imageUrl
      };

      // Создаем магазин через API
      await createShop(shopData);
      
      showSuccess('Магазин успешно создан!');
      onClose();
      
      // Сброс формы
      setFormData({
        logo: null,
        name: '',
        description: '',
        administrator: '@primer',
        minOrderAmount: '100',
        botToken: ''
      });
    } catch (error) {
      console.error('Error creating store:', error);
      showError('Ошибка при создании магазина');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      showCloseButton={false}
      onClose={onClose}
      title="Создание магазина"
      description="Начни прямо сейчас"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Логотип магазина */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Логотип магазина
          </label>
          <ImageUpload
            value={formData.logo}
            onChange={(file) => handleInputChange('logo', file)}
            placeholder="Загрузите изображение"
            maxSize={6}
          />
        </div>

                 {/* Название магазина */}
         <div>
           <Input
             label="Название магазина"
             value={formData.name}
             onChange={(value) => handleInputChange('name', value)}
             placeholder="Введите название"
             variant="landing"
             inputClassName="!bg-background"
             className="w-full"
           />
         </div>

        {/* Описание магазина */}
        <div>
          <Textarea
            label="Описание магазина"
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
            placeholder="Введите описание"
            variant="landing"
            textareaClassName="!bg-background"
            className="w-full"
            rows={2}
            resize="none"
          />
        </div>

                 {/* Администратор магазина */}
         <div>
           <Input
             label="Администратор магазина"
             value={formData.administrator}
             onChange={(value) => handleInputChange('administrator', value)}
             placeholder="@username"
             inputClassName="!bg-background"
             variant="landing"
             className="w-full"
           />
         </div>

        {/* Мин. Сумма заказа */}
        <div>
          <Input
            label="Мин. Сумма заказа"
            type="number"
            value={formData.minOrderAmount}
            onChange={(value) => handleInputChange('minOrderAmount', value)}
            placeholder="100"
            inputClassName="!bg-background"
            variant="landing"
            className="w-full"
          />
        </div>

                 {/* Telegram-токен бота */}
         <div>
           <Input
             label="Telegram-токен бота"
             value={formData.botToken}
             onChange={(value) => handleInputChange('botToken', value)}
             placeholder="Введите токен бота"
             inputClassName="!bg-background"
             variant="landing"
             className="w-full"
           />
         </div>

        {/* Кнопка создания */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Создание...
              </div>
            ) : (
              'Создать аккаунт'
            )}
          </Button>
        </div>

        {/* Footer текст */}
        <p className="text-gray-400 text-xs text-center mb-8">
          После создания вы сможете детальнее настроить свой магазин
        </p>
      </form>
    </Modal>
  );
};

export default CreateStoreModal;
