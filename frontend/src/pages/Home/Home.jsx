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
  { key:'srv.etat',    to:'/services/etat-civil',   icon:'fas fa-file-alt',  accent:'#2E8B3A' },
  { key:'srv.urb',     to:'/services/urbanisme',     icon:'fas fa-city',      accent:'#1a3563' },
  { key:'srv.eau',     to:'/services/eau',           icon:'fas fa-tint',      accent:'#1a6b8a' },
  { key:'srv.collecte',to:'/services/voirie',        icon:'fas fa-trash-alt', accent:'#374151' },
  { key:'srv.voirie',  to:'/services/voirie',        icon:'fas fa-road',      accent:'#374151' },
  { key:'srv.edu',     to:'/services/education',     icon:'fas fa-graduation-cap',accent:'#1a3563'},
  { key:'srv.sante',   to:'/services/sante',         icon:'fas fa-heartbeat', accent:'#991B1B' },
  { key:'srv.env',     to:'/services/environnement', icon:'fas fa-leaf',      accent:'#2E8B3A' },
];

const ARRONDISSEMENTS = Array.from({length:10},(_,i)=>({n:i+1}));

/* Vraies images Unsplash pour les actualités */
const NEWS = [
  { img:'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800&q=80&fit=crop',
    badge:'À LA UNE', date:'28 Mars 2026', featured:true,
    title:"Plan de modernisation 2026–2030 : N'Djamena se prépare pour l'avenir",
    body:"La Mairie lance son plan quinquennal de modernisation avec un budget de 45 milliards FCFA couvrant 120 km de voirie et 15 nouveaux marchés couverts." },
  { img:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80&fit=crop',
    date:'24 Mars 2026',
    title:"Grande campagne de reboisement dans les 10 arrondissements",
    body:"5 000 arbres plantés lors de la journée citoyenne nationale de l'environnement." },
  { img:'https://images.unsplash.com/photo-1573167710701-35950a41e251?w=600&q=80&fit=crop',
    date:'20 Mars 2026',
    title:"Lancement du Guichet Numérique Unique",
    body:"Les habitants initient leurs demandes d'actes en ligne, réduisant les délais de 40%." },
  { img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80&fit=crop',
    date:'15 Mars 2026',
    title:"Inauguration du nouveau marché central de Farcha",
    body:"300 commerçants accueillis dans un espace moderne de 8 000 m²." },
  { img:'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=600&q=80&fit=crop',
    date:'10 Mars 2026',
    title:"Bourses scolaires pour 500 enfants défavorisés",
    body:"En partenariat avec l'UNICEF, la Mairie attribue des bourses aux élèves méritants." },
];

const AGENDA = [
  {day:'04',month:'Avr',title:'Journée de Salubrité Publique',lieu:'Tous les arrondissements',cat:'Environnement'},
  {day:'07',month:'Avr',title:'Conseil Municipal Ordinaire',lieu:'Hôtel de Ville · 9h00',cat:'Gouvernance'},
  {day:'10',month:'Avr',title:"Forum des Entrepreneurs de N'Djamena",lieu:'Palais du 15 Janvier',cat:'Économie'},
  {day:'15',month:'Avr',title:"Journée mondiale de l'eau",lieu:'Bord du fleuve Chari',cat:'Environnement'},
  {day:'18',month:'Avr',title:'Inauguration École Primaire Milezi',lieu:'Arrondissement 6',cat:'Éducation'},
  {day:'25',month:'Avr',title:'Réunion Publique — Plan Urbanisme',lieu:'Mairie Centrale · 15h',cat:'Urbanisme'},
];

/* Image de fond hero (locale si dispo, sinon fallback) */
const OVERLAY = 'linear-gradient(160deg,rgba(15,32,68,.82) 0%,rgba(15,32,68,.72) 50%,rgba(15,32,68,.6) 100%)';
const heroBg  = `${OVERLAY}, url('/hero-bg.jpg')`;

export default function Home() {
  const { t } = useLang();
  const searchRef = useRef();
  const { data: tickers } = useApi(endpoints.tickers);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchRef.current?.value?.trim().toLowerCase();
    if (!q) return;
    const MAP = {naissance:'/demarches',mariage:'/demarches',décès:'/demarches',
                 permis:'/services/urbanisme',eau:'/services/eau',santé:'/services/sante',
                 voirie:'/services/voirie',éducation:'/services/education'};
    const hit = Object.entries(MAP).find(([k])=>q.includes(k));
    window.location.href = hit ? hit[1] : '/services';
  };

  return (
    <>
      <SEO />

      {/* ── HERO ── */}
      <section className="home-hero" style={{backgroundImage:heroBg}}>
        <div className="home-hero-flag"/>
        <div className="home-hero-content container">
          <div className="hero-badge"><span className="hero-dot"/>{t('hero.badge')}</div>
          <h1 className="hero-h1">
            {t('hero.title').split(t('hero.title.em')).map((part,i,arr)=>(
              <React.Fragment key={i}>
                {part}{i<arr.length-1&&<em>{t('hero.title.em')}</em>}
              </React.Fragment>
            ))}
          </h1>
          <p className="hero-desc">{t('hero.desc')}</p>
          <form className="hero-search" onSubmit={handleSearch} role="search">
            <input ref={searchRef} type="search" placeholder={t('hero.search')}
                   aria-label={t('hero.search')} autoComplete="off"/>
            <button type="submit" aria-label="Rechercher"><i className="fas fa-search"/></button>
          </form>
          <div className="hero-actions">
            <Link to="/demarches" className="btn-primary">
              <i className="fas fa-clipboard-list"/> {t('hero.btn1')}
            </Link>
            <Link to="/services" className="btn-secondary-light">
              {t('hero.btn2')} <i className="fas fa-arrow-right"/>
            </Link>
          </div>
          <div className="hero-stats-bar">
            {[{n:'1.5',u:'M',l:t('stat.habitants')},{n:'10',u:'',l:t('stat.arr')},
              {n:'87',u:'k',l:t('stat.actes')},{n:'42',u:'',l:t('stat.services')}].map(s=>(
              <div key={s.l} className="hero-stat">
                <span className="hero-stat-num">{s.n}<span className="hero-stat-u">{s.u}</span></span>
                <span className="hero-stat-lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker items={tickers?.results?.map(tk=>`${tk.icon} ${tk.message_fr}`)}/>

      {/* ── SERVICES ── */}
      <section className="section-pad home-services">
        <div className="container">
          <div className="section-tag">{t('services.title')}</div>
          <h2 className="section-title">Ce que la Mairie<br/>vous offre</h2>
          <p className="section-sub">{t('services.sub')}</p>
          <div className="srv-grid">
            {SERVICES.map(s=>(
              <Link key={s.key} to={s.to} className="srv-card" style={{'--card-accent':s.accent}}>
                <div className="srv-icon"><i className={s.icon}/></div>
                <div className="srv-title">{t(s.key)}</div>
                <p className="srv-desc">{t(s.key+'.desc')}</p>
                <span className="srv-link">{t('common.access')} <i className="fas fa-arrow-right"/></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARRONDISSEMENTS ── */}
      <section className="section-pad home-arr">
        <div className="container">
          <div className="section-tag" style={{color:'#6EE58A'}}>
            <span style={{background:'#6EE58A'}} className="tag-line"/>
            {t('arr.title')}
          </div>
          <h2 className="section-title" style={{color:'#fff'}}>Choisissez votre<br/>arrondissement</h2>
          <p className="section-sub" style={{color:'rgba(255,255,255,.65)'}}>{t('arr.sub')}</p>
          <div className="arr-grid">
            {ARRONDISSEMENTS.map(({n})=>(
              <Link key={n} to={`/arrondissements/${n}`} className="arr-card">
                <span className="arr-num">{n}</span>
                <span className="arr-lbl">{n===1?'1er':`${n}ème`}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTUALITÉS avec vraies images ── */}
      <section className="section-pad home-news">
        <div className="container">
          <div className="section-tag" style={{color:'#D4A017'}}>
            <span style={{background:'#D4A017'}} className="tag-line"/>
            {t('news.title')}
          </div>
          <h2 className="section-title" style={{color:'#fff'}}>La vie de<br/>notre capitale</h2>
          <p className="section-sub" style={{color:'rgba(255,255,255,.6)'}}>{t('news.sub')}</p>
          <div className="news-grid">
            {NEWS.map((n,i)=>(
              <div key={i} className={`news-card ${n.featured?'featured':''}`}>
                <div className="news-img-wrap">
                  <img src={n.img} alt={n.title} className="news-img-photo"
                       loading="lazy"
                       onError={e=>{e.target.style.display='none';e.target.parentElement.style.background='var(--navy-mid)'}}/>
                  {n.badge && <span className="news-badge">{n.badge}</span>}
                </div>
                <div className="news-body">
                  <div className="news-date">🗓 {n.date}</div>
                  <div className="news-title">{n.title}</div>
                  <div className="news-excerpt">{n.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="news-footer">
            <Link to="/actualites" className="btn-secondary-light" style={{display:'inline-flex'}}>
              {t('news.all')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <StatsBand/>

      {/* ── AGENDA ── */}
      <section className="section-pad">
        <div className="container">
          <div className="section-tag">Agenda Municipal</div>
          <h2 className="section-title">Événements<br/>à venir</h2>
          <p className="section-sub">Ne manquez aucun événement organisé par la Mairie.</p>
          <div className="agenda-grid">
            {AGENDA.map((e,i)=>(
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
            <h2 className="section-title" style={{color:'#fff'}}>Votre message<br/>nous importe</h2>
            <p style={{color:'rgba(255,255,255,.7)',lineHeight:1.7}}>
              Demande, signalement ou suggestion — réponse garantie sous 48h.
            </p>
          </div>
          <Link to="/contact" className="btn-primary" style={{fontSize:'1rem',padding:'14px 32px',background:'#2E8B3A',boxShadow:'0 4px 20px rgba(46,139,58,.35)'}}>
            <i className="fas fa-paper-plane"/> Nous écrire
          </Link>
        </div>
      </section>
    </>
  );
}
