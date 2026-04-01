import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import NotFound from '../NotFound/NotFound';
import './Administration.css';

const UNITS = {
  'cabinet-maire': {
    key:'admin.cabinet', icon:'fas fa-user-tie', color:'#2d1b69',
    head:'S.E. M. Oumar Boukar', headTitle:'Maire de N\'Djamena',
    phone:'+235 22 51 78 78', email:'maire@mairie-ndjamena.td', bureau:'Bureau 01, 1er étage',
    missions:['Représentation officielle de la Commune','Coordination des services municipaux','Exécution des délibérations du Conseil Municipal','Relations avec le Gouvernement central','Signature des actes administratifs majeurs','Gestion des partenariats internationaux'],
  },
  'conseil-municipal': {
    key:'admin.conseil', icon:'fas fa-users', color:'#1a4fa0',
    head:'M. Mahamat Nour', headTitle:'Président du Conseil Municipal',
    phone:'+235 22 51 78 79', email:'conseil@mairie-ndjamena.td', bureau:'Salle des séances, 2ème étage',
    missions:['Délibération sur le budget communal','Vote des taxes et redevances locales','Contrôle de l\'action municipale','Approbation des grands projets urbains','Élection du Maire et des adjoints','Sessions ordinaires trimestrielles'],
  },
  'secretariat-general': {
    key:'admin.sg', icon:'fas fa-building', color:'#374151',
    head:'M. Hassan Abakar', headTitle:'Secrétaire Général de la Commune',
    phone:'+235 22 51 78 80', email:'sg@mairie-ndjamena.td', bureau:'Bureau 05, RDC',
    missions:['Coordination de l\'administration communale','Gestion des ressources humaines','Archivage et gestion documentaire','Coordination interservices','Organisation des cérémonies officielles','Suivi des projets communaux'],
  },
  'direction-financiere': {
    key:'admin.fin', icon:'fas fa-chart-bar', color:'#b45309',
    head:'Mme. Aïcha Mahamat', headTitle:'Directrice Financière',
    phone:'+235 22 51 78 81', email:'finances@mairie-ndjamena.td', bureau:'Bâtiment C, 1er étage',
    missions:['Élaboration et exécution du budget','Gestion de la trésorerie communale','Recouvrement des taxes et recettes','Contrôle financier interne','Passation des marchés publics','Production des rapports financiers'],
  },
  'services-techniques': {
    key:'admin.tech', icon:'fas fa-tools', color:'#15803d',
    head:'M. Ibrahim Saleh', headTitle:'Directeur des Services Techniques',
    phone:'+235 22 51 78 82', email:'technique@mairie-ndjamena.td', bureau:'Bâtiment B, RDC',
    missions:['Planification des infrastructures urbaines','Maîtrise d\'ouvrage des travaux communaux','Entretien du patrimoine immobilier','Gestion du parc automobile','Contrôle des chantiers privés','Études techniques et topographie'],
  },
  'marches-publics': {
    key:'admin.marches', icon:'fas fa-file-contract', color:'#0369a1',
    head:'M. Abdoulaye Kimi', headTitle:'Chef de la Division Marchés Publics',
    phone:'+235 22 51 78 83', email:'marches@mairie-ndjamena.td', bureau:'Bureau 18, 2ème étage',
    missions:['Publication des appels d\'offres','Évaluation des offres techniques et financières','Notification des marchés','Contrôle de l\'exécution des contrats','Archivage des dossiers de marchés','Conseil juridique en matière de passation'],
  },
};

export default function AdminDetail() {
  const { slug } = useParams();
  const { t } = useLang();
  const unit = UNITS[slug];
  if (!unit) return <NotFound />;

  return (
    <>
      <SEO title={t(unit.key)} />
      <PageHero title={t(unit.key)} subtitle={t(unit.key+'.desc')} accent={unit.color}
        icon={<i className={unit.icon}/>}
        breadcrumbs={[{label:t('nav.administration'),to:'/administration'},{label:t(unit.key)}]} />
      <section className="section-pad">
        <div className="container adm-detail-layout">
          <div>
            <div className="adm-detail-card" style={{'--adm-color':unit.color}}>
              <h3><i className={unit.icon}/> Missions</h3>
              <div className="adm-mission-list">
                {unit.missions.map((m,i)=>(
                  <div key={i} className="adm-mission-item">
                    <i className="fas fa-check-circle" style={{color:unit.color}}/>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="adm-contact-card">
              <h4>Contacts</h4>
              <div className="info-row"><span className="label">Responsable</span><span className="value">{unit.head}</span></div>
              <div className="info-row"><span className="label">Titre</span><span className="value">{unit.headTitle}</span></div>
              <div className="info-row"><span className="label">Tél.</span><span className="value"><a href={`tel:${unit.phone}`}>{unit.phone}</a></span></div>
              <div className="info-row"><span className="label">Email</span><span className="value"><a href={`mailto:${unit.email}`}>{unit.email}</a></span></div>
              <div className="info-row"><span className="label">Bureau</span><span className="value">{unit.bureau}</span></div>
            </div>
            <Link to="/administration" className="btn-outline" style={{marginTop:'1rem',borderColor:unit.color,color:unit.color}}>
              <i className="fas fa-arrow-left"/> Retour Administration
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
