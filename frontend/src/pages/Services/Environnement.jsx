import React from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Services.css';

const ACCENT = 'var(--accent-env)';
const ITEMS = [
  { icon: 'fas fa-leaf', title: "Espaces verts", desc: "Entretien de 85 jardins publics et squares répartis dans la commune." },
  { icon: 'fas fa-tree', title: "Reboisement urbain", desc: "Programme annuel de plantation de 10 000 arbres dans les quartiers." },
  { icon: 'fas fa-futbol', title: "Terrains de sport", desc: "Gestion de 32 terrains municipaux de football, basket et athlétisme." },
  { icon: 'fas fa-trash', title: "Collecte ordures", desc: "Service de collecte des ordures ménagères 6j/7 dans tous les arrondissements." },
  { icon: 'fas fa-recycle', title: "Tri sélectif", desc: "Projet pilote de tri sélectif dans 3 arrondissements avec 120 points de collecte." },
  { icon: 'fas fa-water', title: "Lutte contre inondations", desc: "Curage des caniveaux et drainage pluvial avant chaque saison des pluies." },
];

export default function Environnement() {
  const { t } = useLang();
  return (
    <>
      <SEO title={t('environnement.title')} />
      <PageHero
        title={t('environnement.title')}
        subtitle={t('environnement.sub')}
        accent={ACCENT}
        icon={<i className="fas fa-leaf" />}
        breadcrumbs={[
          { label: t('nav.services'), to: '/services' },
          { label: t('environnement.title') }
        ]}
      />
      <section className="section-pad">
        <div className="container">
          <div className="section-tag" style={{ color: ACCENT }}>
            Environnement
          </div>
          <h2 className="section-title">Environnement &amp; Sport Urbain</h2>
          <p className="section-sub">85 espaces verts et 32 équipements sportifs au service des habitants de N'Djamena.</p>
          <div className="srvindex-grid" style={{ marginTop: '1rem' }}>
            {ITEMS.map((it, i) => (
              <div key={i} className="srvindex-card" style={{ '--acc': ACCENT }}>
                <div className="srvindex-icon"><i className={it.icon} /></div>
                <h3 className="srvindex-title">{it.title}</h3>
                <p className="srvindex-desc">{it.desc}</p>
              </div>
            ))}
          </div>
          <div className="srv-sidebar-card" style={{ marginTop: '2rem', maxWidth: 480 }}>
            <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', color: 'var(--bleu-sombre)', marginBottom: '1rem', paddingBottom: '.5rem', borderBottom: '2px solid var(--or)' }}>
              Direction Environnement
            </h4>
            <div className="info-row"><span className="label">Tél.</span><span className="value">+235 22 51 78 87</span></div>
            <div className="info-row"><span className="label">Email</span><span className="value">environnement@mairie-ndjamena.td</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
