"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/UI/Button';
import CustomCursor from '@/UI/CustomCursor';
import { useRouter } from 'next/navigation';
import { authStore } from '@/stores/authStore';

const RegistrationSuccess: React.FC = () => {
  const router = useRouter();

  const handleDashboardClick = () => {
    authStore.isAuthenticated = true;
  };

  const handleCreateStoreClick = () => {
    authStore.isAuthenticated = true;
    router.push('/dashboard?create=true');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="w-full h-fit max-w-[460px] bg-surface rounded-[24px] p-8"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6"
      >
        <svg 
          className="w-8 h-8 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[32px] font-regular text-center text-white mb-4"
      >
        Аккаунт создан!
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[14px] font-regular text-center text-muted leading-relaxed mb-8"
      >
        Теперь вы можете создать магазин и открыть еще одну точку продаж, 
        либо можете перейти в дашборд и поизучать интерфейс
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <CustomCursor>
          <Button
            variant="landing"
            size="lg"
            fullWidth
            onClick={handleDashboardClick}
            className="!cursor-none"
          >
            Перейти в дашборд
          </Button>
        </CustomCursor>

        <CustomCursor>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleCreateStoreClick}
            className="!cursor-none"
          >
            Создать магазин
          </Button>
        </CustomCursor>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationSuccess;
