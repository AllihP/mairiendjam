import React, { useState } from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Actualites.css';

const ACCENT = 'var(--accent-actualites)';

const NEWS = [
  { id:1, emoji:'🏙️', cat:'Développement', featured:true, date:'28 Mars 2026',
    title:"Plan de modernisation 2026–2030 : N'Djamena se prépare pour l'avenir",
    body:"La Mairie de N'Djamena a officiellement lancé son plan stratégique quinquennal de modernisation des infrastructures urbaines, avec un budget estimé de 45 milliards de FCFA. Ce programme ambitieux inclut la réhabilitation de 120 km de voirie, la construction de 15 nouveaux marchés couverts et la mise en place d'un système de transport urbain structuré." },
  { id:2, emoji:'🌿', cat:'Environnement', date:'24 Mars 2026',
    title:"Grande campagne de reboisement dans les 10 arrondissements",
    body:"Plus de 5 000 arbres plantés lors de la journée citoyenne nationale de l'environnement, en partenariat avec le Ministère de l'Environnement." },
  { id:3, emoji:'💻', cat:'Numérique', date:'20 Mars 2026',
    title:"Lancement du Guichet Numérique Unique pour l'état civil",
    body:"Les habitants peuvent désormais initier leurs demandes d'actes en ligne, réduisant les délais de traitement de 40%. Disponible 24h/24." },
  { id:4, emoji:'🏗️', cat:'Infrastructure', date:'15 Mars 2026',
    title:"Inauguration du nouveau marché central de Farcha",
    body:"300 commerçants accueillis dans un espace moderne de 8 000 m² doté de sanitaires, chambres froides et système incendie." },
  { id:5, emoji:'🎓', cat:'Éducation', date:'10 Mars 2026',
    title:"Programme de bourses scolaires pour 500 enfants défavorisés",
    body:"En partenariat avec l'UNICEF, la Mairie attribue des bourses municipales aux élèves méritants issus de familles en situation de précarité." },
  { id:6, emoji:'💧', cat:'Eau', date:'5 Mars 2026',
    title:"Réhabilitation du réseau d'eau potable — Quartier Moursal",
    body:"Fin des travaux de réhabilitation de 12 km de canalisations vétustes. 35 000 habitants retrouvent un accès fiable à l'eau potable." },
  { id:7, emoji:'🏥', cat:'Santé', date:'1 Mars 2026',
    title:"Ouverture du Centre de Santé Communautaire de Milezi",
    body:"Le nouveau centre dispose de 3 salles de consultation, un laboratoire, une maternité et une pharmacie couvrant 45 000 habitants." },
  { id:8, emoji:'🚦', cat:'Mobilité', date:'25 Fév. 2026',
    title:"Installation de 15 feux tricolores sur les axes principaux",
    body:"Amélioration de la sécurité routière sur les carrefours les plus accidentogènes de N'Djamena dans le cadre du plan RSDT 2026." },
];

const CATS = ['Tous', 'Développement', 'Environnement', 'Numérique', 'Infrastructure', 'Éducation', 'Eau', 'Santé', 'Mobilité'];

export default function Actualites() {
  const { t } = useLang();
  const [cat, setCat] = useState('Tous');
  const filtered = cat === 'Tous' ? NEWS : NEWS.filter(n => n.cat === cat);
  const featured = filtered.find(n => n.featured);
  const rest = filtered.filter(n => !n.featured);

  return (
    <>
      <SEO title={t('news.title')} />
      <PageHero title={t('news.title')} subtitle={t('news.sub')} accent={ACCENT}
        icon={<i className="fas fa-newspaper" />}
        breadcrumbs={[{ label: t('nav.actualites') }]} />

      <section className="section-pad">
        <div className="container">
          {/* Category filters */}
          <div className="news-cats">
            {CATS.map(c => (
              <button key={c} className={`news-cat-btn ${cat === c ? 'active' : ''}`}
                      style={{ '--nc': ACCENT }} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured && (
            <div className="news-featured-card">
              <div className="nfc-emoji">{featured.emoji}</div>
              <div className="nfc-body">
                <div className="nfc-meta">
                  <span className="nfc-badge">{t('news.featured')}</span>
                  <span className="nfc-date">🗓 {featured.date}</span>
                  <span className="nfc-cat">{featured.cat}</span>
                </div>
                <h2 className="nfc-title">{featured.title}</h2>
                <p className="nfc-body-text">{featured.body}</p>
                <button className="btn-outline" style={{ marginTop:'1rem', borderColor:ACCENT, color:ACCENT }}>
                  {t('news.readmore')}
                </button>
              </div>
            </div>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="news-page-grid">
              {rest.map(n => (
                <div key={n.id} className="news-page-card">
                  <div className="npc-img">{n.emoji}</div>
                  <div className="npc-body">
                    <div className="npc-meta">
                      <span className="npc-cat">{n.cat}</span>
                      <span className="npc-date">{n.date}</span>
                    </div>
                    <h3 className="npc-title">{n.title}</h3>
                    <p className="npc-text">{n.body}</p>
                    <button className="npc-link">{t('news.readmore')}</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <p style={{ textAlign:'center', color:'var(--gris-moyen)', padding:'3rem' }}>
              {t('common.nodata')}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
