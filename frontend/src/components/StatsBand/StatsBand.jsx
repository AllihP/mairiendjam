import React from 'react';
import { useLang } from '../../context/LangContext';
import './StatsBand.css';

export default function StatsBand({ stats }) {
  const { t } = useLang();
  const items = stats || [
    { num: '1.5', unit: 'M', label: t('stat.habitants') },
    { num: '10',  unit: '',  label: t('stat.arr') },
    { num: '87',  unit: 'k', label: t('stat.actes') },
    { num: '245', unit: '',  label: t('stat.agents') },
    { num: '42',  unit: '',  label: t('stat.services') },
  ];
  return (
    <section className="stats-band" aria-label="Chiffres clés">
      <div className="stats-grid container">
        {items.map((s, i) => (
          <div key={i} className="stat-card">
            <span className="stat-num">{s.num}<span className="stat-unit">{s.unit}</span></span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
