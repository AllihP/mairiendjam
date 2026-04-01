import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { useApi } from '../../hooks/useApi';
import { endpoints } from '../../utils/api';
import Ticker from '../../components/Ticker/Ticker';
import StatsBand from '../../components/StatsBand/StatsBand';
import SEO from '../../components/SEO/SEO';
import './Home.css';

const SERVICES = [
  { key:'srv.etat',    to:'/services/etat-civil',   icon:'fas fa-file-alt',   accent:'var(--accent-etatcivil)' },
  { key:'srv.urb',     to:'/services/urbanisme',     icon:'fas fa-city',       accent:'var(--accent-urbanisme)' },
  { key:'srv.eau',     to:'/services/eau',           icon:'fas fa-tint',       accent:'var(--accent-eau)' },
  { key:'srv.collecte',to:'/services/voirie',        icon:'fas fa-trash-alt',  accent:'var(--accent-voirie)' },
  { key:'srv.voirie',  to:'/services/voirie',        icon:'fas fa-road',       accent:'var(--accent-voirie)' },
  { key:'srv.edu',     to:'/services/education',     icon:'fas fa-graduation-cap',accent:'var(--accent-education)'},
  { key:'srv.sante',   to:'/services/sante',         icon:'fas fa-heartbeat',  accent:'var(--accent-sante)' },
  { key:'srv.env',     to:'/services/environnement', icon:'fas fa-leaf',       accent:'var(--accent-env)' },
];

const ARRONDISSEMENTS = Array.from({ length: 10 }, (_, i) => ({ n: i + 1 }));

const AGENDA = [
  { day:'04', month:'Avr', title:'Journée de Salubrité Publique',      lieu:'Tous les arrondissements', cat:'Environnement' },
  { day:'07', month:'Avr', title:'Conseil Municipal Ordinaire',         lieu:'Hôtel de Ville · 9h00',   cat:'Gouvernance' },
  { day:'10', month:'Avr', title:"Forum des Entrepreneurs de N'Djamena",lieu:'Palais du 15 Janvier',   cat:'Économie' },
  { day:'15', month:'Avr', title:"Journée mondiale de l'eau",           lieu:'Bord du fleuve Chari',    cat:'Environnement' },
  { day:'18', month:'Avr', title:'Inauguration École Primaire Milezi',  lieu:'Arrondissement 6',        cat:'Éducation' },
  { day:'25', month:'Avr', title:'Réunion Publique — Plan Urbanisme',   lieu:'Mairie Centrale · 15h',   cat:'Urbanisme' },
];

export default function Home() {
  const { t } = useLang();
  const searchRef = useRef();
  const { data: tickers } = useApi(endpoints.tickers);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchRef.current?.value?.trim().toLowerCase();
    if (!q) return;
    const MAP = { naissance:'/demarches', mariage:'/demarches', décès:'/demarches',
                  permis:'/services/urbanisme', eau:'/services/eau', santé:'/services/sante',
                  voirie:'/services/voirie', éducation:'/services/education' };
    const hit = Object.entries(MAP).find(([k]) => q.includes(k));
    window.location.href = hit ? hit[1] : '/services';
  };

// ── Background image locale ───────────────────────────────
const OVERLAY = 'linear-gradient(160deg,rgba(0,21,64,.76) 0%,rgba(0,40,110,.62) 45%,rgba(0,53,128,.52) 75%,rgba(198,12,48,.22) 100%)';
const heroBg = `${OVERLAY}, url('/hero-bg.jpg')`;

  return (
    <>
      <SEO />

      {/* ── HERO ── */}
      <section className="home-hero" style={{ backgroundImage: heroBg }}>
        <div className="home-hero-flag" />
        <div className="home-hero-content container">
          <div className="hero-badge">
            <span className="hero-dot" />
            {t('hero.badge')}
          </div>
          <h1 className="hero-h1">
            {t('hero.title').split(t('hero.title.em')).map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}{i < arr.length - 1 && <em>{t('hero.title.em')}</em>}
              </React.Fragment>
            ))}
          </h1>
          <p className="hero-desc">{t('hero.desc')}</p>

          {/* Search */}
          <form className="hero-search" onSubmit={handleSearch} role="search">
            <input ref={searchRef} type="search" placeholder={t('hero.search')}
                   aria-label={t('hero.search')} autoComplete="off" />
            <button type="submit" aria-label="Rechercher">
              <i className="fas fa-search" />
            </button>
          </form>

          <div className="hero-actions">
            <Link to="/demarches" className="btn-primary">
              <i className="fas fa-clipboard-list" /> {t('hero.btn1')}
            </Link>
            <Link to="/services" className="btn-secondary">
              {t('hero.btn2')} <i className="fas fa-arrow-right" />
            </Link>
          </div>

          {/* Stats bar */}
          <div className="hero-stats-bar">
            {[
              { n:'1.5', u:'M', l:t('stat.habitants') },
              { n:'10',  u:'', l:t('stat.arr') },
              { n:'87',  u:'k',l:t('stat.actes') },
              { n:'42',  u:'', l:t('stat.services') },
            ].map(s => (
              <div key={s.l} className="hero-stat">
                <span className="hero-stat-num">{s.n}<span className="hero-stat-u">{s.u}</span></span>
                <span className="hero-stat-lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker items={tickers?.results?.map(t => `${t.icon} ${t.message_fr}`)} />

      {/* ── SERVICES ── */}
      <section className="section-pad home-services">
        <div className="container">
          <div className="section-tag">{t('services.title')}</div>
          <h2 className="section-title">Ce que la Mairie<br/>vous offre</h2>
          <p className="section-sub">{t('services.sub')}</p>
          <div className="srv-grid">
            {SERVICES.map(s => (
              <Link key={s.key} to={s.to} className="srv-card"
                    style={{ '--card-accent': s.accent }}>
                <div className="srv-icon"><i className={s.icon} /></div>
                <div className="srv-title">{t(s.key)}</div>
                <p className="srv-desc">{t(s.key + '.desc')}</p>
                <span className="srv-link">{t('common.access')} <i className="fas fa-arrow-right" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARRONDISSEMENTS ── */}
      <section className="section-pad home-arr">
        <div className="container">
          <div className="section-tag" style={{ color:'var(--accent-arr)' }}>
            <span style={{ background:'var(--accent-arr)' }} className="tag-line" />
            {t('arr.title')}
          </div>
          <h2 className="section-title" style={{ color:'#fff' }}>
            Choisissez votre<br/>arrondissement
          </h2>
          <p className="section-sub" style={{ color:'rgba(255,255,255,.65)' }}>{t('arr.sub')}</p>
          <div className="arr-grid">
            {ARRONDISSEMENTS.map(({ n }) => (
              <Link key={n} to={`/arrondissements/${n}`} className="arr-card">
                <span className="arr-num">{n}</span>
                <span className="arr-lbl">{n === 1 ? '1er' : `${n}ème`}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="section-pad home-news">
        <div className="container">
          <div className="section-tag" style={{ color:'var(--or-clair)' }}>
            <span style={{ background:'var(--or-clair)' }} className="tag-line" />
            {t('news.title')}
          </div>
          <h2 className="section-title" style={{ color:'#fff' }}>La vie de<br/>notre capitale</h2>
          <p className="section-sub" style={{ color:'rgba(255,255,255,.6)' }}>{t('news.sub')}</p>
          <div className="news-grid">
            {[
              { emoji:'🏙️', badge:t('news.featured'), date:'28 Mars 2026', featured:true,
                title:"Plan de modernisation 2026–2030 : N'Djamena se prépare pour l'avenir",
                body:"La Mairie lance son plan quinquennal de modernisation avec un budget de 45 milliards FCFA couvrant 120 km de voirie et 15 nouveaux marchés couverts." },
              { emoji:'🌿', date:'24 Mars 2026', title:"Grande campagne de reboisement dans les 10 arrondissements", body:"5 000 arbres plantés lors de la journée citoyenne nationale de l'environnement." },
              { emoji:'💻', date:'20 Mars 2026', title:"Lancement du Guichet Numérique Unique", body:"Les habitants initient leurs demandes d'actes en ligne, réduisant les délais de 40%." },
              { emoji:'🏗️', date:'15 Mars 2026', title:"Inauguration du marché central de Farcha", body:"300 commerçants accueillis dans un espace de 8 000 m²." },
              { emoji:'🎓', date:'10 Mars 2026', title:"Bourses scolaires pour 500 enfants défavorisés", body:"En partenariat avec l'UNICEF, la Mairie attribue des bourses aux élèves méritants." },
            ].map((n, i) => (
              <div key={i} className={`news-card ${n.featured ? 'featured' : ''}`}>
                <div className="news-img">{n.emoji}{n.badge && <span className="news-badge">{n.badge}</span>}</div>
                <div className="news-body">
                  <div className="news-date">🗓 {n.date}</div>
                  <div className="news-title">{n.title}</div>
                  <div className="news-excerpt">{n.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="news-footer">
            <Link to="/actualites" className="btn-secondary" style={{ display:'inline-flex' }}>
              {t('news.all')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <StatsBand />

      {/* ── AGENDA ── */}
      <section className="section-pad">
        <div className="container">
          <div className="section-tag">Agenda Municipal</div>
          <h2 className="section-title">Événements<br/>à venir</h2>
          <p className="section-sub">Ne manquez aucune réunion publique ou événement organisé par la Mairie.</p>
          <div className="agenda-grid">
            {AGENDA.map((e, i) => (
              <div key={i} className="agenda-item">
                <div className="agenda-date">
                  <span className="agenda-day">{e.day}</span>
                  <span className="agenda-month">{e.month}</span>
                </div>
                <div>
                  <div className="agenda-title">{e.title}</div>
                  <div className="agenda-info">📍 {e.lieu}</div>
                  <span className="agenda-cat">{e.cat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="home-contact-cta">
        <div className="container cta-inner">
          <div>
            <h2 className="section-title" style={{ color:'#fff' }}>Votre message<br/>nous importe</h2>
            <p style={{ color:'rgba(255,255,255,.7)', lineHeight:1.7 }}>
              Demande, signalement ou suggestion — réponse garantie sous 48h.
            </p>
          </div>
          <Link to="/contact" className="btn-primary" style={{ fontSize:'1rem', padding:'16px 36px' }}>
            <i className="fas fa-paper-plane" /> Nous écrire
          </Link>
        </div>
      </section>
    </>
  );
}
