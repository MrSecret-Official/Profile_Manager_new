'use client';

import React, { useState } from 'react';
import { Users, Search, Settings, Plus, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: 'profiles',
      icon: Users,
      label: 'Perfiles',
      description: 'Gestionar perfiles de personas'
    },
    {
      id: 'search',
      icon: Search,
      label: 'Buscador',
      description: 'Buscar y filtrar perfiles'
    },
    {
      id: 'add',
      icon: Plus,
      label: 'Añadir Perfil',
      description: 'Crear un nuevo perfil'
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Ajustes',
      description: 'Configuración y temas'
    },
  ];

  const handleItemClick = (id: string) => {
    onViewChange(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-black/20 backdrop-blur-sm border-gray-600 hover:bg-black/30 transition-all duration-300"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-full w-64 transform transition-all duration-300 ease-in-out',
          'bg-black/30 backdrop-blur-xl border-r border-gray-700/50',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-8 text-center">
            Profile Manager
          </h1>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    'w-full text-left p-4 rounded-lg transition-all duration-300',
                    'hover:bg-white/10 hover:scale-105 hover:shadow-lg',
                    'focus:outline-none focus:ring-2 focus:ring-white/20',
                    'group relative overflow-hidden',
                    isActive && 'bg-white/20 shadow-xl scale-105'
                  )}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <Icon
                      className={cn(
                        'w-5 h-5 transition-all duration-300',
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      )}
                    />
                    <div>
                      <div
                        className={cn(
                          'font-medium transition-colors duration-300',
                          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        )}
                      >
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
