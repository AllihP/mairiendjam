import React, { useEffect } from 'react';
import { useLang } from '../../context/LangContext';
import './Modal.css';

export function UrgencesModal({ open, onClose }) {
  const { t } = useLang();
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true"
         aria-labelledby="urg-title" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          <i className="fas fa-times"/>
        </button>
        <h3 id="urg-title">🚨 {t('modal.urgences.title')}</h3>
        <p>{t('modal.urgences.desc')}</p>
        <div className="urg-list">
          {[
            { icon:'🚒', label:'Pompiers — 18', sub:'Incendie, accident, catastrophe', tel:'18', color:'var(--rouge)' },
            { icon:'🚑', label:'SAMU — 15',     sub:'Urgences médicales, ambulance',  tel:'15', color:'var(--rouge)' },
            { icon:'🚔', label:'Police — 17',   sub:'Sécurité publique, agression',   tel:'17', color:'var(--bleu)' },
            { icon:'🏛️', label:'Mairie — +235 22 51 78 78', sub:'Urgences administratives', tel:'+23522517878', color:'var(--or)' },
          ].map(u => (
            <div className="urg-item" key={u.tel}>
              <div className="urg-icon" style={{ background: u.color }}>{u.icon}</div>
              <div>
                <div className="urg-label">{u.label}</div>
                <div className="urg-sub">{u.sub}</div>
              </div>
              <a href={`tel:${u.tel}`} className="urg-call">Appeler</a>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <a href="tel:15" className="btn-primary" style={{background:'var(--rouge)',color:'#fff',boxShadow:'none'}}>
            <i className="fas fa-phone"/> Appeler le 15
          </a>
          <button className="btn-outline-dark" onClick={onClose}>{t('common.close')}</button>
        </div>
      </div>
    </div>
  );
}

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true"
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          <i className="fas fa-times"/>
        </button>
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
