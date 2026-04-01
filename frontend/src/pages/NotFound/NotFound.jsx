import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import SEO from '../../components/SEO/SEO';
import './NotFound.css';

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <SEO title="404 — Page introuvable" />
      <div className="notfound">
        <div className="nf-flag">
          <span style={{ background:'#003580' }} />
          <span style={{ background:'#FECB00' }} />
          <span style={{ background:'#C60C30' }} />
        </div>
        <div className="nf-code">404</div>
        <h1 className="nf-title">Page introuvable</h1>
        <p className="nf-sub">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <div className="nf-actions">
          <Link to="/" className="btn-primary"><i className="fas fa-home" /> Retour à l'accueil</Link>
          <Link to="/contact" className="btn-outline"><i className="fas fa-envelope" /> Nous contacter</Link>
        </div>
        <div className="nf-links">
          <Link to="/services">Services</Link>
          <span>·</span>
          <Link to="/demarches">Démarches</Link>
          <span>·</span>
          <Link to="/arrondissements">Arrondissements</Link>
          <span>·</span>
          <Link to="/actualites">Actualités</Link>
        </div>
      </div>
    </>
  );
}
