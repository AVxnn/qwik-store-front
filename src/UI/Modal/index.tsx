"use client"

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'md',
  showCloseButton = true
}) => {
  // Блокируем скролл при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Обработчик клика по оверлею
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Обработчик клавиши Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Размеры модального окна
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-[460px]',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center min-h-[600px]:p-4 bg-black/50 backdrop-blur-sm sm:p-4 p-0"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className={`w-full ${sizeClasses[size]} bg-surface rounded-[20px] shadow-2xl overflow-hidden sm:rounded-[20px] sm:shadow-2xl sm:max-w-[460px] sm:min-h-[460px] sm:h-auto h-screen sm:w-screen max-w-none rounded-none shadow-none`}
          >
            {/* Header */}
            {(title || showCloseButton || description) && (
              <div className="flex items-center justify-between p-6 sm:p-6 p-4">
                {showCloseButton ? (<>
                {title && (
                  <h2 className={`text-white ${showCloseButton ? 'text-left' : 'text-center w-full'} font-regular`}>{title}</h2>
                )}
                {description && (
                  <p className={`text-white ${showCloseButton ? 'text-left' : 'text-center w-full'} font-regular text-[14px]`}>{description}</p>
                )}
              </>) : (<div className='flex w-full flex-col items-center justify-center'>
                {title && (
                  <h2 className={`text-white ${showCloseButton ? 'text-left' : 'text-center w-full'} font-regular text-[32px]`}>{title}</h2>
                )}
                {description && (
                  <p className={`text-white ${showCloseButton ? 'text-left' : 'text-center w-full'} font-regular text-[14px]`}>{description}</p>
                )}
              </div>)}
              
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="h-fit py-0 sm:p-6 sm:py-0 p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Рендерим через портал для правильного позиционирования
  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default Modal;
