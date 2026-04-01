import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Arrondissements.css';

const ARR_DATA = [
  { n:1,  name:"1er Arrondissement", pop:"195 000", zone:"Quartier Amriguébé, Moursal, Goudji", color:"#1a6b3a" },
  { n:2,  name:"2ème Arrondissement", pop:"210 000", zone:"Quartier Dembé, Toukra, Ngueli", color:"#1a4fa0" },
  { n:3,  name:"3ème Arrondissement", pop:"180 000", zone:"Quartier Farcha, Gassi", color:"#8B4513" },
  { n:4,  name:"4ème Arrondissement", pop:"165 000", zone:"Quartier Ridina, Naga", color:"#C60C30" },
  { n:5,  name:"5ème Arrondissement", pop:"145 000", zone:"Quartier Mardjandaffack, Toukra", color:"#7c3aed" },
  { n:6,  name:"6ème Arrondissement", pop:"120 000", zone:"Quartier Milezi, N'Djari", color:"#0369a1" },
  { n:7,  name:"7ème Arrondissement", pop:"108 000", zone:"Quartier Diguel, Walia", color:"#15803d" },
  { n:8,  name:"8ème Arrondissement", pop:"95 000",  zone:"Quartier Moursal-Ext, Am-Riguébé", color:"#b45309" },
  { n:9,  name:"9ème Arrondissement", pop:"88 000",  zone:"Quartier Klemat, Repos", color:"#374151" },
  { n:10, name:"10ème Arrondissement",pop:"75 000",  zone:"Quartier Lamadji, Walia-Sud", color:"#003580" },
];

export default function Arrondissements() {
  const { t } = useLang();
  return (
    <>
      <SEO title={t('arr.title')} />
      <PageHero
        title={t('arr.title')}
        subtitle={t('arr.sub')}
        accent="var(--accent-arr)"
        icon={<i className="fas fa-map-marked-alt" />}
        breadcrumbs={[{ label: t('nav.arrondissements') }]}
      />
      <section className="section-pad">
        <div className="container">
          <div className="arr-cards-grid">
            {ARR_DATA.map(a => (
              <Link key={a.n} to={`/arrondissements/${a.n}`}
                    className="arr-detail-card"
                    style={{ '--arr-color': a.color }}>
                <div className="arr-card-num">{a.n}</div>
                <div className="arr-card-body">
                  <h3 className="arr-card-name">{a.name}</h3>
                  <p className="arr-card-zone"><i className="fas fa-map-marker-alt" /> {a.zone}</p>
                  <p className="arr-card-pop"><i className="fas fa-users" /> {a.pop} habitants</p>
                </div>
                <div className="arr-card-arrow"><i className="fas fa-arrow-right" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
