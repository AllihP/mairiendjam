import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Services.css';

const SERVICES = [
  { slug:'etat-civil',   icon:'fas fa-file-alt',       accent:'var(--accent-etatcivil)', key:'srv.etat',   desc:'srv.etat.desc' },
  { slug:'urbanisme',    icon:'fas fa-city',            accent:'var(--accent-urbanisme)', key:'srv.urb',    desc:'srv.urb.desc' },
  { slug:'eau',          icon:'fas fa-tint',            accent:'var(--accent-eau)',       key:'srv.eau',    desc:'srv.eau.desc' },
  { slug:'voirie',       icon:'fas fa-road',            accent:'var(--accent-voirie)',    key:'srv.voirie', desc:'srv.voirie.desc' },
  { slug:'sante',        icon:'fas fa-heartbeat',       accent:'var(--accent-sante)',     key:'srv.sante',  desc:'srv.sante.desc' },
  { slug:'education',    icon:'fas fa-graduation-cap',  accent:'var(--accent-education)', key:'srv.edu',    desc:'srv.edu.desc' },
  { slug:'environnement',icon:'fas fa-leaf',            accent:'var(--accent-env)',       key:'srv.env',    desc:'srv.env.desc' },
  { slug:'fiscalite',    icon:'fas fa-coins',           accent:'var(--accent-fiscalite)', key:'srv.fisc',   desc:'srv.fisc.desc' },
];

export default function Services() {
  const { t } = useLang();
  return (
    <>
      <SEO title={t('services.title')} />
      <PageHero
        title={t('services.title')}
        subtitle={t('services.sub')}
        accent="var(--accent-services)"
        icon={<i className="fas fa-cogs" />}
        breadcrumbs={[{ label: t('nav.services') }]}
      />
      <section className="section-pad">
        <div className="container">
          <div className="srvindex-grid">
            {SERVICES.map(s => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="srvindex-card"
                    style={{ '--acc': s.accent }}>
                <div className="srvindex-icon"><i className={s.icon} /></div>
                <h3 className="srvindex-title">{t(s.key)}</h3>
                <p className="srvindex-desc">{t(s.desc)}</p>
                <div className="srvindex-link">
                  {t('common.access')} <i className="fas fa-arrow-right" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
