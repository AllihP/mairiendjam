import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Administration.css';

const UNITS = [
  { slug:'cabinet-maire',        icon:'fas fa-user-tie',       color:'#2d1b69', key:'admin.cabinet', desc:'admin.cabinet.desc' },
  { slug:'conseil-municipal',    icon:'fas fa-users',           color:'#1a4fa0', key:'admin.conseil', desc:'admin.conseil.desc' },
  { slug:'secretariat-general',  icon:'fas fa-building',        color:'#374151', key:'admin.sg',      desc:'admin.sg.desc' },
  { slug:'direction-financiere', icon:'fas fa-chart-bar',       color:'#b45309', key:'admin.fin',     desc:'admin.fin.desc' },
  { slug:'services-techniques',  icon:'fas fa-tools',           color:'#15803d', key:'admin.tech',    desc:'admin.tech.desc' },
  { slug:'marches-publics',      icon:'fas fa-file-contract',   color:'#0369a1', key:'admin.marches', desc:'admin.marches.desc' },
];

export default function Administration() {
  const { t } = useLang();
  return (
    <>
      <SEO title={t('admin.title')} />
      <PageHero
        title={t('admin.title')}
        subtitle={t('admin.sub')}
        accent="var(--accent-admin)"
        icon={<i className="fas fa-landmark" />}
        breadcrumbs={[{ label: t('nav.administration') }]}
      />
      <section className="section-pad">
        <div className="container">
          <div className="adm-grid">
            {UNITS.map(u => (
              <Link key={u.slug} to={`/administration/${u.slug}`}
                    className="adm-card" style={{ '--adm-color': u.color }}>
                <div className="adm-card-icon">
                  <i className={u.icon} />
                </div>
                <div className="adm-card-body">
                  <h3 className="adm-card-title">{t(u.key)}</h3>
                  <p className="adm-card-desc">{t(u.desc)}</p>
                </div>
                <div className="adm-card-arrow">
                  <i className="fas fa-arrow-right" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
