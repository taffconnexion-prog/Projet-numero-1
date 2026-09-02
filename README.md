# Vers l’Océan — Site vitrine

Restaurant de cuisine béninoise haut de gamme, en bord de mer à Fidjrossè — Cotonou, Bénin.
Site vitrine **sans base de données** : toutes les données sont hardcodées en JSON statique.
Déploiement automatisé : **GitHub → Vercel** (auto-deploy sur push sur `main`).

## Stack

| Brique | Choix |
| --- | --- |
| Framework | Next.js 14 (App Router) — version de patch la plus récente (14.2.x) |
| Langage | TypeScript strict |
| Style | Tailwind CSS + CSS Modules (animation clip-path de la galerie) |
| Animations | Framer Motion (import tree-shaké `import { motion } from 'framer-motion'`) |
| Polices | Polices Google auto-hébergées via `next/font/local` (aucun CDN externe, pas de FOUT) |
| Images | `next/image` exclusivement (optimisation automatique, lazy loading) |
| Base de données | Aucune — données statiques dans `src/data/*.json` |

Aucune autre dépendance. Les seules dépendances runtime : `next`, `react`, `react-dom`,
`framer-motion`.

> **Note `next.config.mjs`** : le brief mentionne `next.config.ts`, mais Next.js 14 ne lit pas
> les configs TypeScript (supporté à partir de Next 15). Le contenu demandé par le cahier des
> charges est identique, dans `next.config.mjs`.
>
> **Note polices** : le brief mentionne `next/font/google` ; le build auto-télécharge les
> polices depuis Google Fonts, ce qui rend le build dépendant d’un accès réseau. Les fichiers
> variables SIL OFL sont donc auto-hébergés dans `public/fonts/` et servis via `next/font/local`
> — même résultat (auto-hébergement, pas de CDN, pas de FOUT), build 100 % déterministe.

## Démarrage local

```bash
npm ci
npm run dev        # http://localhost:3000
```

Autres scripts :

```bash
npm run build      # build de production
npm run start      # sert le build de production
npm run lint       # ESLint (next/core-web-vitals)
npm run type-check # tsc --noEmit (strict mode)
```

Variable d’environnement (voir `.env.example`, valeurs vides) :

```
NEXT_PUBLIC_SITE_URL=   # utilisé pour sitemap.xml et robots.txt
```

## Structure

```
├── .github/workflows/ci.yml   # CI : lint + type-check + build (push main & PR)
├── public/
│   ├── fonts/                 # Polices variables Google (SIL OFL, voir OFL.txt)
│   └── images/                # Images statiques (hero, plats, galerie, équipe)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout : polices, metadata/OG complètes, skip-link
│   │   ├── page.tsx           # Accueil (hero, maison, carte, ambiance, localisation)
│   │   ├── menu/page.tsx      # Carte filtrable (JS pur côté client)
│   │   ├── about/page.tsx     # Le chef, l’histoire, l’équipe
│   │   ├── contact/page.tsx   # Coordonnées + formulaire mailto
│   │   ├── reservation/page.tsx # Réservation (validation TS, mailto)
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/            # Header, Footer, PageHeader, PageTransition
│   │   ├── sections/          # Hero, Signature, MenuPreview, GalleryMosaic, Location
│   │   ├── menu/              # DishCard, TastingCard, MenuExplorer (AnimatePresence)
│   │   ├── reservation/       # ReservationForm
│   │   ├── contact/           # ContactForm
│   │   └── ui/                # Cta, Badge, SectionTitle, Field
│   ├── data/                  # menu.json, team.json, gallery.json (+ accès typés)
│   ├── hooks/                 # useScrolled, useRevealedOnce (1× par session)
│   ├── lib/                   # site.ts (coordonnées), validation.ts (formulaires)
│   └── types/                 # Types TypeScript
├── .env.example               # Template vide — jamais de vraie valeur
├── next.config.mjs            # En-têtes de sécurité (production) + poweredByHeader off
├── tailwind.config.ts         # Palette « Golfe de Guinée » + échelle typo
├── tsconfig.json              # strict mode
└── vercel.json                # Config Vercel explicite
```

## Animations — liste fermée

Seulement ces animations existent dans le code :

1. **Hero** — entrée du titre `translateY(40→0)` + opacity, 900 ms, une seule fois.
2. **Navigation** — underline `scaleX(0→1)` au hover, 200 ms, origine left.
3. **Galerie** — révélation `clip-path` horizontale, **une** animation pour toute la grille,
   jouée **une fois par session** (drapeau `sessionStorage`).
4. **Filtre du menu** — `AnimatePresence` + layout sur les cards, 300 ms, effet sobre.
5. **Boutons CTA** — micro-interaction hover (`translateY(-2px)` + intensification couleur), 150 ms.
6. **Scroll indicator** — pulse d’opacité 0.4 → 1 → 0.4, 2 s, infini, uniquement dans le hero.
7. **Transitions de page** — fondu opacity 0 → 1, 250 ms.

**`prefers-reduced-motion`** : respecté partout — via `useReducedMotion` (Framer Motion) et
via `@media (prefers-reduced-motion: reduce)` dans le CSS (galerie, smooth scroll, micro
interactions). En mouvement réduit, seule la transition de page (fondu d’opacité) est conservée ;
le site reste 100 % utilisable.

## Sécurité

- **Secrets** : aucun secret dans le code source. `.env*` dans `.gitignore`, `.env.example`
  vide et committé. Aucune variable `NEXT_PUBLIC_*` ne contient de secret.
- **En-têtes HTTP** (prod, `next.config.mjs`) : CSP (`default-src 'self'`),
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`,
  `Referrer-Policy`, `Permissions-Policy` (caméra/micro/géo désactivés), HSTS preload.
  En local (`next dev`) les en-têtes CSP sont désactivés volontairement : le client de
  développement de Next.js (React Refresh) ne fonctionne pas avec la CSP de production.
- **Formulaires** : validation stricte en TypeScript (téléphone béninois `+229 01…`, date
  non passée, fermé le lundi, 1–20 couverts), envoi par `mailto:` (zéro backend, zéro
  persistance), bouton verrouillé 3 s après envoi (rate limiting minimal), affichage des
  valeurs renvoyées uniquement via le rendu React (échappement automatique), jamais de
  `dangerouslySetInnerHTML`.
- **Images** : `next/image` uniquement, images locales sans métadonnées EXIF.
- **Routes API** : aucune — zéro surface d’attaque backend.
- **Dépendances** : 4 dépendances runtime, toutes justifiées.

### Audit (état constaté)

`npm audit` signale des vulnérabilités portées par le **noyau Next.js 14.2** lui-même et par
l’eslint-plugin dev ; les corrections officielles exigent Next 15/16 (breaking), incompatible
avec la contrainte « Next.js 14 » du cahier des charges. La version de patch la plus récente
(14.2.35) est installée. Les avis concernent des fonctionnalités **inutilisées** par ce site
(rewrites, middleware, Server Actions, `remotePatterns`, i18n Pages Router, WebSockets,
nonces CSP). À la prochaine évolution majeure : migrer vers le dernier Next LTS et ré-auditer.

## Accessibilité

- `lang="fr"`, structure sémantique (`<main>`, `<nav>`, `<section>`, `<article>`, `<address>`,
  `<figure>`), skip-link « Aller au contenu principal ».
- Contraste ≥ 4.5:1 pour tout le texte courant (la palette a été vérifiée paires par paires).
- Navigation clavier : `:focus-visible` visible partout, labels ARIA sur les boutons icône,
  `aria-current` sur la nav, `aria-live` sur le compteur du filtre de carte.
- `alt` descriptif sur chaque image.
- Respect de `prefers-reduced-motion` (voir plus haut).

## Performance

- Pages 100 % statiques (pré-rendues au build), First Load JS partagé ~87 kB.
- Hero en `priority` (LCP), images hors viewport en `loading="lazy"`.
- Polices via `next/font/local` : pas de FOUT, subset auto-hébergé.
- Images servies via l’image optimizer Next (WebP/AVIF automatique sur Vercel).
- Objectifs Lighthouse : Performance > 90, Accessibilité > 95, Best Practices 100, SEO > 95 ;
  Core Web Vitals : LCP < 2.5 s, CLS < 0.1, INP < 200 ms.

## SEO

- Metadata/OG complètes dans `layout.tsx` (locale `fr_BJ`, image OG 1200×630).
- Titres par page via le template `%s | Vers l’Océan — Restaurant Béninois à Cotonou`.
- `sitemap.xml` et `robots.txt` générés (`src/app/sitemap.ts`, `src/app/robots.ts`).

## Déploiement — Vercel

1. Connecter le dépôt GitHub à Vercel (le framework Next.js est auto-détecté).
2. Protection de branche sur `main` : exiger une Pull Request (pas de push direct).
3. Tout push sur `main` déclenche : CI GitHub (lint + types + build) puis auto-deploy Vercel.
4. La CI (`.github/workflows/ci.yml`) tourne aussi sur toute PR.

`vercel.json` fixe explicitement `npm ci` + `npm run build` (sortie `.next`).

## Contenu

- Menu : 6 plats + menu dégustation « Voyage au Bénin » (5 services) — `src/data/menu.json`.
- Équipe : 4 membres — `src/data/team.json`.
- Galerie : 5 photos — `src/data/gallery.json`.
- Coordonnées fictives mais cohérentes : `src/lib/site.ts` (source unique).
