import React, { useState } from 'react';
import { useLang } from '../../context/LangContext';
import { useToast } from '../../context/ToastContext';
import { endpoints } from '../../utils/api';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Contact.css';

const ACCENT = '#2E8B3A';

/*
 * FieldGroup défini EN DEHORS de Contact() pour éviter
 * le remontage du DOM à chaque frappe (perte de focus).
 */
function FieldGroup({ name, label, type, as, value, error, onChange, children }) {
  return (
    <div className="cf-group">
      <label htmlFor={name}>{label}</label>
      {as === 'textarea' ? (
        <textarea id={name} name={name} value={value} onChange={onChange}
          rows={4} className={error ? 'error' : ''} />
      ) : as === 'select' ? (
        <select id={name} name={name} value={value} onChange={onChange}
          className={error ? 'error' : ''}>{children}</select>
      ) : (
        <input id={name} name={name} type={type || 'text'} value={value}
          onChange={onChange} className={error ? 'error' : ''} autoComplete="on" />
      )}
      {error && <span className="cf-error">{error}</span>}
    </div>
  );
}

function sanitize(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

export default function Contact() {
  const { t } = useLang();
  const { addToast } = useToast();
  const [form, setForm] = useState({
    first_name:'', last_name:'', email:'',
    phone:'', subject:'', arrondissement:'', message:'',
  });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = 'Requis';
    if (!form.last_name.trim())  e.last_name  = 'Requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.subject.trim())    e.subject    = 'Requis';
    if (form.message.trim().length < 15) e.message = 'Message trop court (15 caractères min.)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => { const c = { ...er }; delete c[name]; return c; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const sanitized = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, sanitize(v)])
      );
      await endpoints.sendContact(sanitized);
      addToast(t('form.success'), '✅');
      setForm({ first_name:'', last_name:'', email:'', phone:'', subject:'', arrondissement:'', message:'' });
      setErrors({});
    } catch (err) {
      const msg = err?.response?.data
        ? Object.values(err.response.data).flat().join(' ')
        : t('form.error');
      addToast(msg, '❌');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO title={t('contact.title')} />
      <PageHero title={t('contact.title')} subtitle={t('contact.sub')} accent={ACCENT}
        icon={<i className="fas fa-envelope"/>}
        breadcrumbs={[{label:t('nav.contact')}]} />

      <section className="section-pad">
        <div className="container contact-layout">

          <div className="contact-info-col">
            {[
              {icon:'fas fa-map-marker-alt',label:t('contact.address'),val:"Avenue Charles de Gaulle, N'Djamena\nRépublique du Tchad"},
              {icon:'fas fa-phone',label:t('contact.phone'),val:'+235 22 51 78 78\n+235 22 51 78 79'},
              {icon:'fas fa-envelope',label:t('contact.email'),val:'contact@mairie-ndjamena.td'},
              {icon:'fas fa-globe',label:t('contact.web'),val:'www.mairie-ndjamena.td'},
            ].map((it,i)=>(
              <div key={i} className="ci-card">
                <div className="ci-icon" style={{background:ACCENT}}><i className={it.icon}/></div>
                <div>
                  <div className="ci-label">{it.label}</div>
                  <div className="ci-val">{it.val.split('\n').map((l,j)=><div key={j}>{l}</div>)}</div>
                </div>
              </div>
            ))}
            <div className="ci-hours">
              <h4><i className="fas fa-clock"/> {t('contact.hours')}</h4>
              <div className="ci-hour-row">{t('contact.hours.lj')}</div>
              <div className="ci-hour-row">{t('contact.hours.ven')}</div>
              <div className="ci-hour-row closed">{t('contact.hours.closed')}</div>
            </div>
            <a href="https://maps.google.com/?q=Mairie+de+Ndjamena" target="_blank"
               rel="noopener noreferrer" className="btn-primary"
               style={{justifyContent:'center',background:ACCENT,boxShadow:'0 4px 20px rgba(46,139,58,.3)'}}>
              <i className="fas fa-map-marker-alt"/> {t('common.map')}
            </a>
          </div>

          <div className="contact-form-col">
            <div className="cf-header" style={{background:ACCENT}}>
              <h2>{t('contact.title')}</h2>
              <p>Réponse garantie sous 48h · Traitement confidentiel · Suivi personnalisé</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="cf-row">
                <FieldGroup name="first_name" label={`${t('form.prenom')} *`}
                  value={form.first_name} error={errors.first_name} onChange={handleChange}/>
                <FieldGroup name="last_name" label={`${t('form.nom')} *`}
                  value={form.last_name} error={errors.last_name} onChange={handleChange}/>
              </div>
              <div className="cf-row">
                <FieldGroup name="email" label={`${t('form.email')} *`} type="email"
                  value={form.email} error={errors.email} onChange={handleChange}/>
                <FieldGroup name="phone" label={t('form.phone')} type="tel"
                  value={form.phone} error={errors.phone} onChange={handleChange}/>
              </div>
              <FieldGroup name="subject" label={`${t('form.subject')} *`} as="select"
                value={form.subject} error={errors.subject} onChange={handleChange}>
                <option value="">— Sélectionner un objet —</option>
                <option>État civil — Acte de naissance</option>
                <option>État civil — Acte de mariage</option>
                <option>État civil — Acte de décès</option>
                <option>Urbanisme — Permis de construire</option>
                <option>Voirie — Signalement de dégradation</option>
                <option>Hygiène — Collecte des ordures</option>
                <option>Information générale</option>
                <option>Autre demande</option>
              </FieldGroup>
              <FieldGroup name="arrondissement" label={t('form.arr')} as="select"
                value={form.arrondissement} error={errors.arrondissement} onChange={handleChange}>
                <option value="">— Sélectionner votre arrondissement —</option>
                {Array.from({length:10},(_,i)=>(
                  <option key={i}>{i===0?'1er':`${i+1}ème`} Arrondissement</option>
                ))}
              </FieldGroup>
              <FieldGroup name="message" label={`${t('form.message')} *`} as="textarea"
                value={form.message} error={errors.message} onChange={handleChange}/>
              <button type="submit" className="btn-primary cf-submit"
                style={{background:ACCENT,width:'100%',justifyContent:'center'}}
                disabled={sending}>
                {sending
                  ? <><i className="fas fa-spinner fa-spin"/> Envoi en cours…</>
                  : <><i className="fas fa-paper-plane"/> {t('form.send')}</>
                }
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
