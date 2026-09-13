import { useParams } from "react-router-dom";
import { GRADES } from "../lib/constants";
import { useStore } from "../store";

export default function LecteurProfil() {
  const { matricule } = useParams();
  const { state, can, updateLecteur, addNote, editNote } = useStore();
  const l = state.lecteurs.find((x) => x.matricule === matricule);
  if (!l) return <p>Lecteur introuvable</p>;
  const notes = state.notes.filter((n) => n.matricule === matricule && !n.deleted);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        {l.matricule} — {l.nom} {l.prenom}
      </h1>
      <div className="card p-4 grid sm:grid-cols-2 gap-2 text-sm">
        <p>Naissance : {l.naissance}</p>
        <p>Grade : {l.grade}</p>
        <p>Adhésion : {l.anneeAdhesion}</p>
        <p>Adresse : {l.adresse}</p>
        <p>Parent : {l.contactParent}</p>
        <p>Statut : {l.archived ? "Archivé" : "Actif"}</p>
      </div>
      {can("editLecteur") && (
        <select className="border rounded-lg px-3 py-2" value={l.grade} onChange={(e) => updateLecteur(l.id, { grade: e.target.value })}>
          {GRADES.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      )}
      <div className="card p-4">
        <h2 className="font-medium mb-2">Historique des grades</h2>
        <ul className="text-sm space-y-1">
          {l.gradeHistory.map((g, i) => (
            <li key={i}>
              {g.date} → {g.grade}
            </li>
          ))}
        </ul>
      </div>
      <div className="card p-4 space-y-2">
        <h2 className="font-medium">Blâmes & appréciations</h2>
        {notes.map((n) => (
          <div key={n.id} className="flex justify-between text-sm border-b py-2">
            <span>
              <b className="capitalize">{n.type}</b> — {n.motif}
            </span>
            {can("editBlame") && (
              <button className="text-cdlj-red" onClick={() => editNote(n.id, { deleted: true })}>
                Retirer
              </button>
            )}
          </div>
        ))}
        {can("addBlame") && (
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              addNote({ matricule, type: fd.get("type"), motif: fd.get("motif") });
              e.target.reset();
            }}
          >
            <select name="type" className="border rounded-lg px-2 py-2">
              <option value="blame">Blâme</option>
              <option value="avertissement">Avertissement</option>
              <option value="appreciation">Appréciation</option>
            </select>
            <input name="motif" required className="border rounded-lg px-3 py-2 flex-1" placeholder="Motif" />
            <button className="bg-cdlj-blue text-white px-4 rounded-lg">Ajouter</button>
          </form>
        )}
      </div>
    </div>
  );
}
