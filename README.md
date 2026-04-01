<<<<<<< HEAD
# 🏛️ Mairie de N'Djamena — Portail Officiel

Application web multi-pages pour la Commune de N'Djamena.  
**Stack** : Django 5 (API REST) + React 18 (SPA multi-pages)  
**Langues** : Français · English · العربية (RTL complet)

---

## 📁 Structure du projet

```
mairie-ndjamena/
├── backend/          # Django REST API
│   ├── apps/
│   │   ├── core/     # Modèles : Arrondissement, Service, News, Agenda, Ticker, Administration
│   │   └── contact/  # ContactMessage (anti-spam throttling)
│   ├── config/
│   │   ├── settings/ # base / development / production
│   │   └── urls.py
│   └── manage.py
└── frontend/         # React 18 SPA
    └── src/
        ├── pages/    # Home, Arrondissements×10, Services×8, Administration×6, Démarches, Actualités, Contact, 404
        ├── components/ # Preloader, TopBar, Navbar, Footer, Modal, PageHero, SEO, Ticker, StatsBand
        ├── context/  # LangContext (FR/EN/AR), ToastContext
        ├── i18n/     # 150+ clés de traduction
        ├── hooks/    # useApi
        └── utils/    # api.js (axios + CSRF)
```

---

## 🚀 Installation rapide

### 1. Backend Django

```bash
cd backend

# Copier et configurer l'environnement
cp .env.example .env
# Éditer .env et définir SECRET_KEY, DATABASE_URL, etc.

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate   # Windows : venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Migrations
python manage.py migrate

# Créer un superutilisateur (pour l'admin Django)
python manage.py createsuperuser

# Charger les données initiales (optionnel)
python manage.py loaddata fixtures/initial.json

# Lancer le serveur de développement
python manage.py runserver
# API disponible sur : http://localhost:8000/api/
# Admin Django : http://localhost:8000/admin/
# Docs API (Swagger) : http://localhost:8000/api/docs/
```

### 2. Frontend React

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer en développement
npm start
# Application disponible sur : http://localhost:3000

# Build de production
npm run build
```

---

## 🗺️ Routes React (multi-pages)

| Route | Page | Couleur d'accent |
|-------|------|-----------------|
| `/` | Accueil | `#003580` (Bleu) |
| `/arrondissements` | Liste des 10 arrondissements | `#1a6b3a` (Vert) |
| `/arrondissements/:id` | Détail arrondissement 1–10 | Couleur propre à chaque arr. |
| `/services` | Index services | `#003580` |
| `/services/etat-civil` | État Civil | `#003580` |
| `/services/urbanisme` | Urbanisme | `#8B4513` |
| `/services/eau` | Eau & Assainissement | `#0369a1` |
| `/services/voirie` | Voirie & Mobilité | `#374151` |
| `/services/sante` | Santé Publique | `#C60C30` |
| `/services/education` | Éducation | `#7c3aed` |
| `/services/environnement` | Environnement | `#15803d` |
| `/services/fiscalite` | Fiscalité | `#b45309` |
| `/administration` | Index administration | `#2d1b69` |
| `/administration/cabinet-maire` | Cabinet du Maire | `#2d1b69` |
| `/administration/conseil-municipal` | Conseil Municipal | `#1a4fa0` |
| `/administration/secretariat-general` | Secrétariat Général | `#374151` |
| `/administration/direction-financiere` | Direction Financière | `#b45309` |
| `/administration/services-techniques` | Services Techniques | `#15803d` |
| `/administration/marches-publics` | Marchés Publics | `#0369a1` |
| `/demarches` | Démarches administratives | `#0d6efd` |
| `/actualites` | Actualités & Agenda | `#003580` |
| `/contact` | Contact & Formulaire | `#38b148` |
| `*` | 404 Not Found | — |

---

## 🔌 Endpoints API Django

```
GET  /api/arrondissements/          Liste des 10 arrondissements
GET  /api/arrondissements/{id}/     Détail (par numéro ou pk)
GET  /api/services/                  Catégories de services
GET  /api/services/{slug}/           Détail d'une catégorie
GET  /api/news/                      Actualités publiées
GET  /api/agenda/                    Événements
GET  /api/tickers/                   Messages défilants
GET  /api/administration/            Unités administratives
GET  /api/stats/                     Statistiques globales
POST /api/contact/send/              Envoyer un message (throttlé 5/heure)
GET  /api/docs/                      Documentation Swagger UI
```

---

## 🔒 Sécurité

- **Backend** : CSRF tokens, throttling anti-spam (5 msg/heure par IP), validation XSS côté serveur, HTTPS forcé en production, HSTS, `X-Frame-Options: SAMEORIGIN`
- **Frontend** : Sanitisation des inputs, pas de données sensibles dans les URLs, CORS configuré, autocomplétion sécurisée

---

## 🌍 Internationalisation

Le changement de langue redirige automatiquement vers la page d'accueil et bascule le `dir` HTML en `rtl` pour l'arabe.  
Persistance via `localStorage`.

---

## 🎨 Couleur active par section

Le système de couleur active fonctionne via la variable CSS `--active-accent` injectée dynamiquement par `Navbar.jsx` à chaque changement de route. La barre inférieure de la navbar et le fil d'Ariane changent de couleur selon la section visitée.

---

© 2026 Commune de N'Djamena — Direction des Systèmes d'Information
=======
# mairiendjam
La mairie de N'djaména
>>>>>>> d7afc00da49a5371ebea1cb809acaebcc09afa68
