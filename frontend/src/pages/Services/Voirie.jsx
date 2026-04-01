import React from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Services.css';

const ACCENT = 'var(--accent-voirie)';
const ITEMS = [
  { icon: 'fas fa-road', title: "Entretien des routes", desc: "Réhabilitation et entretien des voiries communales, comblage des nids-de-poule et réfection des revêtements." },
  { icon: 'fas fa-traffic-light', title: "Signalisation routière", desc: "Installation et maintenance des panneaux de signalisation, marquages au sol et feux tricolores." },
  { icon: 'fas fa-car', title: "Gestion du stationnement", desc: "Zones de stationnement payant, enlèvement des véhicules en infraction et fourrière municipale." },
  { icon: 'fas fa-hard-hat', title: "Travaux publics", desc: "Coordination des chantiers de voirie, déviations de circulation et information riverains." },
  { icon: 'fas fa-lightbulb', title: "Éclairage public", desc: "Installation, entretien et modernisation du réseau d'éclairage public (LED) dans les quartiers." },
  { icon: 'fas fa-tree', title: "Aménagement carrefours", desc: "Réaménagement des carrefours dangereux, création de ronds-points et sécurisation passages piétons." },
];

export default function Voirie() {
  const { t } = useLang();
  return (
    <>
      <SEO title={t('voirie.title')} />
      <PageHero
        title={t('voirie.title')}
        subtitle={t('voirie.sub')}
        accent={ACCENT}
        icon={<i className="fas fa-road" />}
        breadcrumbs={[
          { label: t('nav.services'), to: '/services' },
          { label: t('voirie.title') }
        ]}
      />
      <section className="section-pad">
        <div className="container">
          <div className="section-tag" style={{ color: ACCENT }}>
            Voirie & Mobilité
          </div>
          <h2 className="section-title">Voirie &amp; Mobilité Urbaine</h2>
          <p className="section-sub">La direction de la Voirie gère plus de 1 015 km de réseau routier sur la Commune.</p>
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
              Signaler un problème de voirie
            </h4>
            <div className="info-row"><span className="label">Tél.</span><span className="value">+235 22 51 78 83</span></div>
            <div className="info-row"><span className="label">Email</span><span className="value">voirie@mairie-ndjamena.td</span></div>
            <div className="info-row"><span className="label">Bureau</span><span className="value">Bâtiment B, RDC</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
