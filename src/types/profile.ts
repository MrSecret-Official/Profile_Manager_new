export interface Profile {
  id: string;
  name: string;
  feeling: 'good' | 'bad' | 'neutral';
  rating: number; // 1-5 stars
  positivePoints: string[];
  negativePoints: string[];
  interestingPoints: string[];
  observations: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileFormData {
  name: string;
  feeling: 'good' | 'bad' | 'neutral';
  rating: number;
  positivePoints: string[];
  negativePoints: string[];
  interestingPoints: string[];
  observations: string;
}

export type Theme = 'default' | 'frutiger' | 'cyberpunk';

export type Language = 'es' | 'en' | 'pl' | 'it' | 'uk' | 'ru';

export interface BackgroundSettings {
  customImage?: string;
  rainEnabled: boolean;
  useDefaultRain: boolean;
}

export interface AppSettings {
  theme: Theme;
  language: Language;
  backgroundSettings: BackgroundSettings;
  customThemes: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  actions?: {
    label: string;
    action: () => void;
  }[];
}
