# CDLJ — Application de gestion

Application interne de la section Lecteurs Juniors, Paroisse Sainte Famille d’Akogbato (CDLJ, Archidiocèse de Cotonou).

Slogan : *Lecteurs, sel et lumière nous sommes*

## Stack

- Frontend : React + Vite + Tailwind CSS (mobile-first)
- Données (démo actuelle) : stockage local, en attendant le branchement Supabase
- PDF : jsPDF
- Hébergement cible : Vercel + Supabase (PostgreSQL, Auth, RLS)

## Comptes démo

| Rôle | Email | Mot de passe |
|---|---|---|
| Admin | admin@cdlj.local | admin123 |
| CO | co@cdlj.local | co123 |
| Caissier | caisse1@cdlj.local | caisse123 |
| Responsable | resp@cdlj.local | resp123 |

L’Admin **ne saisit pas** les cotisations ni les événements (CDC strict).

Les présences d’un samedi se gèlent le **samedi suivant**.

## Lancer

```bash
npm install
npm run dev
```

Le schéma SQL Supabase est dans `supabase/schema.sql`.
