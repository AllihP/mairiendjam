import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="footer-grid container">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-img">
              <img src="/logo.png" alt="Logo" onError={e=>{e.target.style.display='none'}}/>
              <i className="fas fa-city footer-logo-fallback"/>
            </div>
            <div>
              <div className="footer-logo-title">COMMUNE DE N'DJAMENA</div>
              <div className="footer-logo-sub">بلدية مدينة أنجمينا</div>
            </div>
          </Link>
          <p className="footer-desc">{t('footer.desc')}</p>
          <div className="footer-social">
            {[['fab fa-facebook-f','Facebook'],['fab fa-x-twitter','Twitter/X'],
              ['fab fa-youtube','YouTube'],['fab fa-whatsapp','WhatsApp'],
              ['fab fa-linkedin-in','LinkedIn']].map(([ic,lb])=>(
              <a key={lb} href="#" className="social-btn" aria-label={lb} title={lb}>
                <i className={ic}/>
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>{t('nav.services')}</h4>
          <ul className="footer-links">
            {[['srv.etat','/services/etat-civil'],['srv.urb','/services/urbanisme'],
              ['srv.eau','/services/eau'],['srv.voirie','/services/voirie'],
              ['srv.sante','/services/sante'],['srv.edu','/services/education'],
              ['srv.env','/services/environnement']].map(([k,to])=>(
              <li key={to}><Link to={to}>{t(k)}</Link></li>
            ))}
          </ul>
        </div>

        {/* Mairie */}
        <div className="footer-col">
          <h4>Mairie</h4>
          <ul className="footer-links">
            {[['admin.cabinet','/administration/cabinet-maire'],
              ['admin.conseil','/administration/conseil-municipal'],
              ['nav.arrondissements','/arrondissements'],
              ['nav.demarches','/demarches'],
              ['nav.actualites','/actualites'],
              ['nav.contact','/contact']].map(([k,to])=>(
              <li key={to}><Link to={to}>{t(k)}</Link></li>
            ))}
          </ul>
        </div>

        {/* Urgences & Contact */}
        <div className="footer-col">
          <h4>Urgences</h4>
          <ul className="footer-links footer-links--contact">
            <li><a href="tel:18">🚒 Pompiers — 18</a></li>
            <li><a href="tel:15">🚑 SAMU — 15</a></li>
            <li><a href="tel:17">🚔 Police — 17</a></li>
            <li><a href="tel:+23522517878">📞 +235 22 51 78 78</a></li>
            <li><a href="mailto:contact@mairie-ndjamena.td">✉ contact@mairie-ndjamena.td</a></li>
            <li><span>📍 Av. Charles de Gaulle, N'Djamena</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Commune de N'Djamena — {t('footer.rights')}</span>
        <span className="footer-bottom-links">
          <a href="#">{t('footer.legal')}</a>
          <span> · </span>
          <a href="#">{t('footer.privacy')}</a>
          <span> · </span>
          <Link to="/contact">{t('nav.contact')}</Link>
          <span> · </span>
          <span>{t('footer.dsi')}</span>
        </span>
      </div>
    </footer>
  );
}
