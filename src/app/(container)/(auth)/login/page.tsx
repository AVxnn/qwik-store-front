"use client"

import React, { useState } from 'react'
import Button from '@/UI/Button'
import Input from '@/UI/Input'
import Link from 'next/link'
import { useNotifications } from '@/hooks/useNotifications'
import CustomCursor from '@/UI/CustomCursor'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useRouter } from 'next/navigation'
import { RedirectIfAuthenticated } from '@/components/RedirectIfAuthenticated'

const LoginPage = () => {
  const { showSuccess, showError, showInfo } = useNotifications();
  const { login, isLoading } = useAuthStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Валидация email
  const validateEmail = (email: string): string | null => {
    if (!email) return 'Email обязателен';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Неверный формат email';
    return null;
  };

  // Валидация пароля
  const validatePassword = (password: string): string | null => {
    if (!password) return 'Пароль обязателен';
    if (password.length < 6) return 'Пароль должен содержать минимум 6 символов';
    return null;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Очищаем ошибку при вводе
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация всех полей
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    setErrors({
      email: emailError || undefined,
      password: passwordError || undefined,
    });

    // Если нет ошибок, отправляем форму
    if (!emailError && !passwordError) {
      try {
        await login(formData.email, formData.password);
        showSuccess('Успешный вход в систему');
      } catch (error: unknown) {
        console.error('Login error:', error);
        
        const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка при входе';
        
        // Обрабатываем различные типы ошибок
        if (errorMessage.includes('401') || errorMessage.includes('Неверные учетные данные')) {
          showError('Неверный email или пароль');
          setErrors(prev => ({ 
            ...prev, 
            email: 'Неверный email или пароль',
            password: 'Неверный email или пароль'
          }));
        } else if (errorMessage.includes('400') || errorMessage.includes('валидации')) {
          showError('Проверьте правильность введенных данных');
        } else {
          showError(errorMessage);
        }
      }
    } else {
      // Показываем ошибки как уведомления
      if (emailError) {
        showError('Введите корректный email');
      }
      if (passwordError) {
        showError('Пароль должен содержать минимум 6 символов');
      }
    }
  };

  return (
    <RedirectIfAuthenticated>
      <div className='w-full h-full px-6'>
        <main className='flex h-screen justify-center items-center'>
          <div className='w-full max-w-[460px] min-h-[426px] bg-surface rounded-[24px] p-8'>
            <h1 className='text-[32px] font-regular text-center mb-3'>Вход в аккаунт</h1>
            <p className='text-[14px] font-regular text-center mb-6'>Нет аккаунта?  
                <CustomCursor className='inline-block ml-1'><Link href="/registration" className='text-[14px] font-regular text-primary cursor-none hover:underline'>Регистрация</Link>
                </CustomCursor></p>
              
            <form onSubmit={handleSubmit} className='space-y-4'>
              <Input
                label="Электронная почта"
                type="email"
                placeholder="Введите электронную почту"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                error={errors.email}
                validation={{
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  custom: validateEmail,
                }}
              />

              {/* Password Input */}
              <Input
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
                showPasswordToggle={true}
                error={errors.password}
                validation={{
                  required: true,
                  minLength: 6,
                  custom: validatePassword,
                }}
              />

              {/* Submit Button */}
              <CustomCursor>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="mt-4 !cursor-none"
                  disabled={isLoading}
                >
                  {isLoading ? 'Вход в систему...' : 'Войти'}
                </Button>
              </CustomCursor>
            </form>
          </div>
        </main>
      </div>
    </RedirectIfAuthenticated>
  )
}

export default LoginPage
