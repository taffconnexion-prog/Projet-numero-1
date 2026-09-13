export const ROLES = {
  ADMIN: "admin",
  CO: "co",
  CAISSIER: "caissier",
  RESPONSABLE: "responsable",
};

export const ROLE_LABELS = {
  admin: "Administrateur système",
  co: "Chargé des opérations",
  caissier: "Responsable caisse",
  responsable: "Responsable",
};

export const GRADES = [
  "Postulat",
  "Noviciat",
  "Lectorat I",
  "Lectorat II",
  "Animation Grand I",
  "Animation Grand II",
  "Formation",
];

export const COTISATION_DEFAULT = 50;
export const SLOGAN = "Lecteurs, sel et lumière nous sommes";
export const ORG = "Communauté Diocésaine des Lecteurs Juniors";
export const PARISH = "Paroisse Sainte Famille d'Akogbato";

export function saturdaysInMonth(year, monthIndex) {
  const dates = [];
  const d = new Date(year, monthIndex, 1);
  while (d.getMonth() === monthIndex) {
    if (d.getDay() === 6) dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

export function iso(d) {
  return d.toISOString().slice(0, 10);
}

export function monthKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function isPresenceFrozen(saturdayIso, now = new Date()) {
  const sat = new Date(saturdayIso + "T00:00:00");
  const nextSat = new Date(sat);
  nextSat.setDate(sat.getDate() + 7);
  return now >= nextSat;
}

export const PERMS = {
  createAccount: ["admin"],
  manageAccounts: ["admin"],
  createLecteur: ["admin", "co", "caissier", "responsable"],
  editLecteur: ["admin", "co"],
  archiveLecteur: ["admin", "co"],
  restoreLecteur: ["admin"],
  createFrat: ["admin", "co", "caissier", "responsable"],
  deleteFrat: ["admin", "co"],
  renameFrat: ["admin", "co"],
  recordPresence: ["admin", "co", "caissier", "responsable"],
  unfreezePresence: ["admin"],
  writeCotisation: ["caissier"],
  setCotisationAmount: ["admin"],
  manageEvents: ["co"],
  closeEvent: ["co"],
  enrollEvent: ["admin", "co", "caissier", "responsable"],
  payEvent: ["co"],
  createDecaissement: ["co"],
  addBlame: ["admin", "co", "caissier", "responsable"],
  editBlame: ["admin", "co"],
  viewLogs: ["admin"],
  exportPdf: ["admin", "co", "caissier"],
  adminNav: ["admin"],
};

export function can(role, perm) {
  return (PERMS[perm] || []).includes(role);
}
