import React from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Services.css';

const ACCENT = 'var(--accent-fiscalite)';
const ITEMS = [
  { icon: 'fas fa-hand-holding-usd', title: "Taxes municipales", desc: "Collecte des taxes locales : taxe d'habitation, taxe professionnelle et taxe foncière." },
  { icon: 'fas fa-store', title: "Patentes commerciales", desc: "Délivrance et renouvellement annuel des patentes pour les activités commerciales." },
  { icon: 'fas fa-file-invoice-dollar', title: "Redevances d'occupation", desc: "Gestion des droits d'occupation du domaine public (terrasses, kiosques, marchés)." },
  { icon: 'fas fa-credit-card', title: "Paiement en ligne", desc: "Règlement des taxes et redevances via la plateforme numérique de la Mairie." },
  { icon: 'fas fa-certificate', title: "Attestations fiscales", desc: "Délivrance d'attestations de situation fiscale pour les marchés publics." },
  { icon: 'fas fa-calculator', title: "Contentieux fiscal", desc: "Traitement des réclamations et litiges relatifs aux taxes communales." },
];

export default function Fiscalite() {
  const { t } = useLang();
  return (
    <>
      <SEO title={t('fiscalite.title')} />
      <PageHero
        title={t('fiscalite.title')}
        subtitle={t('fiscalite.sub')}
        accent={ACCENT}
        icon={<i className="fas fa-coins" />}
        breadcrumbs={[
          { label: t('nav.services'), to: '/services' },
          { label: t('fiscalite.title') }
        ]}
      />
      <section className="section-pad">
        <div className="container">
          <div className="section-tag" style={{ color: ACCENT }}>
            Fiscalité locale
          </div>
          <h2 className="section-title">Fiscalité &amp; Taxes Municipales</h2>
          <p className="section-sub">La Direction des Finances gère l'ensemble des recettes fiscales de la Commune.</p>
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
              Direction des Finances
            </h4>
            <div className="info-row"><span className="label">Tél.</span><span className="value">+235 22 51 78 88</span></div>
            <div className="info-row"><span className="label">Email</span><span className="value">finances@mairie-ndjamena.td</span></div>
            <div className="info-row"><span className="label">Bureau</span><span className="value">Bâtiment C, 1er étage</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
