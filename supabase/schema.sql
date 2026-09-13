-- Schéma cible CDLJ (Supabase / PostgreSQL)
-- À appliquer après création du projet. RLS à affiner par rôle (app_metadata.role).

create type public.app_role as enum ('admin', 'co', 'caissier', 'responsable');
create type public.event_status as enum ('en_cours', 'termine');
create type public.note_type as enum ('blame', 'avertissement', 'appreciation');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role app_role not null
);

create table public.fraternites (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table public.lecteurs (
  id uuid primary key default gen_random_uuid(),
  matricule text not null unique,
  nom text not null,
  prenom text not null,
  naissance date,
  grade text not null,
  annee_adhesion int,
  frat_id uuid references public.fraternites(id),
  adresse text,
  contact_parent text,
  archived boolean not null default false,
  created_at timestamptz default now()
);

create table public.grade_history (
  id uuid primary key default gen_random_uuid(),
  lecteur_id uuid not null references public.lecteurs(id),
  grade text not null,
  changed_at date not null default current_date
);

create table public.presences (
  saturday date not null,
  matricule text not null references public.lecteurs(matricule),
  status text not null check (status in ('present', 'absent')),
  primary key (saturday, matricule)
);

create table public.settings (
  id int primary key default 1,
  cotisation_amount int not null default 50
);

create table public.cotisations (
  saturday date not null,
  matricule text not null references public.lecteurs(matricule),
  paid boolean not null default false,
  primary key (saturday, matricule)
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  event_date date not null,
  lieu text,
  montant int not null,
  status event_status not null default 'en_cours'
);

create table public.event_participants (
  event_id uuid references public.events(id),
  matricule text references public.lecteurs(matricule),
  primary key (event_id, matricule)
);

create table public.event_payments (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id),
  matricule text not null,
  amount int not null,
  paid_at date not null default current_date
);

create table public.decaissements (
  id uuid primary key default gen_random_uuid(),
  motif text not null,
  amount int not null,
  paid_at date not null default current_date,
  auteur uuid references public.profiles(id)
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  matricule text references public.lecteurs(matricule),
  type note_type not null,
  motif text not null,
  auteur uuid references public.profiles(id),
  created_at timestamptz default now(),
  deleted boolean not null default false
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  at timestamptz default now(),
  user_id uuid,
  role app_role,
  type text,
  objet text,
  detail jsonb
);

alter table public.lecteurs enable row level security;
alter table public.presences enable row level security;
alter table public.cotisations enable row level security;
alter table public.events enable row level security;
alter table public.decaissements enable row level security;
alter table public.notes enable row level security;
alter table public.audit_logs enable row level security;
