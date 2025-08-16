"use client"

import React, { createContext, useContext, useState, useCallback } from 'react';
import NotificationContainer, { NotificationItem } from '@/UI/NotificationContainer';

interface NotificationContextType {
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  showInfo: (message: string, options?: Partial<NotificationItem>) => void;
  showSuccess: (message: string, options?: Partial<NotificationItem>) => void;
  showWarning: (message: string, options?: Partial<NotificationItem>) => void;
  showError: (message: string, options?: Partial<NotificationItem>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
  maxNotifications?: number;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  maxNotifications = 3,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = useCallback((notification: Omit<NotificationItem, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: NotificationItem = {
      id,
      ...notification,
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      // Ограничиваем количество уведомлений
      return updated.slice(0, maxNotifications);
    });
  }, [maxNotifications]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const showInfo = useCallback((message: string, options: Partial<NotificationItem> = {}) => {
    addNotification({
      type: 'info',
      message,
      duration: 5000,
      autoClose: true,
      ...options,
    });
  }, [addNotification]);

  const showSuccess = useCallback((message: string, options: Partial<NotificationItem> = {}) => {
    addNotification({
      type: 'success',
      message,
      duration: 4000,
      autoClose: true,
      ...options,
    });
  }, [addNotification]);

  const showWarning = useCallback((message: string, options: Partial<NotificationItem> = {}) => {
    addNotification({
      type: 'warning',
      message,
      duration: 6000,
      autoClose: true,
      ...options,
    });
  }, [addNotification]);

  const showError = useCallback((message: string, options: Partial<NotificationItem> = {}) => {
    addNotification({
      type: 'error',
      message,
      duration: 7000,
      autoClose: true,
      ...options,
    });
  }, [addNotification]);

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showInfo,
    showSuccess,
    showWarning,
    showError,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
        maxNotifications={maxNotifications}
      />
    </NotificationContext.Provider>
  );
};

export default useNotifications;
