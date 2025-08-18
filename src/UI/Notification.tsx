"use client"

import React from 'react';
import { motion } from 'framer-motion';
import BellIcon from '../../public/icons/BellIcon';
import CheckIcon from '../../public/icons/CheckIcon';
import CloseIcon from '../../public/icons/CloseIcon';

// Типы для уведомлений
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationProps {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
  autoClose?: boolean;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  message,
  duration = 5000,
  onClose,
  autoClose = true,
}) => {
  React.useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose, autoClose]);

  // Конфигурация для разных типов уведомлений
  const notificationConfig = {
    info: {
      bgColor: 'bg-white',
      icon: <BellIcon className="w-5 h-5 text-[#FFAA32]" />,
      borderColor: 'bg-[#FFAA32]',
    },
    success: {
      bgColor: 'bg-white',
      icon: <CheckIcon className="w-5 h-5 text-primary" />,
      borderColor: 'bg-primary',
    },
    warning: {
      bgColor: 'bg-white',
      icon: <BellIcon className="w-5 h-5 text-[#FFAA32]" />,
      borderColor: 'bg-[#FFAA32]',
    },
    error: {
      bgColor: 'bg-white',
      icon: <CloseIcon className="w-5 h-5 text-[#FF6363]" />,
      borderColor: 'bg-[#FF6363]',
    },
  };

  const config = notificationConfig[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 1
      }}
      className={`
        relative flex items-center gap-3 px-4 py-3 rounded-[12px] 
        ${config.borderColor} shadow-lg overflow-hidden
        min-w-[400px] max-w-[420px] backdrop-blur-sm
      `}
    >
      {/* Icon Container */}
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-full ${config.bgColor} 
        flex items-center justify-center
      `}>
        {config.icon}
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium leading-relaxed">
          {message}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => onClose(id)}
        className="
          flex-shrink-0 w-6 h-6 rounded-full bg-white/10 
          hover:bg-white/20 transition-colors duration-200
          flex items-center justify-center cursor-pointer
        "
        aria-label="Закрыть уведомление"
      >
        <CloseIcon className="w-4 h-4 text-white" />
      </button>

      {/* Progress Bar */}
      {autoClose && duration > 0 && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/20 rounded-b-[12px]"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

export default Notification;
