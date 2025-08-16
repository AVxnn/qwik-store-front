"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Notification, { NotificationType } from './Notification';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
  autoClose?: boolean;
}

interface NotificationContainerProps {
  notifications: NotificationItem[];
  onClose: (id: string) => void;
  maxNotifications?: number;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onClose,
  maxNotifications = 3,
}) => {
  // Ограничиваем количество уведомлений
  const visibleNotifications = notifications.slice(0, maxNotifications);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <div className="flex flex-col gap-3 items-center">
        <AnimatePresence mode="popLayout">
          {visibleNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 1,
                delay: index * 0.1
              }}
              className="pointer-events-auto"
            >
              <Notification
                {...notification}
                onClose={onClose}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationContainer;
