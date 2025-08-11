'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile, ProfileFormData, Theme, AppSettings, Language, BackgroundSettings } from '@/types/profile';
import { useNotifications } from '@/components/ui/notification';
import { useTranslation } from '@/lib/i18n';

interface ProfileContextType {
  profiles: Profile[];
  settings: AppSettings;
  addProfile: (data: ProfileFormData) => void;
  updateProfile: (id: string, data: ProfileFormData) => void;
  deleteProfile: (id: string) => void;
  getProfile: (id: string) => Profile | undefined;
  searchProfiles: (query: string) => Profile[];
  filterProfiles: (feeling?: string, minRating?: number) => Profile[];
  updateTheme: (theme: Theme) => void;
  updateLanguage: (language: Language) => void;
  updateBackgroundSettings: (settings: Partial<BackgroundSettings>) => void;
  updateCustomThemes: (enabled: boolean) => void;
  t: ReturnType<typeof useTranslation>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'default',
    language: 'es',
    backgroundSettings: {
      rainEnabled: true,
      useDefaultRain: true
    },
    customThemes: false
  });

  const { addNotification } = useNotifications();
  const t = useTranslation(settings.language);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('profile-manager-profiles');
    const savedSettings = localStorage.getItem('profile-manager-settings');

    if (savedProfiles) {
      try {
        const parsed = JSON.parse(savedProfiles);
        // Convert date strings back to Date objects
        const profilesWithDates = parsed.map((profile: Omit<Profile, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt: string }) => ({
          ...profile,
          createdAt: new Date(profile.createdAt),
          updatedAt: new Date(profile.updatedAt),
        }));
        setProfiles(profilesWithDates);
      } catch (error) {
        console.error('Error loading profiles:', error);
      }
    }

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        // Migrate old settings format
        const migratedSettings: AppSettings = {
          theme: parsed.theme || 'default',
          language: parsed.language || 'es',
          backgroundSettings: parsed.backgroundSettings || {
            rainEnabled: true,
            useDefaultRain: true
          },
          customThemes: parsed.customThemes || false
        };
        setSettings(migratedSettings);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('profile-manager-profiles', JSON.stringify(profiles));
  }, [profiles]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('profile-manager-settings', JSON.stringify(settings));
  }, [settings]);

  const addProfile = (data: ProfileFormData) => {
    const newProfile: Profile = {
      ...data,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProfiles(prev => [...prev, newProfile]);
  };

  const updateProfile = (id: string, data: ProfileFormData) => {
    setProfiles(prev => prev.map(profile =>
      profile.id === id
        ? { ...profile, ...data, updatedAt: new Date() }
        : profile
    ));
  };

  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id));
  };

  const getProfile = (id: string) => {
    return profiles.find(profile => profile.id === id);
  };

  const searchProfiles = (query: string) => {
    if (!query.trim()) return profiles;

    const lowercaseQuery = query.toLowerCase();
    return profiles.filter(profile =>
      profile.name.toLowerCase().includes(lowercaseQuery) ||
      profile.observations.toLowerCase().includes(lowercaseQuery) ||
      profile.positivePoints.some(point => point.toLowerCase().includes(lowercaseQuery)) ||
      profile.negativePoints.some(point => point.toLowerCase().includes(lowercaseQuery)) ||
      profile.interestingPoints.some(point => point.toLowerCase().includes(lowercaseQuery))
    );
  };

  const filterProfiles = (feeling?: string, minRating?: number) => {
    return profiles.filter(profile => {
      if (feeling && profile.feeling !== feeling) return false;
      if (minRating && profile.rating < minRating) return false;
      return true;
    });
  };

  const updateTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));

    // Show theme customization notification for first-time users
    if (!settings.customThemes) {
      addNotification({
        type: 'info',
        title: t.notifications.themeCustomization.title,
        message: t.notifications.themeCustomization.message,
        duration: 8000,
        actions: [
          {
            label: t.notifications.themeCustomization.useDefault,
            action: () => updateCustomThemes(false)
          },
          {
            label: t.notifications.themeCustomization.useCustom,
            action: () => updateCustomThemes(true)
          }
        ]
      });
    }
  };

  const updateLanguage = (language: Language) => {
    setSettings(prev => ({ ...prev, language }));
    addNotification({
      type: 'success',
      title: t.common.success,
      message: t.notifications.languageChanged
    });
  };

  const updateBackgroundSettings = (newSettings: Partial<BackgroundSettings>) => {
    setSettings(prev => ({
      ...prev,
      backgroundSettings: {
        ...prev.backgroundSettings,
        ...newSettings
      }
    }));

    addNotification({
      type: 'success',
      title: t.common.success,
      message: t.notifications.backgroundChanged
    });
  };

  const updateCustomThemes = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, customThemes: enabled }));
  };

  return (
    <ProfileContext.Provider value={{
      profiles,
      settings,
      addProfile,
      updateProfile,
      deleteProfile,
      getProfile,
      searchProfiles,
      filterProfiles,
      updateTheme,
      updateLanguage,
      updateBackgroundSettings,
      updateCustomThemes,
      t,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfiles() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
}
