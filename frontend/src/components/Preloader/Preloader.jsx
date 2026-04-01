import React, { useEffect, useState } from 'react';
import { useLang } from '../../context/LangContext';
import './Preloader.css';

export default function Preloader() {
  const { t } = useLang();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  return (
    <div id="preloader" aria-label="Chargement" role="status">
      <div className="preloader-content">
        <img src="/logo.png" alt="Logo Mairie de N'Djamena" className="loader-logo"
             onError={e => { e.target.style.display='none'; }} />
        <div className="loader-title">Commune de N'Djamena</div>
        <div className="loader-sub">بلدية مدينة أنجمينا</div>
        <div className="loader-bar"><div className="loader-bar-fill" /></div>
        <p className="loader-text">{t('preloader.loading')}</p>
      </div>
      <div className="preloader-waves">
        <div className="wave-layer" /><div className="wave-layer" /><div className="wave-layer" />
      </div>
    </div>
  );
}
