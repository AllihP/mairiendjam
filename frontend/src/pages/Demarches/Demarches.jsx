import React, { useState } from 'react';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Demarches.css';

const ACCENT = 'var(--accent-demarches)';

const DEMARCHES = [
  { id:'naissance', icon:'👶', labelKey:'dem.naissance', delay:'60 jours',
    steps:[
      {t:'Rassembler les pièces',d:'Préparez tous les documents requis listés ci-dessous.'},
      {t:"Se rendre à l'état civil",d:'Mairie centrale ou arrondissement. Lun–Ven, 7h30–15h00.'},
      {t:'Dépôt du dossier',d:'Délai de traitement : 2–5 jours ouvrables.'},
      {t:"Retrait de l'acte",d:'Frais administratifs : 500 FCFA.'},
    ],
    reqs:["Certificat d'accouchement (original)","CNI du père","CNI de la mère","Acte de mariage des parents","2 témoins munis de leurs CNI"],
    fees:'500 FCFA', duration:'2–5 jours ouvrables', bureau:'Bureau 12, RDC'
  },
  { id:'mariage', icon:'💍', labelKey:'dem.mariage', delay:'15 jours avant',
    steps:[
      {t:'Publication des bans',d:'Affichage public pendant 10 jours.'},
      {t:'Dépôt du dossier complet',d:'Au moins 15 jours avant la date.'},
      {t:'Cérémonie civile',d:'En présence de l\'officier et 2 témoins par époux.'},
      {t:"Remise de l'acte",d:'Livret de famille remis le jour même.'},
    ],
    reqs:["Actes de naissance des époux (moins de 3 mois)","CNI valide des deux époux","Certificat médical prénuptial","4 photos/époux","CNI des 4 témoins"],
    fees:'5 000 FCFA', duration:'Jour même', bureau:'Bureau 12, RDC'
  },
  { id:'deces', icon:'🕊️', labelKey:'dem.deces', delay:'48 heures',
    steps:[
      {t:'Certificat de décès médical',d:'Obtenu auprès du médecin ou de l\'hôpital.'},
      {t:"Déclaration à l'état civil",d:'Par un proche muni des documents du défunt.'},
      {t:"Remise de l'acte",d:'Sous 24h. Gratuit pour le premier exemplaire.'},
    ],
    reqs:["Certificat médical de décès","CNI ou acte de naissance du défunt","CNI du déclarant","Acte de mariage si applicable"],
    fees:'Gratuit', duration:'24 heures', bureau:'Bureau 12, RDC'
  },
  { id:'permis', icon:'🏗️', labelKey:'dem.permis', delay:'30–60 jours',
    steps:[
      {t:'Étude de faisabilité',d:'Consultation du plan d\'urbanisme de la zone.'},
      {t:'Constitution du dossier',d:'Plans architecturaux signés par un architecte agréé.'},
      {t:'Dépôt & instruction',d:'Traitement en 30 à 60 jours.'},
      {t:'Délivrance du permis',d:'Validité 2 ans. Affichage obligatoire sur le chantier.'},
    ],
    reqs:["Plan de situation et plan de masse","Plans architecturaux (3 exemplaires)","Titre foncier ou certificat d'occupation","Attestation d'architecte agréé"],
    fees:'10 000 – 150 000 FCFA', duration:'30–60 jours', bureau:'Bureau 24, 2ème étage'
  },
  { id:'commerce', icon:'🏪', labelKey:'dem.commerce', delay:'15 jours',
    steps:[
      {t:'Enregistrement au RCC',d:'Inscription au Registre du Commerce et du Crédit Mobilier.'},
      {t:'Demande de licence',d:'Formulaire disponible au guichet ou téléchargeable.'},
      {t:'Inspection des locaux',d:'Visite par les services d\'hygiène (délai 10 jours).'},
      {t:'Délivrance de la licence',d:'Renouvelable annuellement.'},
    ],
    reqs:["Extrait RCCM (moins de 3 mois)","CNI du gérant","Bail commercial ou titre de propriété","Certificat de conformité des locaux"],
    fees:'Selon catégorie d\'activité', duration:'15 jours', bureau:'Bureau 08, RDC'
  },
  { id:'nationalite', icon:'🇹🇩', labelKey:'dem.nationalite', delay:'30 jours',
    steps:[
      {t:'Dépôt du dossier',d:'Au greffe du tribunal ou en mairie selon arrondissement.'},
      {t:'Vérification des pièces',d:'Instruction par les services (15 à 30 jours).'},
      {t:'Retrait du certificat',d:'Sur présentation du reçu de dépôt.'},
    ],
    reqs:["Acte de naissance (original)","Actes de naissance du père et de la mère","CNI ou passeport","Casier judiciaire vierge","3 photos d'identité"],
    fees:'2 000 FCFA', duration:'30 jours', bureau:'Bureau 15, 1er étage'
  },
];

export default function Demarches() {
  const { t } = useLang();
  const [active, setActive] = useState('naissance');
  const dem = DEMARCHES.find(d => d.id === active);

  return (
    <>
      <SEO title={t('dem.title')} />
      <PageHero title={t('dem.title')} subtitle={t('dem.sub')} accent={ACCENT}
        icon={<i className="fas fa-clipboard-list" />}
        breadcrumbs={[{ label: t('nav.demarches') }]} />

      <section className="section-pad">
        <div className="container dem-layout">
          {/* Tabs */}
          <nav className="dem-tabs" aria-label="Démarches">
            {DEMARCHES.map(d => (
              <button key={d.id}
                className={`dem-tab ${active === d.id ? 'active' : ''}`}
                style={{ '--dem-accent': ACCENT }}
                onClick={() => setActive(d.id)}>
                <span className="dem-tab-icon">{d.icon}</span>
                <span>{t(d.labelKey)}</span>
              </button>
            ))}
          </nav>

          {/* Panel */}
          <div className="dem-panel">
            <div className="dem-panel-header" style={{ '--dem-accent': ACCENT }}>
              <span className="dem-panel-icon">{dem.icon}</span>
              <div>
                <h2 className="dem-panel-title">{t(dem.labelKey)}</h2>
                <p className="dem-panel-delay">⏱ À effectuer dans les <strong>{dem.delay}</strong></p>
              </div>
            </div>

            <div className="dem-panel-body">
              {/* Steps */}
              <h3 className="dem-section-title" style={{ color: ACCENT }}>
                <i className="fas fa-list-ol" /> Procédure étape par étape
              </h3>
              <div className="dem-steps">
                {dem.steps.map((s, i) => (
                  <div key={i} className="dem-step" style={{ '--step-accent': ACCENT }}>
                    <div className="dem-step-num">{i + 1}</div>
                    <div>
                      <div className="dem-step-title">{s.t}</div>
                      <div className="dem-step-detail">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Requirements */}
              <h3 className="dem-section-title" style={{ color: ACCENT, marginTop: '1.5rem' }}>
                <i className="fas fa-paperclip" /> Pièces requises
              </h3>
              <ul className="dem-req-list">
                {dem.reqs.map((r, i) => (
                  <li key={i} style={{ '--step-accent': ACCENT }}>
                    <i className="fas fa-check-circle" style={{ color: ACCENT }} />
                    {r}
                  </li>
                ))}
              </ul>

              {/* Quick info */}
              <div className="dem-quick-info">
                <div className="dem-qi-item">
                  <i className="fas fa-money-bill-wave" />
                  <div><span className="qi-label">Frais</span><span className="qi-val">{dem.fees}</span></div>
                </div>
                <div className="dem-qi-item">
                  <i className="fas fa-clock" />
                  <div><span className="qi-label">Délai</span><span className="qi-val">{dem.duration}</span></div>
                </div>
                <div className="dem-qi-item">
                  <i className="fas fa-map-marker-alt" />
                  <div><span className="qi-label">Bureau</span><span className="qi-val">{dem.bureau}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
