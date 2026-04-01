import React, { useState } from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Actualites.css';

const NEWS = [
  { id:1, img:'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=900&q=80&fit=crop',
    cat:'Développement', featured:true, date:'28 Mars 2026',
    title:"Plan de modernisation 2026–2030 : N'Djamena se prépare pour l'avenir",
    body:"La Mairie de N'Djamena a officiellement lancé son plan stratégique quinquennal de modernisation des infrastructures urbaines, avec un budget estimé de 45 milliards de FCFA. Ce programme inclut la réhabilitation de 120 km de voirie, la construction de 15 nouveaux marchés couverts et la mise en place d'un système de transport urbain structuré." },
  { id:2, img:'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80&fit=crop',
    cat:'Environnement', date:'24 Mars 2026',
    title:"Grande campagne de reboisement dans les 10 arrondissements",
    body:"Plus de 5 000 arbres plantés lors de la journée citoyenne nationale de l'environnement, en partenariat avec le Ministère de l'Environnement." },
  { id:3, img:'https://images.unsplash.com/photo-1573167710701-35950a41e251?w=600&q=80&fit=crop',
    cat:'Numérique', date:'20 Mars 2026',
    title:"Lancement du Guichet Numérique Unique pour l'état civil",
    body:"Les habitants peuvent désormais initier leurs demandes d'actes en ligne, réduisant les délais de traitement de 40%. Disponible 24h/24." },
  { id:4, img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80&fit=crop',
    cat:'Infrastructure', date:'15 Mars 2026',
    title:"Inauguration du nouveau marché central de Farcha",
    body:"300 commerçants accueillis dans un espace moderne de 8 000 m² doté de sanitaires, chambres froides et système incendie." },
  { id:5, img:'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=600&q=80&fit=crop',
    cat:'Éducation', date:'10 Mars 2026',
    title:"Programme de bourses scolaires pour 500 enfants défavorisés",
    body:"En partenariat avec l'UNICEF, la Mairie attribue des bourses municipales aux élèves méritants issus de familles en situation de précarité." },
  { id:6, img:'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80&fit=crop',
    cat:'Eau', date:'5 Mars 2026',
    title:"Réhabilitation du réseau d'eau potable — Quartier Moursal",
    body:"Fin des travaux de réhabilitation de 12 km de canalisations vétustes. 35 000 habitants retrouvent un accès fiable à l'eau potable." },
  { id:7, img:'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80&fit=crop',
    cat:'Santé', date:'1 Mars 2026',
    title:"Ouverture du Centre de Santé Communautaire de Milezi",
    body:"Le nouveau centre dispose de 3 salles de consultation, un laboratoire, une maternité et une pharmacie couvrant 45 000 habitants." },
  { id:8, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop',
    cat:'Mobilité', date:'25 Fév. 2026',
    title:"Installation de 15 feux tricolores sur les axes principaux",
    body:"Amélioration de la sécurité routière sur les carrefours les plus accidentogènes de N'Djamena dans le cadre du plan RSDT 2026." },
];

const CATS = ['Tous','Développement','Environnement','Numérique','Infrastructure','Éducation','Eau','Santé','Mobilité'];

export default function Actualites() {
  const { t } = useLang();
  const [cat, setCat] = useState('Tous');
  const filtered = cat === 'Tous' ? NEWS : NEWS.filter(n=>n.cat===cat);
  const featured = filtered.find(n=>n.featured);
  const rest = filtered.filter(n=>!n.featured);

  return (
    <>
      <SEO title={t('news.title')} />
      <PageHero title={t('news.title')} subtitle={t('news.sub')}
        accent="var(--navy)" icon={<i className="fas fa-newspaper"/>}
        breadcrumbs={[{label:t('nav.actualites')}]} />

      <section className="section-pad">
        <div className="container">
          {/* Filtres */}
          <div className="news-cats">
            {CATS.map(c=>(
              <button key={c} className={`news-cat-btn ${cat===c?'active':''}`}
                      onClick={()=>setCat(c)}>{c}</button>
            ))}
          </div>

          {/* Article vedette */}
          {featured && (
            <div className="news-featured-card">
              <div className="nfc-img-wrap">
                <img src={featured.img} alt={featured.title} className="nfc-img"
                     loading="lazy"
                     onError={e=>{e.target.style.display='none';e.target.parentElement.style.background='var(--navy-mid)'}}/>
                <span className="nfc-badge-overlay">{t('news.featured')}</span>
              </div>
              <div className="nfc-body">
                <div className="nfc-meta">
                  <span className="nfc-date">🗓 {featured.date}</span>
                  <span className="nfc-cat">{featured.cat}</span>
                </div>
                <h2 className="nfc-title">{featured.title}</h2>
                <p className="nfc-body-text">{featured.body}</p>
                <button className="btn-outline" style={{marginTop:'1rem',borderColor:'var(--navy)',color:'var(--navy)'}}>
                  {t('news.readmore')}
                </button>
              </div>
            </div>
          )}

          {/* Grille */}
          {rest.length > 0 && (
            <div className="news-page-grid">
              {rest.map(n=>(
                <div key={n.id} className="news-page-card">
                  <div className="npc-img-wrap">
                    <img src={n.img} alt={n.title} className="npc-img"
                         loading="lazy"
                         onError={e=>{e.target.style.display='none';e.target.parentElement.style.background='var(--gray-100)'}}/>
                  </div>
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

          {filtered.length===0 && (
            <p style={{textAlign:'center',color:'var(--gray-400)',padding:'3rem'}}>
              {t('common.nodata')}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
