import React, { useState } from 'react';
import { useLang } from '../../context/LangContext';
import { useToast } from '../../context/ToastContext';
import { endpoints } from '../../utils/api';
import PageHero from '../../components/PageHero/PageHero';
import SEO from '../../components/SEO/SEO';
import './Contact.css';

const ACCENT = 'var(--accent-contact)';

function sanitize(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

export default function Contact() {
  const { t } = useLang();
  const { addToast } = useToast();
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', phone:'', subject:'', arrondissement:'', message:'' });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = 'Requis';
    if (!form.last_name.trim()) e.last_name = 'Requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.subject.trim()) e.subject = 'Requis';
    if (form.message.trim().length < 15) e.message = 'Message trop court (15 caractères min.)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => { const c = {...er}; delete c[name]; return c; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const sanitized = Object.fromEntries(Object.entries(form).map(([k,v]) => [k, sanitize(v)]));
      await endpoints.sendContact(sanitized);
      addToast(t('form.success'), '✅');
      setForm({ first_name:'', last_name:'', email:'', phone:'', subject:'', arrondissement:'', message:'' });
    } catch {
      addToast(t('form.error'), '❌');
    } finally {
      setSending(false);
    }
  };

  const F = ({ name, label, type='text', as='input', children }) => (
    <div className="cf-group">
      <label htmlFor={name}>{label}</label>
      {as === 'textarea'
        ? <textarea id={name} name={name} value={form[name]} onChange={handleChange} rows={4} className={errors[name]?'error':''} />
        : as === 'select'
          ? <select id={name} name={name} value={form[name]} onChange={handleChange} className={errors[name]?'error':''}>{children}</select>
          : <input id={name} name={name} type={type} value={form[name]} onChange={handleChange} className={errors[name]?'error':''}  autoComplete="on" />
      }
      {errors[name] && <span className="cf-error">{errors[name]}</span>}
    </div>
  );

  return (
    <>
      <SEO title={t('contact.title')} />
      <PageHero title={t('contact.title')} subtitle={t('contact.sub')} accent={ACCENT}
        icon={<i className="fas fa-envelope" />}
        breadcrumbs={[{ label: t('nav.contact') }]} />

      <section className="section-pad">
        <div className="container contact-layout">
          {/* Info */}
          <div className="contact-info-col">
            {[
              { icon:'fas fa-map-marker-alt', label:t('contact.address'),
                val:"Avenue Charles de Gaulle, N'Djamena\nRépublique du Tchad" },
              { icon:'fas fa-phone', label:t('contact.phone'),
                val:'+235 22 51 78 78\n+235 22 51 78 79' },
              { icon:'fas fa-envelope', label:t('contact.email'),
                val:'contact@mairie-ndjamena.td' },
              { icon:'fas fa-globe', label:t('contact.web'),
                val:'www.mairie-ndjamena.td' },
            ].map((it,i) => (
              <div key={i} className="ci-card">
                <div className="ci-icon" style={{ background: ACCENT }}><i className={it.icon} /></div>
                <div><div className="ci-label">{it.label}</div>
                  <div className="ci-val">{it.val.split('\n').map((l,j)=><div key={j}>{l}</div>)}</div>
                </div>
              </div>
            ))}
            <div className="ci-hours">
              <h4><i className="fas fa-clock" /> {t('contact.hours')}</h4>
              <div className="ci-hour-row"><span>{t('contact.hours.lj')}</span></div>
              <div className="ci-hour-row"><span>{t('contact.hours.ven')}</span></div>
              <div className="ci-hour-row closed"><span>{t('contact.hours.closed')}</span></div>
            </div>
            <a href="https://maps.google.com/?q=Mairie+de+Ndjamena" target="_blank" rel="noopener noreferrer"
               className="btn-primary" style={{ justifyContent:'center', background: ACCENT, boxShadow:`0 4px 20px rgba(56,177,72,.4)` }}>
              <i className="fas fa-map-marker-alt" /> {t('common.map')}
            </a>
          </div>

          {/* Form */}
          <div className="contact-form-col">
            <div className="cf-header" style={{ '--cf-accent': ACCENT }}>
              <h2>{t('contact.title')}</h2>
              <p>Réponse garantie sous 48h ouvrables · Traitement confidentiel · Suivi personnalisé</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="cf-row">
                <F name="first_name" label={t('form.prenom')} />
                <F name="last_name"  label={t('form.nom')} />
              </div>
              <div className="cf-row">
                <F name="email" label={t('form.email')} type="email" />
                <F name="phone" label={t('form.phone')} type="tel" />
              </div>
              <F name="subject" label={t('form.subject')} as="select">
                <option value="">— Sélectionner un objet —</option>
                <option>État civil — Acte de naissance</option>
                <option>État civil — Acte de mariage</option>
                <option>État civil — Acte de décès</option>
                <option>Urbanisme — Permis de construire</option>
                <option>Voirie — Signalement de dégradation</option>
                <option>Hygiène — Collecte des ordures</option>
                <option>Information générale</option>
                <option>Autre demande</option>
              </F>
              <F name="arrondissement" label={t('form.arr')} as="select">
                <option value="">— Sélectionner votre arrondissement —</option>
                {Array.from({length:10},(_,i)=>(
                  <option key={i}>{i===0?'1er':`${i+1}ème`} Arrondissement</option>
                ))}
              </F>
              <F name="message" label={t('form.message')} as="textarea" />
              <button type="submit" className="btn-primary cf-submit"
                      style={{ background: ACCENT, width:'100%', justifyContent:'center' }}
                      disabled={sending}>
                {sending
                  ? <><i className="fas fa-spinner fa-spin" /> Envoi en cours…</>
                  : <><i className="fas fa-paper-plane" /> {t('form.send')}</>
                }
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
