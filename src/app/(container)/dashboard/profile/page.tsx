"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useNotifications } from '@/hooks/useNotifications';
import Button from '@/UI/Button';
import Input from '@/UI/Input';
import PhoneInput from '@/UI/PhoneInput';
import AvatarUpload from '@/UI/AvatarUpload';
import { formatPhoneForDisplay } from '@/utils/phoneUtils';
import CogIcon from '../../../../../public/icons/CogIcon';
import CloseIcon from '../../../../../public/icons/CloseIcon';


const ProfilePage = () => {
  const { user, updateProfile, uploadAvatar } = useAuthStore();
  const { showSuccess, showError } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: (user?.phoneNumber as string),
    telegram: (user?.telegramUsername as string),
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Обновляем данные на сервере
      await updateProfile({
        name: formData.name,
        phoneNumber: '7' + formData.phone,
        telegramUsername: formData.telegram,
      });
      
      setIsEditing(false);
      showSuccess('Профиль успешно обновлен');
    } catch (error) {
      console.error('Error updating profile:', error);
      showError('Ошибка при обновлении профиля');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: (user?.phoneNumber as string) || '9956656465',
      telegram: (user?.telegramUsername as string) || '@romashkog',
    });
    setIsEditing(false);
  };

  const handleAvatarChange = async (file: File) => {
    try {
      await uploadAvatar(file);
      showSuccess('Аватар успешно обновлен');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      showError('Ошибка при загрузке аватара');
    } finally {
      setIsAvatarLoading(false);
    }
  };

  return (
          <div className='max-w-7xl mx-auto'>
          <div className="w-full max-w-[1440px] mx-auto flex">
        <main className="w-full pt-0">
          <div className=" mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-white text-[32px] font-semibold mb-2">Профиль</h1>
              <p className="text-muted text-[16px]">Управление личными данными и настройками</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Section - Personal Data */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="lg:col-span-2"
              >
                {/* Profile Header */}
                <div className="bg-surface rounded-[16px] p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {isEditing ? (
                        <AvatarUpload
                          currentAvatar={user?.avatarUrl}
                          onAvatarChange={handleAvatarChange}
                          isLoading={isAvatarLoading}
                          size="md"
                        />
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/30"
                        >
                          {user?.avatarUrl ? (
                            <img 
                              src={user.avatarUrl} 
                              alt={user.name || 'Avatar'} 
                              className="w-full h-full object-cover"
                            />
                          ) : user?.name ? (
                            <span className="text-primary font-semibold text-2xl">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                            </svg>
                          )}
                        </motion.div>
                      )}
                      <div>
                        <h2 className="text-white text-[24px] font-semibold">
                          {user?.name || 'Пользователь'}
                        </h2>
                        <p className="text-muted text-[16px]">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                    {/* Save Button */}
                  <div className='flex gap-4'>
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4"
                    >
                      <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                      >
                        {isLoading ? (
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {isLoading ? 'Сохранение...' : 'Сохранить'}
                      </Button>
                    </motion.div>
                  )}
                    <Button
                      variant={"landing"}
                      size="sm"
                      onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      {isEditing ? <CloseIcon/> : <CogIcon/>}
                      {isEditing ? 'Закрыть' : 'Редактировать'}
                    </Button>
                  </div>
                  </div>
                </div>

                {/* Personal Data Section */}
                <div className="bg-surface rounded-[16px] p-6">
                  <h3 className="text-white text-[20px] font-semibold mb-6">Персональные данные</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Имя Фамилия */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-[#1a1a1a] rounded-[12px] p-4"
                    >
                      <label className="text-muted text-[14px] mb-2 block">Имя Фамилия</label>
                      {isEditing ? (
                        <Input
                          value={formData.name}
                          onChange={(value: string) => handleInputChange('name', value)}
                          placeholder="Введите имя и фамилию"
                          variant="landing"
                          className="!bg-transparent !border-0 !p-0 !text-white"
                        />
                      ) : (
                        <p className="text-white text-[16px] font-medium">{formData.name || 'Ромашко Георгий'}</p>
                      )}
                    </motion.div>

                    {/* Название магазина */}
                    {/* <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-[#1a1a1a] rounded-[12px] p-4"
                    >
                      <label className="text-muted text-[14px] mb-2 block">Название магазина</label>
                      <p className="text-white text-[16px] font-medium">Тг магазин</p>
                    </motion.div> */}

                    {/* Роль */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-[#1a1a1a] rounded-[12px] p-4"
                    >
                      <label className="text-muted text-[14px] mb-2 block">Роль</label>
                      <p className="text-white text-[16px] font-medium">Пользователь</p>
                    </motion.div>

                    {/* Статус аккаунта */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-[#1a1a1a] rounded-[12px] p-4"
                    >
                      <label className="text-muted text-[14px] mb-2 block">Статус аккаунта</label>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user?.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <p className="text-white text-[16px] font-medium">{user?.isActive ? 'Активный' : 'Неактивный'}</p>
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-[#1a1a1a] rounded-[12px] p-4"
                    >
                      <label className="text-muted text-[14px] mb-2 block">Ваша почта</label>
                      <p className="text-white text-[16px] font-medium">{user?.email || 'thevxnn@icloud.com'}</p>
                    </motion.div>

                    {/* Телефон */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-[#1a1a1a] rounded-[12px] p-4"
                    >
                      <label className="text-muted text-[14px] mb-2 block">Ваш номер телефона</label>
                      {isEditing ? (
                                                 <PhoneInput
                          value={formData.phone}
                          onChange={(value: string) => handleInputChange('phone', value)}
                          placeholder="+7 (___) ___ __-__"
                          className="w-full"
                        />
                      ) : (
                        <p className="text-white text-[16px] font-medium">
                          {user?.phoneNumber ? formatPhoneForDisplay(user.phoneNumber) : "Добавьте номер телефона"}
                        </p>
                      )}
                    </motion.div>

                    {/* Telegram */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="bg-[#1a1a1a] rounded-[12px] p-4"
                    >
                      <label className="text-muted text-[14px] mb-2 block">Telegram-аккаунт</label>
                      {isEditing ? (
                        <Input
                          value={formData.telegram}
                          onChange={(value: string) => handleInputChange('telegram', value)}
                          placeholder="Введите Telegram аккаунт"
                          variant="landing"
                          className="!bg-transparent !border-0 !p-0 !text-white"
                        />
                      ) : (
                        <p className="text-white text-[16px] font-medium">@{user?.telegramUsername || "Добавьте Telegram аккаунт"}</p>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Right Section - Tariff */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="lg:col-span-1"
              >
                <div className="bg-surface rounded-[16px] p-6 h-fit">
                  <h3 className="text-white text-[24px] font-semibold mb-4">Тариф</h3>
                  
                  <div className="space-y-4">
                    <p className="text-muted text-[16px]">
                      У нас нет активного тарифа
                    </p>
                    
                    <div className="flex items-center gap-2 text-muted text-[14px] cursor-pointer hover:text-primary transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Для чего нужен тариф</span>
                    </div>
                    
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      Приобрести тариф
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
          </div>
      
  );
};

export default ProfilePage;