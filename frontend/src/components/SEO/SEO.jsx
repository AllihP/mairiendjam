import { useEffect } from 'react';
import { useLang } from '../../context/LangContext';

export default function SEO({ title, description }) {
  const { t, lang } = useLang();
  const siteName = t('site.name');
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const desc = description || t('site.tagline');

  useEffect(() => {
    document.title = fullTitle;
    const setMeta = (name, content, prop = false) => {
      let el = document.querySelector(prop ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        prop ? el.setAttribute('property', name) : el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('description', desc);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', desc, true);
    document.documentElement.lang = lang;
  }, [fullTitle, desc, lang]);

  return null;
}
