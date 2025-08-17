"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/hooks/useAuthStore';
import Link from 'next/link';

export const ProfileDropdown = () => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие дропдауна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  interface MenuItem {
    icon: React.ReactNode;
    label: string;
    href: string;
    external?: boolean;
  }

  const menuItems: MenuItem[] = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: 'Перейти в профиль',
      href: '/dashboard/profile',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Настройки',
      href: '/settings',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: 'Подписки',
      href: '/subscriptions',
    },
  ];

  const supportItems: MenuItem[] = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      ),
      label: 'Поддержка',
      href: '/support',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      label: 'Наш телеграм канал',
      href: 'https://t.me/yourchannel',
      external: true,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Кнопка аватара */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-[44px] h-[44px] rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-200 hover:border-primary/50"
      >
        {user?.avatarUrl ? (
          <img 
            src={user.avatarUrl} 
            alt={user.name || 'Avatar'} 
            className="w-full h-full object-cover"
          />
        ) : user?.name ? (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : (
          <svg 
            className="w-6 h-6 text-primary" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        )}
      </motion.button>

      {/* Дропдаун */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              y: -10,
              transformOrigin: "top right"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transformOrigin: "top right"
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: -10,
              transformOrigin: "top right"
            }}
            transition={{ 
              duration: 0.2, 
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="absolute right-0 top-full mt-2 w-80 bg-background rounded-[24px] shadow-2xl border border-gray-700/50 overflow-hidden z-50"
          >
            {/* Заголовок с информацией о пользователе */}
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                  {user?.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name || 'Avatar'} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-base truncate">
                    {user?.name || 'Пользователь'}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
            </div>

            {/* Основные пункты меню */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-3 text-white hover:bg-surface transition-colors duration-150"
                    >
                      <span className="mr-3 text-gray-400">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-3 text-white hover:bg-gray-700/50 transition-colors duration-150"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-3 text-gray-400">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Разделитель */}
            <div className="border-t border-gray-700/50"></div>

            {/* Пункты поддержки */}
            <div className="py-2">
              {supportItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + menuItems.length) * 0.05 }}
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-3 text-white hover:bg-gray-700/50 transition-colors duration-150"
                    >
                      <span className="mr-3 text-gray-400">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-3 text-white hover:bg-gray-700/50 transition-colors duration-150"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-3 text-gray-400">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Разделитель */}
            <div className="border-t border-gray-700/50"></div>

            {/* Кнопка выхода */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (menuItems.length + supportItems.length) * 0.05 }}
              className="py-2"
            >
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-white hover:bg-red-500/20 transition-colors duration-150 cursor-pointer"
              >
                <span className="mr-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
                <span className="text-sm">Выйти</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
