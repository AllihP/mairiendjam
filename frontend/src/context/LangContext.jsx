import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from '../i18n/translations';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('mairie_lang') || 'fr');

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem('mairie_lang', newLang);
    // RTL for Arabic
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = useCallback((key) => {
    const dict = translations[lang] || translations['fr'];
    return dict[key] || translations['fr'][key] || key;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
