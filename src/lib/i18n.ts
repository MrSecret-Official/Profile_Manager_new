import { Language } from '@/types/profile';

export interface Translations {
  // Navigation and main sections
  nav: {
    profiles: string;
    search: string;
    add: string;
    settings: string;
  };

  // Profile related
  profile: {
    title: string;
    name: string;
    feeling: string;
    rating: string;
    positivePoints: string;
    negativePoints: string;
    interestingPoints: string;
    observations: string;
    createdAt: string;
    updatedAt: string;
    addPoint: string;
    removePoint: string;
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    view: string;
    newProfile: string;
    myProfiles: string;
  };

  // Feelings
  feelings: {
    good: string;
    bad: string;
    neutral: string;
  };

  // Settings
  settings: {
    title: string;
    theme: string;
    language: string;
    background: string;
    statistics: string;
    totalProfiles: string;
    goodProfiles: string;
    badProfiles: string;
    averageRating: string;
    customBackground: string;
    rainEffect: string;
    defaultRain: string;
    uploadImage: string;
    removeImage: string;
    currentTheme: string;
    applyTheme: string;
    activeTheme: string;
  };

  // Themes
  themes: {
    default: string;
    frutiger: string;
    cyberpunk: string;
    descriptions: {
      default: string;
      frutiger: string;
      cyberpunk: string;
    };
  };

  // Notifications
  notifications: {
    themeCustomization: {
      title: string;
      message: string;
      useDefault: string;
      useCustom: string;
    };
    backgroundChanged: string;
    languageChanged: string;
    rainToggled: string;
  };

  // Common
  common: {
    yes: string;
    no: string;
    confirm: string;
    back: string;
    next: string;
    close: string;
    loading: string;
    error: string;
    success: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      profiles: "Perfiles",
      search: "Buscar",
      add: "Añadir",
      settings: "Ajustes"
    },
    profile: {
      title: "Perfil",
      name: "Nombre",
      feeling: "Sentimiento",
      rating: "Valoración",
      positivePoints: "Puntos positivos",
      negativePoints: "Puntos negativos",
      interestingPoints: "Puntos interesantes",
      observations: "Observaciones",
      createdAt: "Creado",
      updatedAt: "Actualizado",
      addPoint: "Añadir punto",
      removePoint: "Eliminar punto",
      save: "Guardar",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Eliminar",
      view: "Ver",
      newProfile: "Nuevo Perfil",
      myProfiles: "Mis Perfiles"
    },
    feelings: {
      good: "Me cae bien",
      bad: "Me cae mal",
      neutral: "Neutral"
    },
    settings: {
      title: "Configuración y Ajustes",
      theme: "Tema",
      language: "Idioma",
      background: "Fondo",
      statistics: "Estadísticas",
      totalProfiles: "Perfiles totales",
      goodProfiles: "Me caen bien",
      badProfiles: "Me caen mal",
      averageRating: "Valoración promedio",
      customBackground: "Fondo personalizado",
      rainEffect: "Efecto lluvia",
      defaultRain: "Lluvia predeterminada",
      uploadImage: "Subir imagen",
      removeImage: "Quitar imagen",
      currentTheme: "Tema actual",
      applyTheme: "Aplicar Tema",
      activeTheme: "Tema Activo"
    },
    themes: {
      default: "Lluvia en el Bosque",
      frutiger: "Frutiger Aero",
      cyberpunk: "Cyberpunk",
      descriptions: {
        default: "Tema por defecto con lluvia y tonos grises",
        frutiger: "Estética limpia y moderna con tonos azules y verdes",
        cyberpunk: "Estilo futurista con neones y colores vibrantes"
      }
    },
    notifications: {
      themeCustomization: {
        title: "Personalización de Tema",
        message: "¿Prefieres usar los temas predeterminados o crear una carpeta de temas personalizados?",
        useDefault: "Usar predeterminados",
        useCustom: "Temas personalizados"
      },
      backgroundChanged: "Fondo actualizado correctamente",
      languageChanged: "Idioma cambiado correctamente",
      rainToggled: "Efecto lluvia actualizado"
    },
    common: {
      yes: "Sí",
      no: "No",
      confirm: "Confirmar",
      back: "Atrás",
      next: "Siguiente",
      close: "Cerrar",
      loading: "Cargando...",
      error: "Error",
      success: "Éxito"
    }
  },

  en: {
    nav: {
      profiles: "Profiles",
      search: "Search",
      add: "Add",
      settings: "Settings"
    },
    profile: {
      title: "Profile",
      name: "Name",
      feeling: "Feeling",
      rating: "Rating",
      positivePoints: "Positive points",
      negativePoints: "Negative points",
      interestingPoints: "Interesting points",
      observations: "Observations",
      createdAt: "Created",
      updatedAt: "Updated",
      addPoint: "Add point",
      removePoint: "Remove point",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      newProfile: "New Profile",
      myProfiles: "My Profiles"
    },
    feelings: {
      good: "I like them",
      bad: "I don't like them",
      neutral: "Neutral"
    },
    settings: {
      title: "Configuration and Settings",
      theme: "Theme",
      language: "Language",
      background: "Background",
      statistics: "Statistics",
      totalProfiles: "Total profiles",
      goodProfiles: "I like them",
      badProfiles: "I don't like them",
      averageRating: "Average rating",
      customBackground: "Custom background",
      rainEffect: "Rain effect",
      defaultRain: "Default rain",
      uploadImage: "Upload image",
      removeImage: "Remove image",
      currentTheme: "Current theme",
      applyTheme: "Apply Theme",
      activeTheme: "Active Theme"
    },
    themes: {
      default: "Rain in the Forest",
      frutiger: "Frutiger Aero",
      cyberpunk: "Cyberpunk",
      descriptions: {
        default: "Default theme with rain and gray tones",
        frutiger: "Clean and modern aesthetic with blue and green tones",
        cyberpunk: "Futuristic style with neons and vibrant colors"
      }
    },
    notifications: {
      themeCustomization: {
        title: "Theme Customization",
        message: "Do you prefer to use default themes or create a custom themes folder?",
        useDefault: "Use defaults",
        useCustom: "Custom themes"
      },
      backgroundChanged: "Background updated successfully",
      languageChanged: "Language changed successfully",
      rainToggled: "Rain effect updated"
    },
    common: {
      yes: "Yes",
      no: "No",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      close: "Close",
      loading: "Loading...",
      error: "Error",
      success: "Success"
    }
  },

  pl: {
    nav: {
      profiles: "Profile",
      search: "Szukaj",
      add: "Dodaj",
      settings: "Ustawienia"
    },
    profile: {
      title: "Profil",
      name: "Imię",
      feeling: "Uczucie",
      rating: "Ocena",
      positivePoints: "Punkty pozytywne",
      negativePoints: "Punkty negatywne",
      interestingPoints: "Punkty interesujące",
      observations: "Obserwacje",
      createdAt: "Utworzono",
      updatedAt: "Zaktualizowano",
      addPoint: "Dodaj punkt",
      removePoint: "Usuń punkt",
      save: "Zapisz",
      cancel: "Anuluj",
      edit: "Edytuj",
      delete: "Usuń",
      view: "Zobacz",
      newProfile: "Nowy Profil",
      myProfiles: "Moje Profile"
    },
    feelings: {
      good: "Lubię ich",
      bad: "Nie lubię ich",
      neutral: "Neutralnie"
    },
    settings: {
      title: "Konfiguracja i Ustawienia",
      theme: "Motyw",
      language: "Język",
      background: "Tło",
      statistics: "Statystyki",
      totalProfiles: "Wszystkie profile",
      goodProfiles: "Lubię ich",
      badProfiles: "Nie lubię ich",
      averageRating: "Średnia ocena",
      customBackground: "Własne tło",
      rainEffect: "Efekt deszczu",
      defaultRain: "Domyślny deszcz",
      uploadImage: "Wgraj obraz",
      removeImage: "Usuń obraz",
      currentTheme: "Aktualny motyw",
      applyTheme: "Zastosuj Motyw",
      activeTheme: "Aktywny Motyw"
    },
    themes: {
      default: "Deszcz w Lesie",
      frutiger: "Frutiger Aero",
      cyberpunk: "Cyberpunk",
      descriptions: {
        default: "Domyślny motyw z deszczem i szarymi tonami",
        frutiger: "Czysta i nowoczesna estetyka z niebieskimi i zielonymi tonami",
        cyberpunk: "Futurystyczny styl z neonami i żywymi kolorami"
      }
    },
    notifications: {
      themeCustomization: {
        title: "Personalizacja Motywu",
        message: "Czy wolisz używać domyślnych motywów czy utworzyć folder własnych motywów?",
        useDefault: "Użyj domyślnych",
        useCustom: "Własne motywy"
      },
      backgroundChanged: "Tło zostało pomyślnie zaktualizowane",
      languageChanged: "Język został pomyślnie zmieniony",
      rainToggled: "Efekt deszczu zaktualizowany"
    },
    common: {
      yes: "Tak",
      no: "Nie",
      confirm: "Potwierdź",
      back: "Wstecz",
      next: "Dalej",
      close: "Zamknij",
      loading: "Ładowanie...",
      error: "Błąd",
      success: "Sukces"
    }
  },

  it: {
    nav: {
      profiles: "Profili",
      search: "Cerca",
      add: "Aggiungi",
      settings: "Impostazioni"
    },
    profile: {
      title: "Profilo",
      name: "Nome",
      feeling: "Sentimento",
      rating: "Valutazione",
      positivePoints: "Punti positivi",
      negativePoints: "Punti negativi",
      interestingPoints: "Punti interessanti",
      observations: "Osservazioni",
      createdAt: "Creato",
      updatedAt: "Aggiornato",
      addPoint: "Aggiungi punto",
      removePoint: "Rimuovi punto",
      save: "Salva",
      cancel: "Annulla",
      edit: "Modifica",
      delete: "Elimina",
      view: "Visualizza",
      newProfile: "Nuovo Profilo",
      myProfiles: "I Miei Profili"
    },
    feelings: {
      good: "Mi piacciono",
      bad: "Non mi piacciono",
      neutral: "Neutrale"
    },
    settings: {
      title: "Configurazione e Impostazioni",
      theme: "Tema",
      language: "Lingua",
      background: "Sfondo",
      statistics: "Statistiche",
      totalProfiles: "Profili totali",
      goodProfiles: "Mi piacciono",
      badProfiles: "Non mi piacciono",
      averageRating: "Valutazione media",
      customBackground: "Sfondo personalizzato",
      rainEffect: "Effetto pioggia",
      defaultRain: "Pioggia predefinita",
      uploadImage: "Carica immagine",
      removeImage: "Rimuovi immagine",
      currentTheme: "Tema corrente",
      applyTheme: "Applica Tema",
      activeTheme: "Tema Attivo"
    },
    themes: {
      default: "Pioggia nella Foresta",
      frutiger: "Frutiger Aero",
      cyberpunk: "Cyberpunk",
      descriptions: {
        default: "Tema predefinito con pioggia e toni grigi",
        frutiger: "Estetica pulita e moderna con toni blu e verdi",
        cyberpunk: "Stile futuristico con neon e colori vibranti"
      }
    },
    notifications: {
      themeCustomization: {
        title: "Personalizzazione Tema",
        message: "Preferisci usare i temi predefiniti o creare una cartella di temi personalizzati?",
        useDefault: "Usa predefiniti",
        useCustom: "Temi personalizzati"
      },
      backgroundChanged: "Sfondo aggiornato con successo",
      languageChanged: "Lingua cambiata con successo",
      rainToggled: "Effetto pioggia aggiornato"
    },
    common: {
      yes: "Sì",
      no: "No",
      confirm: "Conferma",
      back: "Indietro",
      next: "Avanti",
      close: "Chiudi",
      loading: "Caricamento...",
      error: "Errore",
      success: "Successo"
    }
  },

  uk: {
    nav: {
      profiles: "Профілі",
      search: "Пошук",
      add: "Додати",
      settings: "Налаштування"
    },
    profile: {
      title: "Профіль",
      name: "Ім'я",
      feeling: "Почуття",
      rating: "Оцінка",
      positivePoints: "Позитивні моменти",
      negativePoints: "Негативні моменти",
      interestingPoints: "Цікаві моменти",
      observations: "Спостереження",
      createdAt: "Створено",
      updatedAt: "Оновлено",
      addPoint: "Додати пункт",
      removePoint: "Видалити пункт",
      save: "Зберегти",
      cancel: "Скасувати",
      edit: "Редагувати",
      delete: "Видалити",
      view: "Переглянути",
      newProfile: "Новий Профіль",
      myProfiles: "Мої Профілі"
    },
    feelings: {
      good: "Вони мені подобаються",
      bad: "Вони мені не подобаються",
      neutral: "Нейтрально"
    },
    settings: {
      title: "Конфігурація та Налаштування",
      theme: "Тема",
      language: "Мова",
      background: "Фон",
      statistics: "Статистика",
      totalProfiles: "Всього профілів",
      goodProfiles: "Подобаються",
      badProfiles: "Не подобаються",
      averageRating: "Середня оцінка",
      customBackground: "Власний фон",
      rainEffect: "Ефект дощу",
      defaultRain: "Стандартний дощ",
      uploadImage: "Завантажити зображення",
      removeImage: "Видалити зображення",
      currentTheme: "Поточна тема",
      applyTheme: "Застосувати Тему",
      activeTheme: "Активна Тема"
    },
    themes: {
      default: "Дощ у Лісі",
      frutiger: "Frutiger Aero",
      cyberpunk: "Cyberpunk",
      descriptions: {
        default: "Стандартна тема з дощем та сірими тонами",
        frutiger: "Чиста та сучасна естетика з синіми та зеленими тонами",
        cyberpunk: "Футуристичний стиль з неонами та яскравими кольорами"
      }
    },
    notifications: {
      themeCustomization: {
        title: "Персоналізація Теми",
        message: "Чи віддаєте перевагу стандартним темам або створенню папки власних тем?",
        useDefault: "Використати стандартні",
        useCustom: "Власні теми"
      },
      backgroundChanged: "Фон успішно оновлено",
      languageChanged: "Мову успішно змінено",
      rainToggled: "Ефект дощу оновлено"
    },
    common: {
      yes: "Так",
      no: "Ні",
      confirm: "Підтвердити",
      back: "Назад",
      next: "Далі",
      close: "Закрити",
      loading: "Завантаження...",
      error: "Помилка",
      success: "Успіх"
    }
  },

  ru: {
    nav: {
      profiles: "Профили",
      search: "Поиск",
      add: "Добавить",
      settings: "Настройки"
    },
    profile: {
      title: "Профиль",
      name: "Имя",
      feeling: "Чувство",
      rating: "Оценка",
      positivePoints: "Положительные моменты",
      negativePoints: "Отрицательные моменты",
      interestingPoints: "Интересные моменты",
      observations: "Наблюдения",
      createdAt: "Создано",
      updatedAt: "Обновлено",
      addPoint: "Добавить пункт",
      removePoint: "Удалить пункт",
      save: "Сохранить",
      cancel: "Отменить",
      edit: "Редактировать",
      delete: "Удалить",
      view: "Просмотр",
      newProfile: "Новый Профиль",
      myProfiles: "Мои Профили"
    },
    feelings: {
      good: "Они мне нравятся",
      bad: "Они мне не нравятся",
      neutral: "Нейтрально"
    },
    settings: {
      title: "Конфигурация и Настройки",
      theme: "Тема",
      language: "Язык",
      background: "Фон",
      statistics: "Статистика",
      totalProfiles: "Всего профилей",
      goodProfiles: "Нравятся",
      badProfiles: "Не нравятся",
      averageRating: "Средняя оценка",
      customBackground: "Собственный фон",
      rainEffect: "Эффект дождя",
      defaultRain: "Стандартный дождь",
      uploadImage: "Загрузить изображение",
      removeImage: "Удалить изображение",
      currentTheme: "Текущая тема",
      applyTheme: "Применить Тему",
      activeTheme: "Активная Тема"
    },
    themes: {
      default: "Дождь в Лесу",
      frutiger: "Frutiger Aero",
      cyberpunk: "Cyberpunk",
      descriptions: {
        default: "Стандартная тема с дождем и серыми тонами",
        frutiger: "Чистая и современная эстетика с синими и зелеными тонами",
        cyberpunk: "Футуристический стиль с неонами и яркими цветами"
      }
    },
    notifications: {
      themeCustomization: {
        title: "Персонализация Темы",
        message: "Вы предпочитаете использовать стандартные темы или создать папку собственных тем?",
        useDefault: "Использовать стандартные",
        useCustom: "Собственные темы"
      },
      backgroundChanged: "Фон успешно обновлен",
      languageChanged: "Язык успешно изменен",
      rainToggled: "Эффект дождя обновлен"
    },
    common: {
      yes: "Да",
      no: "Нет",
      confirm: "Подтвердить",
      back: "Назад",
      next: "Далее",
      close: "Закрыть",
      loading: "Загрузка...",
      error: "Ошибка",
      success: "Успех"
    }
  }
};

export function useTranslation(language: Language): Translations {
  return translations[language] || translations.es;
}
