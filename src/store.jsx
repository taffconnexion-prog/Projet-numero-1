import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  COTISATION_DEFAULT,
  GRADES,
  ROLES,
  can,
  iso,
  monthKey,
  saturdaysInMonth,
} from "./lib/constants";

const KEY = "cdlj-store-v1";
const Ctx = createContext(null);

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function seed() {
  const users = [
    { id: "u_admin", email: "admin@cdlj.local", password: "admin123", name: "Admin système", role: ROLES.ADMIN },
    { id: "u_co", email: "co@cdlj.local", password: "co123", name: "Chargé des opérations", role: ROLES.CO },
    { id: "u_c1", email: "caisse1@cdlj.local", password: "caisse123", name: "Caissier 1", role: ROLES.CAISSIER },
    { id: "u_c2", email: "caisse2@cdlj.local", password: "caisse123", name: "Caissier 2", role: ROLES.CAISSIER },
    { id: "u_r1", email: "resp@cdlj.local", password: "resp123", name: "Responsable St-Jean", role: ROLES.RESPONSABLE },
  ];
  const frats = [
    { id: "f1", name: "Fraternité Saint Jean", responsableIds: ["u_r1"] },
    { id: "f2", name: "Fraternité Sainte Famille", responsableIds: [] },
  ];
  const lecteurs = [
    {
      id: "l1",
      matricule: "LEC100",
      nom: "ADOU",
      prenom: "Koffi",
      naissance: "2012-04-12",
      grade: "Lectorat I",
      anneeAdhesion: 2023,
      fratId: "f1",
      adresse: "Akogbato",
      contactParent: "97 00 00 01",
      archived: false,
      gradeHistory: [{ date: "2023-09-01", grade: "Postulat" }, { date: "2024-09-01", grade: "Lectorat I" }],
    },
    {
      id: "l2",
      matricule: "LEC101",
      nom: "HOUNSOU",
      prenom: "Aïcha",
      naissance: "2011-11-02",
      grade: "Noviciat",
      anneeAdhesion: 2024,
      fratId: "f1",
      adresse: "Fidjrossè",
      contactParent: "97 00 00 02",
      archived: false,
      gradeHistory: [{ date: "2024-10-01", grade: "Noviciat" }],
    },
    {
      id: "l3",
      matricule: "LEC102",
      nom: "DOSSOU",
      prenom: "Marc",
      naissance: "2010-01-20",
      grade: "Animation Grand I",
      anneeAdhesion: 2021,
      fratId: "f2",
      adresse: "Cotonou",
      contactParent: "97 00 00 03",
      archived: false,
      gradeHistory: [{ date: "2021-09-01", grade: "Postulat" }, { date: "2025-09-01", grade: "Animation Grand I" }],
    },
  ];
  const now = new Date();
  const sats = saturdaysInMonth(now.getFullYear(), now.getMonth()).map(iso);
  const presences = {};
  const cotisations = {};
  for (const s of sats) {
    presences[s] = { LEC100: "present", LEC101: "absent", LEC102: "present" };
    cotisations[s] = { LEC100: true, LEC101: false, LEC102: true };
  }
  return {
    users,
    session: null,
    frats,
    lecteurs,
    nextMatricule: 103,
    cotisationAmount: COTISATION_DEFAULT,
    presences,
    cotisations,
    events: [
      {
        id: "e1",
        name: "Retraite de rentrée",
        date: iso(now),
        lieu: "Akogbato",
        montant: 10000,
        status: "en_cours",
        participants: [
          { matricule: "LEC100", payments: [{ id: "p1", amount: 5000, date: iso(now) }] },
        ],
      },
    ],
    decaissements: [
      { id: "d1", date: iso(now), motif: "Fournitures", amount: 2000, auteur: "u_co" },
    ],
    notes: [
      { id: "n1", matricule: "LEC101", type: "avertissement", motif: "Retards répétés", auteurId: "u_r1", date: new Date().toISOString(), deleted: false },
      { id: "n2", matricule: "LEC100", type: "appreciation", motif: "Lecture soignée", auteurId: "u_co", date: new Date().toISOString(), deleted: false },
    ],
    logs: [],
  };
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : seed();
    } catch {
      return seed();
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const log = (entry) => {
    setState((s) => ({
      ...s,
      logs: [
        {
          id: uid("log"),
          at: new Date().toISOString(),
          userId: s.session?.id,
          role: s.session?.role,
          ...entry,
        },
        ...s.logs,
      ],
    }));
  };

  const api = useMemo(() => {
    const role = state.session?.role;
    return {
      state,
      can: (perm) => can(role, perm),
      login: (email, password) => {
        const u = state.users.find((x) => x.email === email && x.password === password);
        if (!u) return { ok: false, error: "Identifiants incorrects" };
        setState((s) => ({ ...s, session: { id: u.id, email: u.email, name: u.name, role: u.role } }));
        setTimeout(() => log({ type: "login", objet: email }), 0);
        return { ok: true };
      },
      logout: () => {
        log({ type: "logout", objet: state.session?.email });
        setState((s) => ({ ...s, session: null }));
      },
      resetDemo: () => setState(seed()),
      createUser: (payload) => {
        if (!can(role, "createAccount")) return { ok: false };
        const user = { id: uid("u"), ...payload };
        setState((s) => ({ ...s, users: [...s.users, user] }));
        log({ type: "create", objet: `compte ${payload.email}` });
        return { ok: true };
      },
      createLecteur: (payload) => {
        if (!can(role, "createLecteur")) return { ok: false };
        let matricule;
        setState((s) => {
          matricule = `LEC${s.nextMatricule}`;
          const l = {
            id: uid("l"),
            matricule,
            archived: false,
            gradeHistory: [{ date: iso(new Date()), grade: payload.grade }],
            ...payload,
          };
          return { ...s, lecteurs: [...s.lecteurs, l], nextMatricule: s.nextMatricule + 1 };
        });
        log({ type: "create", objet: matricule });
        return { ok: true, matricule };
      },
      updateLecteur: (id, patch) => {
        if (!can(role, "editLecteur")) return { ok: false };
        setState((s) => ({
          ...s,
          lecteurs: s.lecteurs.map((l) => {
            if (l.id !== id) return l;
            const next = { ...l, ...patch };
            if (patch.grade && patch.grade !== l.grade) {
              next.gradeHistory = [...l.gradeHistory, { date: iso(new Date()), grade: patch.grade }];
            }
            return next;
          }),
        }));
        log({ type: "update", objet: `lecteur ${id}` });
        return { ok: true };
      },
      archiveLecteur: (id) => {
        if (!can(role, "archiveLecteur")) return { ok: false };
        setState((s) => ({
          ...s,
          lecteurs: s.lecteurs.map((l) => (l.id === id ? { ...l, archived: true } : l)),
        }));
        log({ type: "archive", objet: id });
      },
      restoreLecteur: (id) => {
        if (!can(role, "restoreLecteur")) return { ok: false };
        setState((s) => ({
          ...s,
          lecteurs: s.lecteurs.map((l) => (l.id === id ? { ...l, archived: false } : l)),
        }));
        log({ type: "restore", objet: id });
      },
      createFrat: (name) => {
        if (!can(role, "createFrat")) return { ok: false };
        setState((s) => ({ ...s, frats: [...s.frats, { id: uid("f"), name, responsableIds: [] }] }));
        log({ type: "create", objet: `fraternité ${name}` });
      },
      renameFrat: (id, name) => {
        if (!can(role, "renameFrat")) return { ok: false };
        setState((s) => ({ ...s, frats: s.frats.map((f) => (f.id === id ? { ...f, name } : f)) }));
      },
      deleteFrat: (id) => {
        if (!can(role, "deleteFrat")) return { ok: false };
        const used = state.lecteurs.some((l) => !l.archived && l.fratId === id);
        if (used) return { ok: false, error: "Fraternité non vide" };
        setState((s) => ({ ...s, frats: s.frats.filter((f) => f.id !== id) }));
        return { ok: true };
      },
      setPresence: (date, matricule, status) => {
        if (!can(role, "recordPresence")) return { ok: false };
        setState((s) => ({
          ...s,
          presences: {
            ...s.presences,
            [date]: { ...(s.presences[date] || {}), [matricule]: status },
          },
        }));
      },
      setCotisation: (date, matricule, paid) => {
        if (!can(role, "writeCotisation")) return { ok: false };
        setState((s) => ({
          ...s,
          cotisations: {
            ...s.cotisations,
            [date]: { ...(s.cotisations[date] || {}), [matricule]: paid },
          },
        }));
        log({ type: "paiement", objet: `${matricule} ${date}` });
      },
      setAmount: (n) => {
        if (!can(role, "setCotisationAmount")) return { ok: false };
        setState((s) => ({ ...s, cotisationAmount: n }));
        log({ type: "update", objet: `montant cotisation ${n}` });
      },
      createEvent: (payload) => {
        if (!can(role, "manageEvents")) return { ok: false };
        setState((s) => ({
          ...s,
          events: [...s.events, { id: uid("e"), status: "en_cours", participants: [], ...payload }],
        }));
        log({ type: "create", objet: payload.name });
      },
      closeEvent: (id) => {
        if (!can(role, "closeEvent")) return { ok: false };
        setState((s) => ({
          ...s,
          events: s.events.map((e) => (e.id === id ? { ...e, status: "termine" } : e)),
        }));
        log({ type: "cloture", objet: id });
      },
      enroll: (eventId, matricule) => {
        if (!can(role, "enrollEvent")) return { ok: false };
        const ev = state.events.find((e) => e.id === eventId);
        if (!ev || ev.status !== "en_cours") return { ok: false, error: "Événement clôturé" };
        if (ev.participants.some((p) => p.matricule === matricule)) return { ok: false, error: "Déjà inscrit" };
        const exists = state.lecteurs.some((l) => l.matricule === matricule && !l.archived);
        if (!exists) return { ok: false, error: "Matricule inconnu" };
        setState((s) => ({
          ...s,
          events: s.events.map((e) =>
            e.id === eventId
              ? { ...e, participants: [...e.participants, { matricule, payments: [] }] }
              : e
          ),
        }));
        return { ok: true };
      },
      payEvent: (eventId, matricule, amount) => {
        if (!can(role, "payEvent")) return { ok: false };
        setState((s) => ({
          ...s,
          events: s.events.map((e) => {
            if (e.id !== eventId || e.status !== "en_cours") return e;
            return {
              ...e,
              participants: e.participants.map((p) =>
                p.matricule === matricule
                  ? { ...p, payments: [...p.payments, { id: uid("p"), amount: Number(amount), date: iso(new Date()) }] }
                  : p
              ),
            };
          }),
        }));
        log({ type: "paiement", objet: `événement ${eventId} ${matricule}` });
      },
      addDecaissement: (payload) => {
        if (!can(role, "createDecaissement")) return { ok: false };
        setState((s) => ({
          ...s,
          decaissements: [
            ...s.decaissements,
            { id: uid("d"), date: iso(new Date()), auteur: s.session.id, ...payload },
          ],
        }));
        log({ type: "decaissement", objet: payload.motif });
      },
      addNote: (payload) => {
        if (!can(role, "addBlame")) return { ok: false };
        setState((s) => ({
          ...s,
          notes: [
            ...s.notes,
            { id: uid("n"), date: new Date().toISOString(), auteurId: s.session.id, deleted: false, ...payload },
          ],
        }));
        log({ type: "create", objet: `${payload.type} ${payload.matricule}` });
      },
      editNote: (id, patch) => {
        if (!can(role, "editBlame")) return { ok: false };
        setState((s) => ({
          ...s,
          notes: s.notes.map((n) => (n.id === id ? { ...n, ...patch } : n)),
        }));
        log({ type: "update", objet: `note ${id}` });
      },
    };
  }, [state]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useStore() {
  return useContext(Ctx);
}

export function useKpis() {
  const { state } = useStore();
  const active = state.lecteurs.filter((l) => !l.archived);
  const mk = monthKey();
  const [y, m] = mk.split("-").map(Number);
  const sats = saturdaysInMonth(y, m - 1).map(iso);
  let presentSlots = 0;
  let paidSlots = 0;
  const totalSlots = sats.length * active.length || 1;
  for (const s of sats) {
    for (const l of active) {
      if (state.presences[s]?.[l.matricule] === "present") presentSlots++;
      if (state.cotisations[s]?.[l.matricule]) paidSlots++;
    }
  }
  const due = paidSlots * state.cotisationAmount;
  const collectedMonth = Object.entries(state.cotisations).reduce((acc, [date, map]) => {
    if (!date.startsWith(mk)) return acc;
    return acc + Object.values(map).filter(Boolean).length * state.cotisationAmount;
  }, 0);
  const allCollected = Object.values(state.cotisations).reduce(
    (acc, map) => acc + Object.values(map).filter(Boolean).length * state.cotisationAmount,
    0
  );
  const out = state.decaissements.reduce((a, d) => a + Number(d.amount), 0);
  return {
    actifs: active.length,
    tauxPresence: Math.round((presentSlots / totalSlots) * 100),
    tauxCotisation: Math.round((paidSlots / totalSlots) * 100),
    caisse: allCollected - out,
    collectedMonth,
    eventsOpen: state.events.filter((e) => e.status === "en_cours").length,
  };
}

export { GRADES };
