import React from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Services.css';

const ACCENT = 'var(--accent-eau)';
const ITEMS = [
  { icon: 'fas fa-faucet', title: "Raccordement eau potable", desc: "Demande de branchement au réseau municipal d'eau potable pour votre habitation ou commerce." },
  { icon: 'fas fa-tools', title: "Signalement de fuite", desc: "Signalez toute fuite sur le réseau public. Intervention sous 24–48h selon urgence." },
  { icon: 'fas fa-recycle', title: "Gestion des eaux usées", desc: "Contrôle et maintenance des réseaux d'assainissement et stations de traitement." },
  { icon: 'fas fa-flask', title: "Contrôle qualité eau", desc: "Analyses régulières de la qualité de l'eau distribuée dans les 10 arrondissements." },
  { icon: 'fas fa-building', title: "Fosse septique", desc: "Autorisation de construction et vidange de fosses septiques pour zones non raccordées." },
  { icon: 'fas fa-shower', title: "Points d'eau publics", desc: "Installation et maintenance des bornes-fontaines dans les quartiers périphériques." },
];

export default function Eau() {
  const { t } = useLang();
  return (
    <>
      <SEO title={t('eau.title')} />
      <PageHero
        title={t('eau.title')}
        subtitle={t('eau.sub')}
        accent={ACCENT}
        icon={<i className="fas fa-tint" />}
        breadcrumbs={[
          { label: t('nav.services'), to: '/services' },
          { label: t('eau.title') }
        ]}
      />
      <section className="section-pad">
        <div className="container">
          <div className="section-tag" style={{ color: ACCENT }}>
            Eau & Assainissement
          </div>
          <h2 className="section-title">Eau &amp; Assainissement Urbain</h2>
          <p className="section-sub">La Direction de l'Eau gère l'ensemble des réseaux hydriques de la Commune.</p>
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
              Contact & Urgences eau
            </h4>
            <div className="info-row"><span className="label">Tél. urgences</span><span className="value">+235 22 51 78 85</span></div>
            <div className="info-row"><span className="label">Email</span><span className="value">eau@mairie-ndjamena.td</span></div>
            <div className="info-row"><span className="label">Astreinte 24h/7j</span><span className="value">+235 66 00 11 22</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
