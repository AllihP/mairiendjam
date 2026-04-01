import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import './Navbar.css';

/* Map of route prefixes → accent CSS variable */
const SECTION_COLORS = {
  '/arrondissements': 'var(--accent-arr)',
  '/services/etat-civil': 'var(--accent-etatcivil)',
  '/services/urbanisme': 'var(--accent-urbanisme)',
  '/services/eau': 'var(--accent-eau)',
  '/services/voirie': 'var(--accent-voirie)',
  '/services/sante': 'var(--accent-sante)',
  '/services/education': 'var(--accent-education)',
  '/services/environnement': 'var(--accent-env)',
  '/services/fiscalite': 'var(--accent-fiscalite)',
  '/services': 'var(--accent-services)',
  '/administration': 'var(--accent-admin)',
  '/demarches': 'var(--accent-demarches)',
  '/actualites': 'var(--accent-actualites)',
  '/contact': 'var(--accent-contact)',
  '/': 'var(--accent-home)',
};

function getAccent(pathname) {
  const key = Object.keys(SECTION_COLORS)
    .sort((a,b) => b.length - a.length)
    .find(k => pathname === k || pathname.startsWith(k + '/'));
  return SECTION_COLORS[key] || 'var(--accent-home)';
}

export default function Navbar() {
  const { t } = useLang();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Inject active accent color on every route change
  useEffect(() => {
    const accent = getAccent(location.pathname);
    document.documentElement.style.setProperty('--active-accent', accent);
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toggleDropdown = (name) =>
    setOpenDropdown(prev => prev === name ? null : name);

  const arrItems = Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1}${i === 0 ? 'er' : 'ème'} Arrondissement`,
    to: `/arrondissements/${i + 1}`,
  }));

  const serviceItems = [
    { label: t('srv.etat'),  to: '/services/etat-civil',   icon: 'fa-file-alt', accent: 'var(--accent-etatcivil)' },
    { label: t('srv.urb'),   to: '/services/urbanisme',     icon: 'fa-city',     accent: 'var(--accent-urbanisme)' },
    { label: t('srv.eau'),   to: '/services/eau',           icon: 'fa-tint',     accent: 'var(--accent-eau)' },
    { label: t('srv.voirie'),to: '/services/voirie',        icon: 'fa-road',     accent: 'var(--accent-voirie)' },
    { label: t('srv.sante'), to: '/services/sante',         icon: 'fa-heartbeat',accent: 'var(--accent-sante)' },
    { label: t('srv.edu'),   to: '/services/education',     icon: 'fa-graduation-cap', accent: 'var(--accent-education)' },
    { label: t('srv.env'),   to: '/services/environnement', icon: 'fa-leaf',     accent: 'var(--accent-env)' },
    { label: t('srv.fisc'),  to: '/services/fiscalite',     icon: 'fa-coins',    accent: 'var(--accent-fiscalite)' },
  ];

  const adminItems = [
    { label: t('admin.cabinet'), to: '/administration/cabinet-maire',       icon: 'fa-user-tie' },
    { label: t('admin.conseil'), to: '/administration/conseil-municipal',   icon: 'fa-users' },
    { label: t('admin.sg'),      to: '/administration/secretariat-general', icon: 'fa-building' },
    { label: t('admin.fin'),     to: '/administration/direction-financiere',icon: 'fa-chart-bar' },
    { label: t('admin.tech'),    to: '/administration/services-techniques', icon: 'fa-tools' },
    { label: t('admin.marches'), to: '/administration/marches-publics',     icon: 'fa-file-contract' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}
            style={{ '--active-accent': getAccent(location.pathname) }}>
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="logo-block" aria-label="Accueil">
          <div className="logo-img-wrap">
            <img src="/logo.png" alt="Logo Mairie" onError={e => { e.target.style.display='none'; }} />
            <i className="fas fa-city logo-fallback" />
          </div>
          <div className="logo-text">
            <div className="logo-title">COMMUNE DE N'DJAMENA</div>
            <div className="logo-sub">بلدية مدينة أنجمينا</div>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="desktop-nav" aria-label="Navigation principale">
          <ul className="nav-list">

            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' nav-active' : ''}`}>
                {t('nav.home')}
              </NavLink>
            </li>

            {/* Arrondissements dropdown */}
            <li className="nav-item has-dropdown">
              <NavLink to="/arrondissements"
                className={({ isActive }) => `nav-link${isActive ? ' nav-active' : ''}`}>
                {t('nav.arrondissements')} <i className="fas fa-caret-down nav-caret" />
              </NavLink>
              <div className="dropdown" role="menu">
                <div className="dropdown-grid">
                  {arrItems.map(a => (
                    <Link key={a.to} to={a.to} className="dropdown-link" role="menuitem">
                      <i className="fas fa-map-marker-alt" /> {a.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Services dropdown */}
            <li className="nav-item has-dropdown">
              <NavLink to="/services"
                className={({ isActive }) => `nav-link${isActive ? ' nav-active' : ''}`}>
                {t('nav.services')} <i className="fas fa-caret-down nav-caret" />
              </NavLink>
              <div className="dropdown" role="menu">
                {serviceItems.map(s => (
                  <Link key={s.to} to={s.to} className="dropdown-link" role="menuitem"
                        style={{ '--item-accent': s.accent }}>
                    <i className={`fas ${s.icon}`} /> {s.label}
                  </Link>
                ))}
              </div>
            </li>

            {/* Administration dropdown */}
            <li className="nav-item has-dropdown">
              <NavLink to="/administration"
                className={({ isActive }) => `nav-link${isActive ? ' nav-active' : ''}`}>
                {t('nav.administration')} <i className="fas fa-caret-down nav-caret" />
              </NavLink>
              <div className="dropdown" role="menu">
                {adminItems.map(a => (
                  <Link key={a.to} to={a.to} className="dropdown-link" role="menuitem">
                    <i className={`fas ${a.icon}`} /> {a.label}
                  </Link>
                ))}
              </div>
            </li>

            <li className="nav-item">
              <NavLink to="/demarches" className={({ isActive }) => `nav-link${isActive ? ' nav-active' : ''}`}>
                {t('nav.demarches')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/actualites" className={({ isActive }) => `nav-link${isActive ? ' nav-active' : ''}`}>
                {t('nav.actualites')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' nav-active' : ''}`}>
                {t('nav.contact')}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Hamburger */}
        <button className={`hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Menu" aria-expanded={menuOpen}>
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile nav ── */}
      <>
        <div className={`mob-overlay ${menuOpen ? 'active' : ''}`}
             onClick={() => setMenuOpen(false)} />
        <nav className={`mob-nav ${menuOpen ? 'active' : ''}`} aria-label="Menu mobile">
          <div className="mob-header">
            <span className="mob-title">{t('nav.menu')}</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Fermer" className="mob-close">×</button>
          </div>
          <div className="mob-body">
            <MobLink to="/" label={t('nav.home')} close={() => setMenuOpen(false)} />

            <MobDropdown label={t('nav.arrondissements')} id="arr"
              open={openDropdown === 'arr'} toggle={() => toggleDropdown('arr')}>
              {arrItems.map(a =>
                <MobLink key={a.to} to={a.to} label={a.label} close={() => setMenuOpen(false)} />)}
            </MobDropdown>

            <MobDropdown label={t('nav.services')} id="srv"
              open={openDropdown === 'srv'} toggle={() => toggleDropdown('srv')}>
              {serviceItems.map(s =>
                <MobLink key={s.to} to={s.to} label={s.label} close={() => setMenuOpen(false)} />)}
            </MobDropdown>

            <MobDropdown label={t('nav.administration')} id="adm"
              open={openDropdown === 'adm'} toggle={() => toggleDropdown('adm')}>
              {adminItems.map(a =>
                <MobLink key={a.to} to={a.to} label={a.label} close={() => setMenuOpen(false)} />)}
            </MobDropdown>

            <MobLink to="/demarches"    label={t('nav.demarches')}   close={() => setMenuOpen(false)} />
            <MobLink to="/actualites"   label={t('nav.actualites')}  close={() => setMenuOpen(false)} />
            <MobLink to="/contact"      label={t('nav.contact')}     close={() => setMenuOpen(false)} />
          </div>
        </nav>
      </>
    </header>
  );
}

function MobLink({ to, label, close }) {
  return (
    <NavLink to={to} className={({ isActive }) => `mob-link${isActive ? ' mob-active' : ''}`}
             onClick={close} end={to === '/'}>
      {label}
    </NavLink>
  );
}

function MobDropdown({ label, id, open, toggle, children }) {
  return (
    <div className="mob-dd-wrap">
      <button className="mob-dd-btn" onClick={toggle} aria-expanded={open}>
        <span>{label}</span>
        <i className={`fas fa-caret-${open ? 'up' : 'down'}`} />
      </button>
      <div className={`mob-dd ${open ? 'open' : ''}`}>{children}</div>
    </div>
  );
}
