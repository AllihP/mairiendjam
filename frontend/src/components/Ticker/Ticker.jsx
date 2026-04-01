import React from 'react';
import './Ticker.css';

const DEFAULT_ITEMS = [
  '📢 Campagne de vaccination — Centres de santé ouverts 8h–17h',
  '🏗️ Travaux — Avenue Charles de Gaulle du 5 au 20 avril 2026',
  '📋 État civil — Fermeture exceptionnelle vendredi 3 avril',
  '🌿 Journée salubrité — Samedi 4 avril 2026',
  '💧 Maintenance eau — Quartier Moursal — 2–3 avril',
];

export default function Ticker({ items }) {
  const msgs = items?.length ? items : DEFAULT_ITEMS;
  const doubled = [...msgs, ...msgs];
  return (
    <div className="ticker-wrap" role="marquee" aria-label="Informations">
      <div className="ticker-track">
        {doubled.map((m, i) => (
          <span key={i} className="ticker-item">{m}</span>
        ))}
      </div>
    </div>
  );
}
