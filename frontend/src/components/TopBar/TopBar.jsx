import React from 'react';
import { useLang } from '../../context/LangContext';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

export default function TopBar({ onUrgences }) {
  const { lang, setLang, t } = useLang();
  const navigate = useNavigate();

  const handleLang = (l) => {
    setLang(l);
    navigate('/');   // redirect to homepage on lang change
  };

  return (
    <div className="topbar" role="banner">
      <div className="topbar-inner">
        <div className="topbar-left">
          <span>🇹🇩 {t('topbar.republic')}</span>
          <a href="#" className="topbar-link">
            <i className="fas fa-globe" /> {t('topbar.portal')}
          </a>
          <a href="tel:+23522517878" className="topbar-link">
            <i className="fas fa-phone-alt" /> +235 22 51 78 78
          </a>
        </div>
        <div className="topbar-right">
          <button className="topbar-link urgences-btn" onClick={onUrgences}>
            <i className="fas fa-bell" /> {t('topbar.urgences')}
          </button>
          <div className="lang-switcher" role="navigation" aria-label="Langue">
            {['fr','en','ar'].map((l, i) => (
              <React.Fragment key={l}>
                {i > 0 && <span className="lang-sep">|</span>}
                <button
                  className={`lang-btn ${lang === l ? 'active' : ''}`}
                  onClick={() => handleLang(l)}
                  aria-label={l === 'fr' ? 'Français' : l === 'en' ? 'English' : 'العربية'}
                >
                  {l === 'fr' ? 'FR' : l === 'en' ? 'EN' : 'عر'}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
