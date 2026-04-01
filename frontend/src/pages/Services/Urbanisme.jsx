import React, { useState } from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Services.css';

const ACCENT = 'var(--accent-urbanisme)';

const TABS = [
  { id:'permis', icon:'🏗️', label:'Permis de Construire', delay:'30–60 jours',
    steps:[
      {t:'Étude de faisabilité', d:'Consultation du plan d\'urbanisme de la zone.'},
      {t:'Constitution du dossier', d:'Plans architecturaux signés par un architecte agréé.'},
      {t:'Dépôt & instruction', d:'Traitement en 30 à 60 jours selon la complexité.'},
      {t:'Délivrance du permis', d:'Validité 2 ans. Renouvelable. Affichage obligatoire sur chantier.'},
    ],
    reqs:['Plan de situation et plan de masse','Plans architecturaux (3 exemplaires)','Titre foncier ou certificat d\'occupation','Attestation d\'architecte agréé','Frais : 10 000 à 150 000 FCFA selon surface']
  },
  { id:'conformite', icon:'✅', label:'Certificat de Conformité', delay:'15 jours',
    steps:[
      {t:'Achèvement des travaux', d:'Déclaration d\'achèvement déposée en mairie.'},
      {t:'Inspection technique', d:'Visite de conformité par les services techniques.'},
      {t:'Délivrance du certificat', d:'Obligatoire avant toute occupation ou vente.'},
    ],
    reqs:['Permis de construire initial','Déclaration d\'achèvement de travaux','Photos du bâtiment achevé','Rapport de l\'architecte']
  },
  { id:'lotissement', icon:'🗺️', label:'Plan de Lotissement', delay:'60 jours',
    steps:[
      {t:'Demande préalable', d:'Consultation du service foncier de la mairie.'},
      {t:'Dépôt du projet', d:'Plans topographiques et étude d\'impact.'},
      {t:'Approbation communale', d:'Délibération du conseil municipal nécessaire.'},
    ],
    reqs:['Plan topographique certifié','Étude d\'impact environnemental','Titre de propriété du terrain','Cahier des charges du lotissement']
  },
];

export default function Urbanisme() {
  const { t } = useLang();
  const [active, setActive] = useState('permis');
  const tab = TABS.find(tb => tb.id === active);

  return (
    <>
      <SEO title={t('urbanisme.title')} />
      <PageHero title={t('urbanisme.title')} subtitle={t('urbanisme.sub')} accent={ACCENT}
        icon={<i className="fas fa-city" />}
        breadcrumbs={[{label:t('nav.services'),to:'/services'},{label:t('urbanisme.title')}]} />

      <section className="section-pad">
        <div className="container srv-page-layout">
          <div>
            <div className="ec-tabs">
              {TABS.map(tb => (
                <button key={tb.id} className={`ec-tab ${active===tb.id?'active':''}`}
                  style={{'--t-accent':ACCENT}} onClick={()=>setActive(tb.id)}>
                  <span>{tb.icon}</span> {tb.label}
                </button>
              ))}
            </div>
            <div className="ec-panel" style={{'--step-accent':ACCENT}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:'var(--bleu-sombre)',marginBottom:'4px'}}>{tab.label}</h3>
              <p style={{fontSize:'.85rem',color:'var(--texte-doux)',marginBottom:'1.2rem'}}>⏱ Délai : <strong>{tab.delay}</strong></p>
              <div className="srv-steps">
                {tab.steps.map((s,i)=>(
                  <div key={i} className="srv-step">
                    <div className="srv-step-num">{i+1}</div>
                    <div><div className="srv-step-title">{s.t}</div><div className="srv-step-detail">{s.d}</div></div>
                  </div>
                ))}
              </div>
              <h4 style={{margin:'1.4rem 0 .6rem',color:'var(--bleu-sombre)'}}>Pièces requises</h4>
              <ul className="req-list">{tab.reqs.map((r,i)=><li key={i}>{r}</li>)}</ul>
            </div>
          </div>
          <div>
            <div className="srv-sidebar-card">
              <h4>Service Urbanisme</h4>
              <div className="info-row"><span className="label">Bureau</span><span className="value">Bureau 24, 2ème étage</span></div>
              <div className="info-row"><span className="label">Horaires</span><span className="value">Lun–Ven 7h30–15h</span></div>
              <div className="info-row"><span className="label">Tél.</span><span className="value">+235 22 51 78 82</span></div>
              <div className="info-row"><span className="label">Email</span><span className="value">urbanisme@mairie-ndjamena.td</span></div>
            </div>
            <div className="srv-sidebar-card">
              <h4>Tarifs Permis de Construire</h4>
              <div className="info-row"><span className="label">&lt; 100 m²</span><span className="value">10 000 FCFA</span></div>
              <div className="info-row"><span className="label">100–500 m²</span><span className="value">50 000 FCFA</span></div>
              <div className="info-row"><span className="label">&gt; 500 m²</span><span className="value">150 000 FCFA</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
