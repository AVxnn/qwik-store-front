"use client"

import LanguageSelector from '@/UI/LanguageSelector'
import ThemeToggle from '@/UI/ThemeToggle'
import React, { useState } from 'react'
import Button from '@/UI/Button'
import Input from '@/UI/Input'
import Checkbox from '@/UI/Checkbox'
import Link from 'next/link'
import useNotifications from '@/hooks/useNotifications'
import CustomCursor from '@/UI/CustomCursor'
import ArrowIcon from '../../../../../public/icons/ArrowIcon'
import { useRouter } from 'next/navigation'
import RegistrationSuccess from '@/components/RegistrationSuccess'
import { AnimatePresence, motion } from 'framer-motion'

const RegistrationPage = () => {
  const { showSuccess, showError, showInfo } = useNotifications();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    agreeToTerms?: string;
  }>({});

  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация всех полей
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const termsError = !formData.agreeToTerms ? 'Необходимо согласиться с политикой конфиденциальности' : null;
    
    setErrors({
      email: emailError || undefined,
      password: passwordError || undefined,
      agreeToTerms: termsError || undefined,
    });

    
    // Если нет ошибок, отправляем форму
    if (!emailError && !passwordError && !termsError) {
      console.log('Форма отправлена:', formData);
      showSuccess('Аккаунт создан, начните создавать магазин');
      setIsRegistrationComplete(true);
      // Здесь будет логика отправки формы
    } else {
      // Показываем ошибки как уведомления
      if (termsError) {
        showInfo('Примите политику конфиденциальности');
      }
      if (emailError) {
        showError('Такой Email уже используется');
      }
      if (passwordError) {
        showError('Пароль должен содержать минимум 6 символов');
      }
    }
  };

  return (
    <div className='w-full h-full px-6'>
      <main className='flex h-screen justify-center items-center'>
        <AnimatePresence mode="wait">
          {!isRegistrationComplete ? (
            <motion.div
              key="registration-form"
              className='w-full h-fit max-w-[460px] min-h-[570px] bg-surface rounded-[24px] p-8'
            >
              <h1 className='text-[32px] font-regular text-center mb-3'>Создание аккаунта</h1>
              <p className='text-[14px] font-regular text-center mb-8'>
                Уже создан аккаунт? <CustomCursor className='inline-block ml-1'>
                  <Link href="/login" className='text-[14px] font-regular text-primary cursor-none hover:underline'>
                    Войти
                  </Link>
                </CustomCursor>
              </p>
              
              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Email Input */}
                <Input
                  label="Имя Фамилия"
                  type="text"
                  placeholder="Введите имя и фамилию"
                  value={formData.fullname}
                  onChange={(value) => handleInputChange('fullname', value)}
                  error={errors.email}
                />
                <Input
                  label="Электронная почта"
                  type="email"
                  placeholder="Введите электронную почту"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  error={errors.email}
                  required
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
                  required
                  validation={{
                    required: true,
                    minLength: 6,
                    custom: validatePassword,
                  }}
                />

                {/* Terms Checkbox */}
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={(checked) => handleInputChange('agreeToTerms', checked)}
                  error={errors.agreeToTerms}
                >
                  Я соглашаюсь с{' '}
                  <CustomCursor className='inline-block ml-1'>
                    <Link 
                      href="/privacy-policy" 
                      className="text-primary underline text-[14px] !cursor-none hover:text-primary/80 transition-colors"
                      target="_blank"
                    >
                      политикой конфиденциальности
                    </Link>
                  </CustomCursor>
                </Checkbox>

                {/* Submit Button */}
                <CustomCursor>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="mt-4 !cursor-none"
                  >
                    Создать аккаунт
                  </Button>
                </CustomCursor>
              </form>
            </motion.div>
          ) : (
            <RegistrationSuccess />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default RegistrationPage
