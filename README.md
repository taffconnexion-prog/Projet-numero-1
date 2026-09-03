# Vers l’Océan — Site vitrine

Restaurant de cuisine béninoise haut de gamme, en bord de mer à Fidjrossè — Cotonou, Bénin.
Site vitrine **sans base de données** (données JSON statiques), **bilingue FR / EN** avec
switcher, déploiement automatisé **GitHub → Vercel** (auto-deploy sur push `main`).

Niveau de finition : standard Noma / Le Bernardin / Sketch — l’émotion précède l’information.

## Stack

| Brique | Choix |
| --- | --- |
| Framework | Next.js 14 (App Router), version de patch la plus récente (14.2.x) |
| Langage | TypeScript strict |
| Style | Tailwind CSS + CSS Modules (clip-path de la galerie) |
| Animations | Framer Motion (imports tree-shakés) |
| Scroll | Lenis (ultra-fluide) + `scroll-behavior: smooth` en repli |
| Polices | **2 familles seulement** : Cormorant Garamond (titres + italiques) et DM Sans (corps) — auto-hébergées via `next/font/local` (aucun CDN, pas de FOUT) |
| Images | `next/image` exclusivement, ratios stricts (16:9 hero, 4:3 cartes, 3:4 portraits) |
| Localisation | Google Maps embed **sans clé API** (section localisation) |
| Base de données | Aucune — `src/data/*.json` |

Dépendances runtime : `next`, `react`, `react-dom`, `framer-motion`, `lenis` (justifiée par le brief premium).

## Bilingue FR / EN

- Routage par locale : `/fr/…` (défaut) et `/en/…` — `src/middleware.ts` redirige `/` → `/fr`.
- Switcher `FR / EN` dans le header et le menu mobile : bascule sur la **même page** dans l’autre langue.
- Contenu 100 % traduit : UI, sections, plats (noms + descriptions), équipe, galerie (alt),
  formulaires, messages d’erreur, metadata/SEO — dictionnaires typés `src/locales/fr.ts` / `en.ts`
  (interface commune `Dict` qui garantit la parité).
- SEO international : `hreflang` (`alternates.languages`) sur chaque page, sitemap avec alternates,
  `lang="fr"` / `lang="en"` sur `<html>`, metadata/OG par locale.
- Les 10 pages (5 × 2 locales) sont **pré-rendues statiquement** (`generateStaticParams`).

## Philosophie visuelle

- **Espace** : padding de sections 80px (mobile) / 120px (desktop), texte éditorial max 680px,
  une seule idée par section.
- **Typo** : Cormorant Garamond jamais bold brute (max 600), H1 64px+ desktop avec
  letter-spacing −0.02em et line-height 1.1, corps 16px / line-height 1.75, guillemets « »,
  tirets longs, NBSP avant : ; ! ? en français.
- **Couleurs** : 3 couleurs actives — océan 80 % (dominant), sable 15 %, corail 5 % (CTA uniquement).
  Contraste texte courant **≥ 7:1 (AAA)** : paires vérifiées (harbor #274B59 sur sand-pale/foam,
  mist #B0C8D0 sur ocean-deep, sand-warm #E8C98A sur fonds sombres).
- **Images** : pleine largeur pour le hero, overlay #0A2E3C (jamais noir pur) ≥ 0.4,
  filets discrets (1px) sur cartes et galerie, jamais de bordures épaisses ni de cadres.

## Animations — liste fermée

1. **Hero** — entrée du titre translateY(40→0) + opacity, 1.1s, une seule fois.
2. **Navigation** — underline fine qui glisse (scaleX 0→1, 250ms) ; nav **transparente sur le hero,
   #0A2E3C/95 + blur(8px) au scroll, se cache au scroll descendant, réapparaît au scroll montant**.
3. **Galerie** — révélation clip-path horizontale, une animation pour toute la grille,
   une fois par session (`sessionStorage`). Sans JavaScript : grille visible (dégradation gracieuse).
4. **Filtre du menu** — AnimatePresence + layout sur les cards, 300ms.
5. **Boutons CTA** — micro-interaction hover (élévation 2px + couleur), 150ms.
6. **Scroll indicator** — pulse d’opacité 0.4→1→0.4, 2s, infini, uniquement dans le hero.
7. **Transitions de page** — fondu 450ms, easing `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
8. **Loading state** — fine barre sable (#E8C98A) en haut de page à chaque navigation (pas de spinner).
9. **Cursor custom** — cercle 20px à latence douce, s’agrandit sur liens/boutons/champs
   (pointeur fin uniquement).

**`prefers-reduced-motion`** : respecté partout (Framer `useReducedMotion` + media queries CSS) —
seules les transitions de page (fondu d’opacité) et l’essentiel de l’interface sont conservés ;
Lenis et le curseur custom sont désactivés.

## Sécurité

- **Secrets** : aucun secret dans le code source ; `.env*` ignorés, `.env.example` vide.
- **En-têtes HTTP** (production) : CSP (`default-src 'self'`, `frame-src` restreint à Google Maps
  pour la carte embed), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`, HSTS preload.
  Désactivés en dev uniquement (React Refresh l’exige).
- **Formulaires** : validation TS stricte (téléphone béninois `+229 01…`, date non passée,
  **lundi fermé**, 1–20 couverts), envoi `mailto:` (zéro backend, zéro persistance),
  bouton verrouillé 3 s après envoi, affichage via le rendu React (échappement automatique),
  zéro `dangerouslySetInnerHTML`.
- **Images** : `next/image` uniquement, fichiers locaux sans métadonnées EXIF.
- **Routes API** : aucune.

### Audit (état constaté)

`npm audit` : les avis restants sont portés par le noyau **Next.js 14.2** lui-même (correctifs
en Next 15+, incompatibles avec la contrainte du brief). Version de patch la plus récente installée
(14.2.35) ; les avis concernent des fonctionnalités inutilisées (rewrites, middleware avancés,
Server Actions, remotePatterns, nonces CSP). Ré-audit à la prochaine migration majeure.

## Accessibilité

- `lang="fr"` / `lang="en"`, structure sémantique, skip-link, navigation clavier
  (`:focus-visible` partout), ARIA sur les boutons icône, `aria-current` nav, `aria-live` filtre.
- Contraste ≥ 7:1 texte courant (AAA), alt descriptifs bilingues.
- `prefers-reduced-motion` global.
- Menu mobile plein écran fond uni (jamais de panneau latéral), fermeture au clic sur un lien.

## Performance

- 10 pages 100 % SSG + sitemap/robots/manifest statiques ; First Load JS partagé ~87 kB.
- Hero `priority` (LCP), lazy loading hors viewport, polices auto-hébergées (pas de FOUT),
  image optimizer Next (WebP/AVIF sur Vercel).
- Cibles : Lighthouse Perf > 90, A11y > 95, Best Practices 100, SEO > 95 ; CWV LCP < 2.5s, CLS < 0.1, INP < 200ms.

## Détails premium

- **Favicon** dessiné : `src/app/icon.svg` (net en 16/32px) + `apple-icon.png` + `manifest.webmanifest`.
- **OG image** designée 1200×630 (`/og-image.jpg`).
- **404 dans la charte**, bilingue (via catch-all `[...slug]` → `notFound()`).
- **global-error** auto-portante dans la charte.
- **Localisation** : carte Google Maps embed (sans clé API) + adresse + horaires + itinéraire.

## Démarrage

```bash
npm ci
npm run dev        # http://localhost:3000 → /fr
npm run build && npm start
npm run lint       # ESLint next/core-web-vitals
npm run type-check # tsc --noEmit
```

Variable d’environnement (`.env.example`) : `NEXT_PUBLIC_SITE_URL=` (sitemap/robots/metadata).

## Déploiement — Vercel

1. Repo connecté à Vercel (framework auto-détecté) — déjà fait.
2. **À faire côté GitHub (droit admin requis)** : Settings → Branches → règle sur `main`
   « Require a pull request before merging ».
3. Push sur `main` → CI GitHub (lint + types + build) → auto-deploy Vercel.

`vercel.json` fixe `npm ci` + `npm run build` (sortie `.next`).

## Structure

```
├── .github/workflows/ci.yml     # CI : lint + type-check + build
├── public/
│   ├── fonts/                   # Cormorant Garamond (+italic), DM Sans — SIL OFL
│   ├── images/                  # 16 images (hero, plats, galerie, équipe)
│   ├── og-image.jpg             # OG 1200×630 designée
│   └── icon-512.png
├── src/
│   ├── app/
│   │   ├── [locale]/            # RACINE : layout avec <html lang>
│   │   │   ├── layout.tsx       # Polices, metadata/OG/hreflang par locale,
│   │   │   │                    # SmoothScroll, RouteProgress, CustomCursor,
│   │   │   │                    # generateStaticParams (fr, en)
│   │   │   ├── page.tsx         # Accueil
│   │   │   ├── menu|about|contact|reservation/page.tsx
│   │   │   ├── [...slug]/       # Catch-all → notFound() (404 segment)
│   │   │   └── not-found.tsx    # 404 charte (bilingue)
│   │   ├── icon.svg, apple-icon.png, manifest.ts, sitemap.ts, robots.ts, global-error.tsx
│   ├── components/
│   │   ├── layout/              # Header (hide/show), MobileMenu (plein écran), Footer,
│   │   │                        # PageHeader, PageTransition, SmoothScroll (Lenis),
│   │   │                        # RouteProgress, CustomCursor
│   │   ├── sections/            # Hero, Signature, MenuPreview, GalleryMosaic (+CSS Module), Location (Maps)
│   │   ├── menu/                # DishCard, TastingCard, MenuExplorer (AnimatePresence)
│   │   ├── reservation/ contact/ ui/
│   │   └── NotFoundPanel.tsx
│   ├── data/                    # menu/team/gallery .json (textes {fr, en})
│   ├── lib/                     # site.ts, validation.ts (codes d’erreur), i18n.ts
│   ├── locales/                 # fr.ts, en.ts, dict.ts (parité typée)
│   ├── middleware.ts            # / → /fr, /en/… → /en/…
│   └── types/
├── next.config.mjs              # En-têtes sécurité (CSP frame-src Maps) — Next 14 ne lit pas .ts
├── tailwind.config.ts           # Palette 80/15/5 + échelle typo + easing premium
└── vercel.json
```
