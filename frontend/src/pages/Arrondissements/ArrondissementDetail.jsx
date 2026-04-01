import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import NotFound from '../NotFound/NotFound';

const ARR_DATA = {
  1:  { name:"1er Arrondissement",  pop:"195 000", area:"45 km²", mayor:"M. Abdelkerim Hassan", phone:"+235 22 51 01 01", email:"arr1@mairie-ndjamena.td", zone:"Amriguébé, Moursal, Goudji, Walia", color:"#1a6b3a", ordinal:"1er" },
  2:  { name:"2ème Arrondissement", pop:"210 000", area:"38 km²", mayor:"M. Mahamat Ibrahim",  phone:"+235 22 51 02 02", email:"arr2@mairie-ndjamena.td", zone:"Dembé, Toukra, Ngueli, Lamadji", color:"#1a4fa0", ordinal:"2ème" },
  3:  { name:"3ème Arrondissement", pop:"180 000", area:"42 km²", mayor:"M. Oumar Saleh",      phone:"+235 22 51 03 03", email:"arr3@mairie-ndjamena.td", zone:"Farcha, Gassi, Sabangali", color:"#8B4513", ordinal:"3ème" },
  4:  { name:"4ème Arrondissement", pop:"165 000", area:"35 km²", mayor:"Mme. Fatimé Allatchi",phone:"+235 22 51 04 04", email:"arr4@mairie-ndjamena.td", zone:"Ridina, Naga, Ambassatna", color:"#C60C30", ordinal:"4ème" },
  5:  { name:"5ème Arrondissement", pop:"145 000", area:"40 km²", mayor:"M. Adam Moussa",      phone:"+235 22 51 05 05", email:"arr5@mairie-ndjamena.td", zone:"Mardjandaffack, Toukra-Ext", color:"#7c3aed", ordinal:"5ème" },
  6:  { name:"6ème Arrondissement", pop:"120 000", area:"31 km²", mayor:"M. Youssouf Djibrine",phone:"+235 22 51 06 06", email:"arr6@mairie-ndjamena.td", zone:"Milezi, N'Djari, Klémat-Ext", color:"#0369a1", ordinal:"6ème" },
  7:  { name:"7ème Arrondissement", pop:"108 000", area:"28 km²", mayor:"M. Brahim Abakar",    phone:"+235 22 51 07 07", email:"arr7@mairie-ndjamena.td", zone:"Diguel, Walia-Centre, Repos", color:"#15803d", ordinal:"7ème" },
  8:  { name:"8ème Arrondissement", pop:"95 000",  area:"25 km²", mayor:"M. Ali Hassan",       phone:"+235 22 51 08 08", email:"arr8@mairie-ndjamena.td", zone:"Moursal-Ext, Amriguébé-Sud", color:"#b45309", ordinal:"8ème" },
  9:  { name:"9ème Arrondissement", pop:"88 000",  area:"22 km²", mayor:"Mme. Zara Mahamat",   phone:"+235 22 51 09 09", email:"arr9@mairie-ndjamena.td", zone:"Klemat, Repos-Nord", color:"#374151", ordinal:"9ème" },
  10: { name:"10ème Arrondissement",pop:"75 000",  area:"20 km²", mayor:"M. Idriss Moustapha", phone:"+235 22 51 10 10", email:"arr10@mairie-ndjamena.td",zone:"Lamadji, Walia-Sud", color:"#003580", ordinal:"10ème" },
};

const SERVICES_LOCAUX = ["État Civil", "Urbanisme Local", "Hygiène & Salubrité", "Collecte Ordures", "Éducation Primaire", "Santé Communautaire"];

export default function ArrondissementDetail() {
  const { id } = useParams();
  const { t } = useLang();
  const n = parseInt(id);
  const arr = ARR_DATA[n];
  if (!arr) return <NotFound />;

  return (
    <>
      <SEO title={arr.name} />
      <PageHero
        title={arr.name}
        subtitle={`${arr.zone} — ${arr.pop} habitants`}
        accent={arr.color}
        icon={<i className="fas fa-map-marker-alt" />}
        breadcrumbs={[
          { label: t('nav.arrondissements'), to: '/arrondissements' },
          { label: arr.name }
        ]}
      />

      <section className="section-pad">
        <div className="container">
          <div className="arr-detail-layout">
            {/* Info cards */}
            <div className="arr-info-col">
              <div className="arr-info-card" style={{ borderTop:`4px solid ${arr.color}` }}>
                <h3 style={{ color: arr.color }}><i className="fas fa-info-circle" /> Informations</h3>
                <ul className="arr-info-list">
                  <li><i className="fas fa-users" /><span><strong>{t('arr.population')} :</strong> {arr.pop}</span></li>
                  <li><i className="fas fa-vector-square" /><span><strong>{t('arr.area')} :</strong> {arr.area}</span></li>
                  <li><i className="fas fa-user-tie" /><span><strong>{t('arr.mayor')} :</strong> {arr.mayor}</span></li>
                  <li><i className="fas fa-phone" /><span><a href={`tel:${arr.phone}`}>{arr.phone}</a></span></li>
                  <li><i className="fas fa-envelope" /><span><a href={`mailto:${arr.email}`}>{arr.email}</a></span></li>
                  <li><i className="fas fa-map" /><span>{arr.zone}</span></li>
                </ul>
              </div>

              <Link to="/arrondissements" className="btn-outline" style={{ marginTop:'1rem', borderColor: arr.color, color: arr.color }}>
                <i className="fas fa-arrow-left" /> {t('arr.back')}
              </Link>
            </div>

            {/* Services locaux */}
            <div>
              <h2 className="section-title" style={{ color: arr.color }}>{t('arr.services')}</h2>
              <div className="arr-srv-grid">
                {SERVICES_LOCAUX.map(s => (
                  <div key={s} className="arr-srv-item" style={{ '--c': arr.color }}>
                    <i className="fas fa-check-circle" style={{ color: arr.color }} />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              {/* Navigation between arrondissements */}
              <div className="arr-nav">
                {n > 1 && (
                  <Link to={`/arrondissements/${n - 1}`} className="arr-nav-btn">
                    <i className="fas fa-arrow-left" /> {n-1 === 1 ? '1er' : `${n-1}ème`} Arrondissement
                  </Link>
                )}
                {n < 10 && (
                  <Link to={`/arrondissements/${n + 1}`} className="arr-nav-btn" style={{ marginLeft:'auto' }}>
                    {`${n+1}ème`} Arrondissement <i className="fas fa-arrow-right" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Other arrondissements mini grid */}
          <div className="arr-others-title">Autres arrondissements</div>
          <div className="arr-others-grid">
            {Object.entries(ARR_DATA).filter(([k]) => parseInt(k) !== n).map(([k, a]) => (
              <Link key={k} to={`/arrondissements/${k}`} className="arr-mini-card"
                    style={{ '--mc': a.color }}>
                <span className="arr-mini-num">{k}</span>
                <span className="arr-mini-label">{a.ordinal}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
