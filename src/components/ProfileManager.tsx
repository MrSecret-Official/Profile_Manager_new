'use client';

import React, { useState } from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { Navigation } from './Navigation';
import { ProfileCard } from './ProfileCard';
import { ProfileForm } from './ProfileForm';
import { ProfileDetail } from './ProfileDetail';
import { SearchAndFilter } from './SearchAndFilter';
import { Settings } from './Settings';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import { useProfiles } from '@/contexts/ProfileContext';
import { Profile, ProfileFormData } from '@/types/profile';
import { cn } from '@/lib/utils';

type ViewMode = 'profiles' | 'search' | 'add' | 'edit' | 'detail' | 'settings';

export function ProfileManager() {
  const {
    profiles,
    addProfile,
    updateProfile,
    deleteProfile,
    settings,
    t
  } = useProfiles();

  const [currentView, setCurrentView] = useState<ViewMode>('profiles');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleAddProfile = (data: ProfileFormData) => {
    addProfile(data);
    setCurrentView('profiles');
  };

  const handleEditProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setCurrentView('edit');
  };

  const handleUpdateProfile = (data: ProfileFormData) => {
    if (selectedProfile) {
      updateProfile(selectedProfile.id, data);
      setSelectedProfile(null);
      setCurrentView('profiles');
    }
  };

  const handleDeleteProfile = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este perfil?')) {
      deleteProfile(id);
      if (currentView === 'detail') {
        setCurrentView('profiles');
      }
      setSelectedProfile(null);
    }
  };

  const handleViewProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setCurrentView('detail');
  };

  const handleCancelForm = () => {
    setSelectedProfile(null);
    setCurrentView('profiles');
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view as ViewMode);
    if (view !== 'edit' && view !== 'detail') {
      setSelectedProfile(null);
    }
  };

  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'frutiger':
        return 'theme-frutiger bg-gradient-to-br from-blue-50 to-green-50 text-gray-900';
      case 'cyberpunk':
        return 'theme-cyberpunk bg-gradient-to-br from-purple-950 via-black to-cyan-950 text-white';
      default:
        return 'theme-default bg-transparent text-white';
    }
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'add':
        return (
          <ProfileForm
            onSubmit={handleAddProfile}
            onCancel={handleCancelForm}
          />
        );

      case 'edit':
        return selectedProfile ? (
          <ProfileForm
            profile={selectedProfile}
            onSubmit={handleUpdateProfile}
            onCancel={handleCancelForm}
          />
        ) : null;

      case 'detail':
        return selectedProfile ? (
          <ProfileDetail
            profile={selectedProfile}
            onBack={() => setCurrentView('profiles')}
            onEdit={handleEditProfile}
            onDelete={handleDeleteProfile}
          />
        ) : null;

      case 'search':
        return (
          <SearchAndFilter
            profiles={profiles}
            onEditProfile={handleEditProfile}
            onDeleteProfile={handleDeleteProfile}
            onViewProfile={handleViewProfile}
          />
        );

      case 'settings':
        return <Settings />;

      case 'profiles':
      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className={cn(
                  "text-3xl font-bold mb-2 readable-text",
                  settings.theme === 'frutiger' && "text-gray-800"
                )}>
                  {t.profile.myProfiles}
                </h1>
                <p className={cn(
                  settings.theme === 'default' && "text-gray-400",
                  settings.theme === 'frutiger' && "text-gray-600",
                  settings.theme === 'cyberpunk' && "text-gray-400"
                )}>
                  {profiles.length === 0
                    ? 'No tienes perfiles guardados aún'
                    : `${profiles.length} perfil${profiles.length !== 1 ? 'es' : ''} guardado${profiles.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
              <Button
                onClick={() => setCurrentView('add')}
                className={cn(
                  "transition-all duration-300 hover:scale-105",
                  settings.theme === 'default' && "bg-white/20 hover:bg-white/30",
                  settings.theme === 'frutiger' && "button-vista",
                  settings.theme === 'cyberpunk' && "neon-glow border-neon-pink"
                )}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t.profile.newProfile}
              </Button>
            </div>

            {/* Profiles Grid or Empty State */}
            {profiles.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {profiles
                  .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                  .map(profile => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      onEdit={handleEditProfile}
                      onDelete={handleDeleteProfile}
                      onView={handleViewProfile}
                    />
                  ))}
              </div>
            ) : (
              <Card className={cn(
                "glass border-gray-600/50",
                settings.theme === 'frutiger' && "theme-frutiger",
                settings.theme === 'cyberpunk' && "theme-cyberpunk"
              )}>
                <CardContent className="py-16 text-center">
                  <div className="mb-6">
                    <Users className={cn(
                      "w-16 h-16 mx-auto mb-4",
                      settings.theme === 'default' && "text-gray-400",
                      settings.theme === 'frutiger' && "text-blue-400",
                      settings.theme === 'cyberpunk' && "text-cyan-400"
                    )} />
                    <h3 className={cn(
                      "text-xl font-semibold mb-2 readable-text",
                      settings.theme === 'frutiger' && "text-gray-800"
                    )}>
                      ¡Bienvenido a Profile Manager!
                    </h3>
                    <p className={cn(
                      "max-w-md mx-auto",
                      settings.theme === 'default' && "text-gray-400",
                      settings.theme === 'frutiger' && "text-gray-600",
                      settings.theme === 'cyberpunk' && "text-gray-400"
                    )}>
                      Comienza creando tu primer perfil para organizar y analizar
                      información sobre las personas que conoces.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => setCurrentView('add')}
                      className={cn(
                        "transition-all duration-300 hover:scale-105",
                        settings.theme === 'default' && "bg-white/20 hover:bg-white/30",
                        settings.theme === 'frutiger' && "button-vista",
                        settings.theme === 'cyberpunk' && "neon-glow border-neon-pink"
                      )}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Crear mi primer perfil
                    </Button>

                    <div className={cn(
                      "text-sm",
                      settings.theme === 'default' && "text-gray-500",
                      settings.theme === 'frutiger' && "text-gray-500",
                      settings.theme === 'cyberpunk' && "text-gray-500"
                    )}>
                      Tip: Usa el sistema de valoración y puntos para mantener
                      un registro detallado de cada persona
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
    }
  };

  return (
    <div className={cn(
      'min-h-screen transition-all duration-500 ease-in-out',
      getThemeClasses()
    )}>
      {/* Animated Background - only for default theme or when custom settings apply */}
      {settings.theme === 'default' && (
        <AnimatedBackground backgroundSettings={settings.backgroundSettings} />
      )}

      {/* Theme-specific backgrounds */}
      {settings.theme === 'frutiger' && (
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-green-100" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          {/* Glass overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-transparent to-green-200/20" />
        </div>
      )}

      {settings.theme === 'cyberpunk' && (
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-cyan-950" />
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff0080' fill-opacity='0.05'%3E%3Crect x='0' y='0' width='1' height='1'/%3E%3C/g%3E%3C/svg%3E")`
          }} />

          {/* Neon glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      )}

      {/* Navigation */}
      <Navigation
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8">
          <div className="animate-in fade-in duration-500">
            {renderMainContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
