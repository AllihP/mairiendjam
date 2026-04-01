import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import './Navbar.css';

/* ── Couleur verte extraite du logo ── */
const GREEN = '#030303';
const GREEN_HOVER_BG = '#ef310f';

const SECTION_COLORS = {
  '/arrondissements':'var(--accent-arr)','/services':'var(--accent-services)',
  '/administration':'var(--accent-admin)','/demarches':'var(--accent-demarches)',
  '/actualites':'var(--accent-actualites)','/contact':'var(--accent-contact)','/':'var(--accent-home)',
};
function getAccent(p){
  const k=Object.keys(SECTION_COLORS).sort((a,b)=>b.length-a.length).find(k=>p===k||p.startsWith(k+'/'));
  return SECTION_COLORS[k]||'var(--accent-home)';
}

export default function Navbar(){
  const {t}=useLang();
  const location=useLocation();
  const [menuOpen,setMenuOpen]=useState(false);
  const [openDropdown,setOpenDropdown]=useState(null);
  const [scrolled,setScrolled]=useState(false);

  useEffect(()=>{
    document.documentElement.style.setProperty('--active-accent',getAccent(location.pathname));
    setMenuOpen(false);setOpenDropdown(null);
  },[location.pathname]);

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>10);
    window.addEventListener('scroll',h,{passive:true});
    return ()=>window.removeEventListener('scroll',h);
  },[]);

  const toggleDD=(n)=>setOpenDropdown(p=>p===n?null:n);

  const arrItems=Array.from({length:10},(_,i)=>({
    label:`${i+1}${i===0?'er':'ème'} Arrondissement`,to:`/arrondissements/${i+1}`,
  }));
  const serviceItems=[
    {label:t('srv.etat'), to:'/services/etat-civil',   icon:'fa-file-alt'},
    {label:t('srv.urb'),  to:'/services/urbanisme',     icon:'fa-city'},
    {label:t('srv.eau'),  to:'/services/eau',           icon:'fa-tint'},
    {label:t('srv.voirie'),to:'/services/voirie',       icon:'fa-road'},
    {label:t('srv.sante'),to:'/services/sante',         icon:'fa-heartbeat'},
    {label:t('srv.edu'),  to:'/services/education',     icon:'fa-graduation-cap'},
    {label:t('srv.env'),  to:'/services/environnement', icon:'fa-leaf'},
    {label:t('srv.fisc'), to:'/services/fiscalite',     icon:'fa-coins'},
  ];
  const adminItems=[
    {label:t('admin.cabinet'), to:'/administration/cabinet-maire',       icon:'fa-user-tie'},
    {label:t('admin.conseil'), to:'/administration/conseil-municipal',   icon:'fa-users'},
    {label:t('admin.sg'),      to:'/administration/secretariat-general', icon:'fa-building'},
    {label:t('admin.fin'),     to:'/administration/direction-financiere',icon:'fa-chart-bar'},
    {label:t('admin.tech'),    to:'/administration/services-techniques', icon:'fa-tools'},
    {label:t('admin.marches'), to:'/administration/marches-publics',     icon:'fa-file-contract'},
  ];

  /* Style inline pour les liens verts (garantit la priorité sur tout CSS) */
  const greenStyle      = {color:GREEN, fontWeight:'700'};
  const greenActiveStyle= {color:GREEN, fontWeight:'700', borderBottom:`2px solid ${GREEN}`};

  return (
    <header className={`navbar-header ${scrolled?'scrolled':''}`}>
      <div className="nav-inner">

        {/* ── Logo ── */}
        <Link to="/" className="logo-block" aria-label="Accueil">
          <div className="logo-img-wrap">
            <img src="/logo.png" alt="Logo Mairie"
                 onError={e=>{e.target.style.display='none';e.target.nextElementSibling.style.display='flex'}}/>
            <i className="fas fa-city logo-fallback"/>
          </div>
          <div className="logo-text">
            {/* "COMMUNE DE N'DJAMENA" en vert logo */}
            <div className="logo-title" style={{color:GREEN}}>COMMUNE DE N'DJAMENA</div>
            <div className="logo-sub">بلدية مدينة أنجمينا</div>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="desktop-nav" aria-label="Navigation principale">
          <ul className="nav-list">

            {/* Accueil — noir */}
            <li className="nav-item">
              <NavLink to="/" end className={({isActive})=>`nav-link${isActive?' nav-active':''}`}>
                {t('nav.home')}
              </NavLink>
            </li>

            {/* Arrondissements — noir */}
            <li className="nav-item has-dropdown">
              <NavLink to="/arrondissements" className={({isActive})=>`nav-link${isActive?' nav-active':''}`}>
                {t('nav.arrondissements')} <i className="fas fa-caret-down nav-caret"/>
              </NavLink>
              <div className="dropdown" role="menu">
                <div className="dropdown-grid">
                  {arrItems.map(a=>(
                    <Link key={a.to} to={a.to} className="dropdown-link" role="menuitem">
                      <i className="fas fa-map-marker-alt"/> {a.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* ✅ Services — VERT (inline style) */}
            <li className="nav-item has-dropdown">
              <NavLink to="/services"
                style={({isActive})=>isActive ? greenActiveStyle : greenStyle}
                className="nav-link">
                {t('nav.services')} <i className="fas fa-caret-down nav-caret" style={{color:GREEN}}/>
              </NavLink>
              <div className="dropdown" role="menu">
                {serviceItems.map(s=>(
                  <Link key={s.to} to={s.to} className="dropdown-link" role="menuitem">
                    <i className={`fas ${s.icon}`}/> {s.label}
                  </Link>
                ))}
              </div>
            </li>

            {/* ✅ Mairie — VERT (inline style) */}
            <li className="nav-item has-dropdown">
              <NavLink to="/administration"
                style={({isActive})=>isActive ? greenActiveStyle : greenStyle}
                className="nav-link">
                Mairie <i className="fas fa-caret-down nav-caret" style={{color:GREEN}}/>
              </NavLink>
              <div className="dropdown" role="menu">
                {adminItems.map(a=>(
                  <Link key={a.to} to={a.to} className="dropdown-link" role="menuitem">
                    <i className={`fas ${a.icon}`}/> {a.label}
                  </Link>
                ))}
              </div>
            </li>

            {/* Démarches — noir */}
            <li className="nav-item">
              <NavLink to="/demarches" className={({isActive})=>`nav-link${isActive?' nav-active':''}`}>
                {t('nav.demarches')}
              </NavLink>
            </li>

            {/* Actualités — noir */}
            <li className="nav-item">
              <NavLink to="/actualites" className={({isActive})=>`nav-link${isActive?' nav-active':''}`}>
                {t('nav.actualites')}
              </NavLink>
            </li>

            {/* Contact — noir */}
            <li className="nav-item">
              <NavLink to="/contact" className={({isActive})=>`nav-link${isActive?' nav-active':''}`}>
                {t('nav.contact')}
              </NavLink>
            </li>

            {/* ✅ Urgences — bouton VERT */}
            <li className="nav-item">
              <button
                className="nav-cta-btn"
                style={{background:GREEN}}
                onClick={()=>window.dispatchEvent(new CustomEvent('openUrgences'))}>
                🚨 {t('nav.urgences')}
              </button>
            </li>

          </ul>
        </nav>

        {/* Hamburger */}
        <button className={`hamburger ${menuOpen?'open':''}`}
                onClick={()=>setMenuOpen(o=>!o)}
                aria-label="Menu" aria-expanded={menuOpen}>
          <span/><span/><span/>
        </button>
      </div>

      {/* ── Mobile nav ── */}
      <div className={`mob-overlay ${menuOpen?'active':''}`} onClick={()=>setMenuOpen(false)}/>
      <nav className={`mob-nav ${menuOpen?'active':''}`} aria-label="Menu mobile">
        <div className="mob-header">
          <span className="mob-title">{t('nav.menu')}</span>
          <button onClick={()=>setMenuOpen(false)} className="mob-close">×</button>
        </div>
        <div className="mob-body">
          <NavLink to="/" end
            className={({isActive})=>`mob-link${isActive?' mob-active':''}`}
            onClick={()=>setMenuOpen(false)}>
            {t('nav.home')}
          </NavLink>

          {/* Arrondissements */}
          <div className="mob-dd-wrap">
            <button className="mob-dd-btn" onClick={()=>toggleDD('arr')}>
              <span>{t('nav.arrondissements')}</span>
              <i className={`fas fa-caret-${openDropdown==='arr'?'up':'down'}`}/>
            </button>
            <div className={`mob-dd ${openDropdown==='arr'?'open':''}`}>
              {arrItems.map(a=><Link key={a.to} to={a.to} className="mob-link" onClick={()=>setMenuOpen(false)}>{a.label}</Link>)}
            </div>
          </div>

          {/* Services — vert mobile */}
          <div className="mob-dd-wrap">
            <button className="mob-dd-btn" style={{color:GREEN,fontWeight:'700'}} onClick={()=>toggleDD('srv')}>
              <span>{t('nav.services')}</span>
              <i className={`fas fa-caret-${openDropdown==='srv'?'up':'down'}`}/>
            </button>
            <div className={`mob-dd ${openDropdown==='srv'?'open':''}`}>
              {serviceItems.map(s=><Link key={s.to} to={s.to} className="mob-link" onClick={()=>setMenuOpen(false)}>{s.label}</Link>)}
            </div>
          </div>

          {/* Mairie — vert mobile */}
          <div className="mob-dd-wrap">
            <button className="mob-dd-btn" style={{color:GREEN,fontWeight:'700'}} onClick={()=>toggleDD('adm')}>
              <span>Mairie</span>
              <i className={`fas fa-caret-${openDropdown==='adm'?'up':'down'}`}/>
            </button>
            <div className={`mob-dd ${openDropdown==='adm'?'open':''}`}>
              {adminItems.map(a=><Link key={a.to} to={a.to} className="mob-link" onClick={()=>setMenuOpen(false)}>{a.label}</Link>)}
            </div>
          </div>

          <NavLink to="/demarches"
            className={({isActive})=>`mob-link${isActive?' mob-active':''}`}
            onClick={()=>setMenuOpen(false)}>{t('nav.demarches')}</NavLink>
          <NavLink to="/actualites"
            className={({isActive})=>`mob-link${isActive?' mob-active':''}`}
            onClick={()=>setMenuOpen(false)}>{t('nav.actualites')}</NavLink>
          <NavLink to="/contact"
            className={({isActive})=>`mob-link${isActive?' mob-active':''}`}
            onClick={()=>setMenuOpen(false)}>{t('nav.contact')}</NavLink>

          {/* Urgences — vert mobile */}
          <button
            className="mob-link"
            style={{width:'100%',textAlign:'left',background:'none',border:'none',
                    fontFamily:'inherit',cursor:'pointer',color:GREEN,fontWeight:'700'}}
            onClick={()=>{setMenuOpen(false);window.dispatchEvent(new CustomEvent('openUrgences'))}}>
            🚨 {t('nav.urgences')}
          </button>
        </div>
      </nav>
    </header>
  );
}
