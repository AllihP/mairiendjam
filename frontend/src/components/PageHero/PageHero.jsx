import React from 'react';
import { Link } from 'react-router-dom';
import './PageHero.css';

/**
 * Reusable page hero banner.
 * accent  : CSS color value — drives all active colors on the page
 * breadcrumbs : [{label, to}]
 */
export default function PageHero({ title, subtitle, accent = 'var(--bleu)', icon, breadcrumbs = [], children }) {
  return (
    <section className="page-hero" style={{ '--hero-accent': accent }}>
      <div className="page-hero-flag" />
      <div className="page-hero-inner container">
        {breadcrumbs.length > 0 && (
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/" className="bc-item">
              <i className="fas fa-home" /> Accueil
            </Link>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <span className="bc-sep"><i className="fas fa-chevron-right" /></span>
                {b.to ? (
                  <Link to={b.to} className="bc-item">{b.label}</Link>
                ) : (
                  <span className="bc-item bc-current">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        {icon && <div className="page-hero-icon">{icon}</div>}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
