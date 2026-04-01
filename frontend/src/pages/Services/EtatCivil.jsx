import React, { useState } from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Services.css';

const TABS = [
  { id:'naissance', icon:'👶', label:'Déclaration de Naissance', delay:'60 jours',
    steps:[
      {t:'Rassembler les pièces', d:'Préparez tous les documents requis ci-dessous.'},
      {t:"Se rendre à l'état civil", d:'Mairie centrale ou arrondissement compétent. Lun–Ven, 7h30–15h00.'},
      {t:'Dépôt du dossier', d:'Délai de traitement : 2–5 jours ouvrables.'},
      {t:"Retrait de l'acte", d:'Frais : 500 FCFA. Reçu obligatoire.'},
    ],
    reqs:['Certificat d\'accouchement (original)','CNI du père','CNI de la mère','Acte de mariage des parents','2 témoins avec CNI']
  },
  { id:'mariage', icon:'💍', label:'Acte de Mariage', delay:'15 jours avant',
    steps:[
      {t:'Publication des bans', d:'Affichage public pendant 10 jours avant la cérémonie.'},
      {t:'Dépôt du dossier', d:'Au moins 15 jours avant la date souhaitée.'},
      {t:'Cérémonie civile', d:'En présence de l\'officier d\'état civil et 2 témoins par époux.'},
      {t:'Remise de l\'acte', d:'Livret de famille remis le jour même. Frais : 5 000 FCFA.'},
    ],
    reqs:['Actes de naissance (moins de 3 mois)','CNI valide des deux époux','Certificat médical prénuptial','4 photos/époux','CNI des 4 témoins']
  },
  { id:'deces', icon:'🕊️', label:'Acte de Décès', delay:'48 heures',
    steps:[
      {t:'Certificat de décès médical', d:'Obtenu auprès du médecin ou hôpital.'},
      {t:"Déclaration à l'état civil", d:'Par un proche muni des documents du défunt.'},
      {t:"Remise de l'acte", d:'Sous 24h. Gratuit pour le premier exemplaire.'},
    ],
    reqs:['Certificat médical de décès','CNI/acte de naissance du défunt','CNI du déclarant','Acte de mariage si applicable']
  },
  { id:'nationalite', icon:'🇹🇩', label:'Certificat de Nationalité', delay:'30 jours',
    steps:[
      {t:'Dépôt du dossier', d:'Au greffe du tribunal ou en mairie.'},
      {t:'Vérification des pièces', d:'Instruction par les services compétents (15–30 jours).'},
      {t:'Retrait du certificat', d:'Sur présentation du reçu. Frais : 2 000 FCFA.'},
    ],
    reqs:['Acte de naissance (original)','Actes de naissance des parents','CNI ou passeport','Casier judiciaire vierge','3 photos d\'identité']
  },
];

const ACCENT = 'var(--accent-etatcivil)';

export default function EtatCivil() {
  const { t } = useLang();
  const [active, setActive] = useState('naissance');
  const tab = TABS.find(t => t.id === active);

  return (
    <>
      <SEO title={t('etatcivil.title')} />
      <PageHero title={t('etatcivil.title')} subtitle={t('etatcivil.sub')} accent={ACCENT}
        icon={<i className="fas fa-file-alt" />}
        breadcrumbs={[{label:t('nav.services'),to:'/services'},{label:t('etatcivil.title')}]} />

      <section className="section-pad">
        <div className="container srv-page-layout">
          <div>
            {/* Tabs */}
            <div className="ec-tabs">
              {TABS.map(tb => (
                <button key={tb.id} className={`ec-tab ${active === tb.id ? 'active' : ''}`}
                  style={{ '--t-accent': ACCENT }} onClick={() => setActive(tb.id)}>
                  <span>{tb.icon}</span> {tb.label}
                </button>
              ))}
            </div>

            <div className="ec-panel" style={{ '--step-accent': ACCENT }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", color:'var(--bleu-sombre)', marginBottom:'4px' }}>
                {tab.label}
              </h3>
              <p style={{ fontSize:'.85rem', color:'var(--texte-doux)', marginBottom:'1.2rem' }}>
                ⏱ À effectuer dans les <strong>{tab.delay}</strong>.
              </p>
              <div className="srv-steps">
                {tab.steps.map((s, i) => (
                  <div key={i} className="srv-step">
                    <div className="srv-step-num">{i + 1}</div>
                    <div><div className="srv-step-title">{s.t}</div><div className="srv-step-detail">{s.d}</div></div>
                  </div>
                ))}
              </div>
              <h4 style={{ margin:'1.4rem 0 .6rem', color:'var(--bleu-sombre)' }}>Pièces requises</h4>
              <ul className="req-list">
                {tab.reqs.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="srv-sidebar-card">
              <h4>Informations pratiques</h4>
              <div className="info-row"><span className="label">Guichet</span><span className="value">Bureau 12, RDC</span></div>
              <div className="info-row"><span className="label">Horaires</span><span className="value">Lun–Ven 7h30–15h</span></div>
              <div className="info-row"><span className="label">Tél.</span><span className="value">+235 22 51 78 78</span></div>
              <div className="info-row"><span className="label">Email</span><span className="value">etatcivil@mairie-ndjamena.td</span></div>
            </div>
            <div className="srv-sidebar-card">
              <h4>Délais & Frais</h4>
              <div className="info-row"><span className="label">Naissance</span><span className="value">500 FCFA · 2–5j</span></div>
              <div className="info-row"><span className="label">Mariage</span><span className="value">5 000 FCFA · J même</span></div>
              <div className="info-row"><span className="label">Décès</span><span className="value">Gratuit · 24h</span></div>
              <div className="info-row"><span className="label">Nationalité</span><span className="value">2 000 FCFA · 30j</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
