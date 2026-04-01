import React from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Services.css';

const ACCENT = 'var(--accent-education)';
const ITEMS = [
  { icon: 'fas fa-school', title: "Écoles primaires municipales", desc: "Gestion de 48 écoles primaires publiques avec 32 000 élèves scolarisés." },
  { icon: 'fas fa-utensils', title: "Cantines scolaires", desc: "Programme de cantine scolaire couvrant 28 établissements avec repas subventionnés." },
  { icon: 'fas fa-book-open', title: "Alphabétisation adultes", desc: "Cours du soir pour adultes non-scolarisés dans 15 centres communautaires." },
  { icon: 'fas fa-award', title: "Bourses municipales", desc: "Attribution de 500 bourses annuelles aux élèves méritants issus de familles précaires." },
  { icon: 'fas fa-chalkboard-teacher', title: "Formation des enseignants", desc: "Programme de perfectionnement continu des instituteurs du réseau municipal." },
  { icon: 'fas fa-building', title: "Construction écoles", desc: "Programme de construction et réhabilitation d'infrastructures scolaires." },
];

export default function Education() {
  const { t } = useLang();
  return (
    <>
      <SEO title={t('education.title')} />
      <PageHero
        title={t('education.title')}
        subtitle={t('education.sub')}
        accent={ACCENT}
        icon={<i className="fas fa-graduation-cap" />}
        breadcrumbs={[
          { label: t('nav.services'), to: '/services' },
          { label: t('education.title') }
        ]}
      />
      <section className="section-pad">
        <div className="container">
          <div className="section-tag" style={{ color: ACCENT }}>
            Éducation locale
          </div>
          <h2 className="section-title">Éducation &amp; Formation Municipale</h2>
          <p className="section-sub">48 écoles primaires et 15 centres d'alphabétisation sous la tutelle de la Commune.</p>
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
              Direction de l'Éducation
            </h4>
            <div className="info-row"><span className="label">Tél.</span><span className="value">+235 22 51 78 86</span></div>
            <div className="info-row"><span className="label">Email</span><span className="value">education@mairie-ndjamena.td</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
