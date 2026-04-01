import React from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Services.css';

const ACCENT = 'var(--accent-sante)';
const ITEMS = [
  { icon: 'fas fa-hospital', title: "Centres de santé municipaux", desc: "12 centres de santé communautaires répartis dans les 10 arrondissements." },
  { icon: 'fas fa-syringe', title: "Campagnes de vaccination", desc: "Programmes de vaccination gratuits contre polio, rougeole, choléra, méningite." },
  { icon: 'fas fa-microscope', title: "Contrôle sanitaire marchés", desc: "Inspection régulière des denrées alimentaires et conditions d'hygiène des marchés." },
  { icon: 'fas fa-baby', title: "Santé maternelle & infantile", desc: "Suivi prénatal, accouchements assistés et soins pédiatriques municipaux." },
  { icon: 'fas fa-lungs', title: "Lutte contre épidémies", desc: "Surveillance épidémiologique et réponse rapide aux maladies infectieuses." },
  { icon: 'fas fa-hand-holding-heart', title: "Action sociale sanitaire", desc: "Prise en charge des populations vulnérables et des sans-abri malades." },
];

export default function Sante() {
  const { t } = useLang();
  return (
    <>
      <SEO title={t('sante.title')} />
      <PageHero
        title={t('sante.title')}
        subtitle={t('sante.sub')}
        accent={ACCENT}
        icon={<i className="fas fa-heartbeat" />}
        breadcrumbs={[
          { label: t('nav.services'), to: '/services' },
          { label: t('sante.title') }
        ]}
      />
      <section className="section-pad">
        <div className="container">
          <div className="section-tag" style={{ color: ACCENT }}>
            Santé publique
          </div>
          <h2 className="section-title">Santé Publique Municipale</h2>
          <p className="section-sub">La Mairie gère 12 centres de santé communautaires et coordonne les programmes de santé publique.</p>
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
              Urgences sanitaires
            </h4>
            <div className="info-row"><span className="label">SAMU</span><span className="value">15</span></div>
            <div className="info-row"><span className="label">Tél. direction</span><span className="value">+235 22 51 78 84</span></div>
            <div className="info-row"><span className="label">Email</span><span className="value">sante@mairie-ndjamena.td</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
