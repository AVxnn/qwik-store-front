"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/UI/Button';
import Input from '@/UI/Input';
import ThemeToggle from '@/UI/ThemeToggle';
import { useAuthStore } from '@/hooks/useAuthStore';
import { ProfileDropdown } from '@/components/ProfileDropdown';

const DashboardHeader: React.FC = () => {
  const { user } = useAuthStore();
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-[92px] flex items-center justify-between"
    >
      {/* Left Section - Greeting */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center"
      >
        <h1 className="text-white text-[20px] font-regular">
          Добрый день,{' '}
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-primary"
          >
            {user?.name}
          </motion.span>
        </h1>
      </motion.div>

      {/* Right Section - Notifications, Demo, Profile */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex items-center gap-4"
      >
        {/* Search Input */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Input
            placeholder="Поиск по магазину"
            variant="landing"
            leftIcon={
              <svg 
                className="w-5 h-5 text-muted" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            }
            className="!bg-surface rounded-[16px] !w-[320px]"
          />
        </motion.div>

        {/* Notification Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 0.4, type: "spring", stiffness: 200 }}
        >
            <Button
              variant="landing"
              size="sm"
              className="!p-3 !w-[44px] !h-[44px] relative"
            >
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v4.5l2.5 2.5H2.5L5 14.25V9.75a6 6 0 0 1 6-6z" 
                />
              </svg>
              {/* Notification Badge */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.3, type: "spring", stiffness: 300 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              />
            </Button>
        </motion.div><motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 0.4, type: "spring", stiffness: 200 }}
        >
            <ThemeToggle />
        </motion.div>

        {/* Demo Button */}
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, type: "spring", stiffness: 200 }}
        >
            <Button
              variant="landing"
              size="sm"
              className="!px-4 !py-3 !h-[44px] flex items-center gap-2"
            >
              <svg 
                className="w-4 h-4 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                />
              </svg>
              <span className="text-white text-[14px] font-regular">Demo</span>
            </Button>
        </motion.div>

        {/* Profile Dropdown */}
        <motion.div 
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.7, duration: 0.4, type: "spring", stiffness: 200 }}
        >
          <ProfileDropdown />
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default DashboardHeader;
