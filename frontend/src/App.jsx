import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import { ToastProvider } from './context/ToastContext';
import Preloader from './components/Preloader/Preloader';
import TopBar from './components/TopBar/TopBar';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { UrgencesModal } from './components/Modal/Modal';

// CSS imports
import './styles/global.css';
import './components/Modal/Modal.css';

// ── Lazy page imports ─────────────────────────────────────────
const Home             = lazy(() => import('./pages/Home/Home'));
// Arrondissements
const Arrondissements  = lazy(() => import('./pages/Arrondissements/index'));
const ArrondissementDetail = lazy(() => import('./pages/Arrondissements/ArrondissementDetail'));
// Services
const Services         = lazy(() => import('./pages/Services/index'));
const EtatCivil        = lazy(() => import('./pages/Services/EtatCivil'));
const Urbanisme        = lazy(() => import('./pages/Services/Urbanisme'));
const Eau              = lazy(() => import('./pages/Services/Eau'));
const Voirie           = lazy(() => import('./pages/Services/Voirie'));
const Sante            = lazy(() => import('./pages/Services/Sante'));
const Education        = lazy(() => import('./pages/Services/Education'));
const Environnement    = lazy(() => import('./pages/Services/Environnement'));
const Fiscalite        = lazy(() => import('./pages/Services/Fiscalite'));
// Administration
const Administration   = lazy(() => import('./pages/Administration/index'));
const AdminDetail      = lazy(() => import('./pages/Administration/AdminDetail'));
// Other pages
const Demarches        = lazy(() => import('./pages/Demarches/Demarches'));
const Actualites       = lazy(() => import('./pages/Actualites/Actualites'));
const Contact          = lazy(() => import('./pages/Contact/Contact'));
const NotFound         = lazy(() => import('./pages/NotFound/NotFound'));

// ── Scroll to top on navigation ──────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

// ── Back to top button ────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  if (!visible) return null;
  return (
    <button id="btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Retour en haut" aria-label="Retour en haut"
            style={{
              position:'fixed', bottom:'2rem', right:'2rem',
              width:44, height:44, borderRadius:'50%',
              background:'var(--or)', border:'none', color:'var(--bleu-sombre)',
              fontSize:'1rem', boxShadow:'0 4px 16px rgba(200,150,12,.4)',
              zIndex:900, cursor:'pointer', display:'flex',
              alignItems:'center', justifyContent:'center',
              transition:'transform .2s, box-shadow .2s'
            }}>
      <i className="fas fa-arrow-up" />
    </button>
  );
}

// ── Fallback spinner ──────────────────────────────────────────
function PageLoader() {
  return <div style={{ minHeight:'50vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
    <div className="spinner" />
  </div>;
}

// ── Main app shell ────────────────────────────────────────────
function AppShell() {
  const [urgOpen, setUrgOpen] = useState(false);

  return (
    <>
      <Preloader />
      <TopBar onUrgences={() => setUrgOpen(true)} />
      <Navbar />
      <main id="main-content">
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"                                        element={<Home />} />
            {/* Arrondissements */}
            <Route path="/arrondissements"                         element={<Arrondissements />} />
            <Route path="/arrondissements/:id"                     element={<ArrondissementDetail />} />
            {/* Services */}
            <Route path="/services"                                element={<Services />} />
            <Route path="/services/etat-civil"                    element={<EtatCivil />} />
            <Route path="/services/urbanisme"                      element={<Urbanisme />} />
            <Route path="/services/eau"                            element={<Eau />} />
            <Route path="/services/voirie"                         element={<Voirie />} />
            <Route path="/services/sante"                          element={<Sante />} />
            <Route path="/services/education"                      element={<Education />} />
            <Route path="/services/environnement"                  element={<Environnement />} />
            <Route path="/services/fiscalite"                      element={<Fiscalite />} />
            {/* Administration */}
            <Route path="/administration"                          element={<Administration />} />
            <Route path="/administration/:slug"                    element={<AdminDetail />} />
            {/* Other */}
            <Route path="/demarches"                               element={<Demarches />} />
            <Route path="/actualites"                              element={<Actualites />} />
            <Route path="/contact"                                 element={<Contact />} />
            <Route path="*"                                        element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
      <UrgencesModal open={urgOpen} onClose={() => setUrgOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <ToastProvider>
          <AppShell />
        </ToastProvider>
      </LangProvider>
    </BrowserRouter>
  );
}
