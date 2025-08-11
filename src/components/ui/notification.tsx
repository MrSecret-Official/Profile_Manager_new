'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Notification } from '@/types/profile';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration || 5000,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll,
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

interface NotificationCardProps {
  notification: Notification;
  onClose: () => void;
}

function NotificationCard({ notification, onClose }: NotificationCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getThemeClasses = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-950/90 border-green-500/50';
      case 'error':
        return 'bg-red-950/90 border-red-500/50';
      case 'warning':
        return 'bg-yellow-950/90 border-yellow-500/50';
      default:
        return 'bg-blue-950/90 border-blue-500/50';
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <Card
      className={cn(
        'backdrop-blur-xl border transition-all duration-300 transform',
        getThemeClasses(),
        isVisible
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white mb-1">
              {notification.title}
            </h4>
            <p className="text-sm text-gray-300">
              {notification.message}
            </p>

            {notification.actions && notification.actions.length > 0 && (
              <div className="flex gap-2 mt-3">
                {notification.actions.map((action, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      action.action();
                      handleClose();
                    }}
                    className="text-xs bg-white/10 hover:bg-white/20 border-white/20"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleClose}
            className="text-gray-400 hover:text-white p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
