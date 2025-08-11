'use client';

import React, { useRef } from 'react';
import { Settings as SettingsIcon, Palette, Monitor, Zap, Cpu, Globe, Image, Cloud, Upload, X, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useProfiles } from '@/contexts/ProfileContext';
import { Theme, Language } from '@/types/profile';
import { cn } from '@/lib/utils';

export function Settings() {
  const {
    settings,
    updateTheme,
    updateLanguage,
    updateBackgroundSettings,
    profiles,
    t
  } = useProfiles();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const themes = [
    {
      id: 'default' as Theme,
      name: t.themes.default,
      description: t.themes.descriptions.default,
      icon: Monitor,
      colors: ['#2a2a2a', '#1a1a1a', '#0a0a0a'],
      preview: 'bg-gradient-to-br from-gray-800 to-gray-900'
    },
    {
      id: 'frutiger' as Theme,
      name: t.themes.frutiger,
      description: t.themes.descriptions.frutiger,
      icon: Palette,
      colors: ['#e6f3ff', '#b3d9ff', '#4da6ff'],
      preview: 'bg-gradient-to-br from-blue-100 to-green-100'
    },
    {
      id: 'cyberpunk' as Theme,
      name: t.themes.cyberpunk,
      description: t.themes.descriptions.cyberpunk,
      icon: Zap,
      colors: ['#0a0a0a', '#ff0080', '#00ffff'],
      preview: 'bg-gradient-to-br from-purple-900 via-pink-900 to-cyan-900'
    }
  ];

  const languages = [
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'pl' as Language, name: 'Polski', flag: '🇵🇱' },
    { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
    { code: 'uk' as Language, name: 'Українська', flag: '🇺🇦' },
    { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' }
  ];

  const handleThemeChange = (theme: Theme) => {
    updateTheme(theme);
  };

  const handleLanguageChange = (language: Language) => {
    updateLanguage(language);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateBackgroundSettings({ customImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    updateBackgroundSettings({ customImage: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRainToggle = (enabled: boolean) => {
    updateBackgroundSettings({ rainEnabled: enabled });
  };

  const handleDefaultRainToggle = (enabled: boolean) => {
    updateBackgroundSettings({ useDefaultRain: enabled });
  };

  const getStats = () => {
    const totalProfiles = profiles.length;
    const goodProfiles = profiles.filter(p => p.feeling === 'good').length;
    const badProfiles = profiles.filter(p => p.feeling === 'bad').length;
    const averageRating = totalProfiles > 0
      ? (profiles.reduce((sum, p) => sum + p.rating, 0) / totalProfiles).toFixed(1)
      : '0.0';

    return { totalProfiles, goodProfiles, badProfiles, averageRating };
  };

  const stats = getStats();
  const currentLanguage = languages.find(lang => lang.code === settings.language);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className={cn(
        "glass border-gray-600/50",
        settings.theme === 'frutiger' && "theme-frutiger",
        settings.theme === 'cyberpunk' && "theme-cyberpunk"
      )}>
        <CardHeader>
          <CardTitle className={cn(
            "flex items-center gap-2 readable-text",
            settings.theme === 'frutiger' && "text-gray-800",
            settings.theme === 'cyberpunk' && "neon-text"
          )}>
            <SettingsIcon className="w-5 h-5" />
            {t.settings.title}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Language Selection */}
      <Card className={cn(
        "glass border-gray-600/50",
        settings.theme === 'frutiger' && "theme-frutiger",
        settings.theme === 'cyberpunk' && "theme-cyberpunk"
      )}>
        <CardHeader>
          <CardTitle className={cn(
            "flex items-center gap-2 readable-text",
            settings.theme === 'frutiger' && "text-gray-800",
            settings.theme === 'cyberpunk' && "neon-text"
          )}>
            <Globe className="w-5 h-5" />
            {t.settings.language}
            {currentLanguage && (
              <Badge variant="outline" className={cn(
                "bg-blue-500/20 text-blue-300 border-blue-500/30",
                settings.theme === 'frutiger' && "bg-blue-100 text-blue-800 border-blue-300"
              )}>
                {currentLanguage.flag} {currentLanguage.name}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {languages.map((language) => (
              <Button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                variant={settings.language === language.code ? "default" : "outline"}
                className={cn(
                  "justify-start transition-all duration-300",
                  settings.theme === 'frutiger' && "button-vista",
                  settings.theme === 'cyberpunk' && settings.language === language.code && "neon-glow",
                  settings.language === language.code
                    ? "bg-white/20 hover:bg-white/30"
                    : "border-gray-600 hover:bg-white/10 hover:scale-105"
                )}
              >
                <span className="text-lg mr-2">{language.flag}</span>
                {language.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Background Settings */}
      <Card className={cn(
        "glass border-gray-600/50",
        settings.theme === 'frutiger' && "theme-frutiger",
        settings.theme === 'cyberpunk' && "theme-cyberpunk"
      )}>
        <CardHeader>
          <CardTitle className={cn(
            "flex items-center gap-2 readable-text",
            settings.theme === 'frutiger' && "text-gray-800",
            settings.theme === 'cyberpunk' && "neon-text"
          )}>
            <Image className="w-5 h-5" />
            {t.settings.background}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Custom Background Image */}
          <div className="space-y-3">
            <Label className={cn(
              "text-sm font-medium readable-text",
              settings.theme === 'frutiger' && "text-gray-700"
            )}>
              {t.settings.customBackground}
            </Label>
            <div className="flex gap-3">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "flex-1",
                  settings.theme === 'frutiger' && "button-vista",
                  settings.theme === 'cyberpunk' && "border-neon-pink text-neon-cyan"
                )}
                variant="outline"
              >
                <Upload className="w-4 h-4 mr-2" />
                {t.settings.uploadImage}
              </Button>
              {settings.backgroundSettings.customImage && (
                <Button
                  onClick={handleRemoveImage}
                  variant="outline"
                  className={cn(
                    "text-red-400 border-red-400 hover:bg-red-500/10",
                    settings.theme === 'frutiger' && "text-red-600 border-red-400"
                  )}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {settings.backgroundSettings.customImage && (
              <div className="mt-3 p-3 rounded-lg border border-gray-600/30 bg-black/20">
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <Download className="w-4 h-4" />
                  Imagen personalizada cargada
                </div>
              </div>
            )}
          </div>

          {/* Rain Effects */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className={cn(
                  "text-sm font-medium readable-text",
                  settings.theme === 'frutiger' && "text-gray-700"
                )}>
                  {t.settings.rainEffect}
                </Label>
                <p className={cn(
                  "text-xs text-gray-400",
                  settings.theme === 'frutiger' && "text-gray-600"
                )}>
                  Activar o desactivar el efecto de lluvia animada
                </p>
              </div>
              <Switch
                checked={settings.backgroundSettings.rainEnabled}
                onCheckedChange={handleRainToggle}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className={cn(
                  "text-sm font-medium readable-text",
                  settings.theme === 'frutiger' && "text-gray-700"
                )}>
                  {t.settings.defaultRain}
                </Label>
                <p className={cn(
                  "text-xs text-gray-400",
                  settings.theme === 'frutiger' && "text-gray-600"
                )}>
                  Usar fondo de lluvia predeterminado
                </p>
              </div>
              <Switch
                checked={settings.backgroundSettings.useDefaultRain}
                onCheckedChange={handleDefaultRainToggle}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className={cn(
        "glass border-gray-600/50",
        settings.theme === 'frutiger' && "theme-frutiger",
        settings.theme === 'cyberpunk' && "theme-cyberpunk"
      )}>
        <CardHeader>
          <CardTitle className={cn(
            "flex items-center gap-2 readable-text",
            settings.theme === 'frutiger' && "text-gray-800",
            settings.theme === 'cyberpunk' && "neon-text"
          )}>
            <Cpu className="w-5 h-5" />
            {t.settings.statistics}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={cn(
              "text-center p-4 rounded-lg border",
              settings.theme === 'default' && "bg-white/5 border-gray-600/30",
              settings.theme === 'frutiger' && "bg-blue-50 border-blue-200",
              settings.theme === 'cyberpunk' && "bg-black/20 border-gray-600/30"
            )}>
              <div className={cn(
                "text-2xl font-bold readable-text",
                settings.theme === 'frutiger' && "text-blue-800"
              )}>
                {stats.totalProfiles}
              </div>
              <div className={cn(
                "text-sm",
                settings.theme === 'default' && "text-gray-400",
                settings.theme === 'frutiger' && "text-gray-600",
                settings.theme === 'cyberpunk' && "text-gray-400"
              )}>
                {t.settings.totalProfiles}
              </div>
            </div>
            <div className={cn(
              "text-center p-4 rounded-lg border",
              settings.theme === 'default' && "bg-green-500/10 border-green-500/30",
              settings.theme === 'frutiger' && "bg-green-50 border-green-200",
              settings.theme === 'cyberpunk' && "bg-green-500/10 border-green-500/30"
            )}>
              <div className={cn(
                "text-2xl font-bold",
                settings.theme === 'default' && "text-green-300",
                settings.theme === 'frutiger' && "text-green-800",
                settings.theme === 'cyberpunk' && "text-green-300"
              )}>
                {stats.goodProfiles}
              </div>
              <div className={cn(
                "text-sm",
                settings.theme === 'default' && "text-gray-400",
                settings.theme === 'frutiger' && "text-gray-600",
                settings.theme === 'cyberpunk' && "text-gray-400"
              )}>
                {t.settings.goodProfiles}
              </div>
            </div>
            <div className={cn(
              "text-center p-4 rounded-lg border",
              settings.theme === 'default' && "bg-red-500/10 border-red-500/30",
              settings.theme === 'frutiger' && "bg-red-50 border-red-200",
              settings.theme === 'cyberpunk' && "bg-red-500/10 border-red-500/30"
            )}>
              <div className={cn(
                "text-2xl font-bold",
                settings.theme === 'default' && "text-red-300",
                settings.theme === 'frutiger' && "text-red-800",
                settings.theme === 'cyberpunk' && "text-red-300"
              )}>
                {stats.badProfiles}
              </div>
              <div className={cn(
                "text-sm",
                settings.theme === 'default' && "text-gray-400",
                settings.theme === 'frutiger' && "text-gray-600",
                settings.theme === 'cyberpunk' && "text-gray-400"
              )}>
                {t.settings.badProfiles}
              </div>
            </div>
            <div className={cn(
              "text-center p-4 rounded-lg border",
              settings.theme === 'default' && "bg-yellow-500/10 border-yellow-500/30",
              settings.theme === 'frutiger' && "bg-yellow-50 border-yellow-200",
              settings.theme === 'cyberpunk' && "bg-yellow-500/10 border-yellow-500/30"
            )}>
              <div className={cn(
                "text-2xl font-bold",
                settings.theme === 'default' && "text-yellow-300",
                settings.theme === 'frutiger' && "text-yellow-800",
                settings.theme === 'cyberpunk' && "text-yellow-300"
              )}>
                {stats.averageRating}
              </div>
              <div className={cn(
                "text-sm",
                settings.theme === 'default' && "text-gray-400",
                settings.theme === 'frutiger' && "text-gray-600",
                settings.theme === 'cyberpunk' && "text-gray-400"
              )}>
                {t.settings.averageRating}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Selection */}
      <Card className={cn(
        "glass border-gray-600/50",
        settings.theme === 'frutiger' && "theme-frutiger",
        settings.theme === 'cyberpunk' && "theme-cyberpunk"
      )}>
        <CardHeader>
          <CardTitle className={cn(
            "flex items-center gap-2 readable-text",
            settings.theme === 'frutiger' && "text-gray-800",
            settings.theme === 'cyberpunk' && "neon-text"
          )}>
            <Palette className="w-5 h-5" />
            {t.settings.theme}
            <Badge variant="outline" className={cn(
              "bg-blue-500/20 text-blue-300 border-blue-500/30",
              settings.theme === 'frutiger' && "bg-blue-100 text-blue-800 border-blue-300"
            )}>
              {t.settings.currentTheme}: {themes.find(t => t.id === settings.theme)?.name}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isActive = settings.theme === theme.id;

              return (
                <div
                  key={theme.id}
                  className={cn(
                    'relative overflow-hidden rounded-lg border-2 transition-all duration-300 cursor-pointer group',
                    'hover:scale-105 hover:shadow-xl',
                    settings.theme === 'frutiger' && 'hover:shadow-blue-200/50',
                    settings.theme === 'cyberpunk' && 'hover:shadow-pink-500/20',
                    isActive
                      ? cn(
                          'border-white/50',
                          settings.theme === 'frutiger' && 'border-blue-400 bg-blue-50',
                          settings.theme === 'cyberpunk' && 'border-pink-500 neon-glow'
                        )
                      : cn(
                          'border-gray-600/50 hover:border-gray-500/70',
                          settings.theme === 'frutiger' && 'border-gray-300 hover:border-blue-300',
                          settings.theme === 'cyberpunk' && 'border-gray-600/50 hover:border-pink-500/50'
                        )
                  )}
                  onClick={() => handleThemeChange(theme.id)}
                >
                  {/* Theme Preview */}
                  <div className={cn('h-24 w-full relative', theme.preview)}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-2 right-2">
                      <Icon className={cn(
                        "w-5 h-5 text-white/80",
                        settings.theme === 'frutiger' && "icon-vista"
                      )} />
                    </div>

                    {/* Color Palette */}
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {theme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-full border border-white/30"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Theme Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={cn(
                        "font-semibold group-hover:text-white transition-colors readable-text",
                        settings.theme === 'frutiger' && "text-gray-800"
                      )}>
                        {theme.name}
                      </h3>
                      {isActive && (
                        <Badge variant="outline" className={cn(
                          "bg-green-500/20 text-green-300 border-green-500/30 text-xs",
                          settings.theme === 'frutiger' && "bg-green-100 text-green-800 border-green-300"
                        )}>
                          {t.settings.activeTheme}
                        </Badge>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm transition-colors",
                      settings.theme === 'default' && "text-gray-400 group-hover:text-gray-300",
                      settings.theme === 'frutiger' && "text-gray-600",
                      settings.theme === 'cyberpunk' && "text-gray-400 group-hover:text-gray-300"
                    )}>
                      {theme.description}
                    </p>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleThemeChange(theme.id);
                      }}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        'w-full mt-3 transition-all duration-300',
                        settings.theme === 'frutiger' && isActive && "button-vista",
                        settings.theme === 'cyberpunk' && isActive && "neon-glow",
                        isActive
                          ? 'bg-white/20 hover:bg-white/30'
                          : 'border-gray-600 hover:bg-white/10 hover:scale-105'
                      )}
                      disabled={isActive}
                    >
                      {isActive ? t.settings.activeTheme : t.settings.applyTheme}
                    </Button>
                  </div>

                  {/* Selection Indicator */}
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-white/20 rounded-lg pointer-events-none">
                      <div className={cn(
                        "absolute top-2 left-2 w-3 h-3 rounded-full animate-pulse",
                        settings.theme === 'cyberpunk' ? "bg-cyan-400" : "bg-green-400"
                      )} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
