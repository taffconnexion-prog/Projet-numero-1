import { useState } from "react";
import { Link } from "react-router-dom";
import { GRADES } from "../lib/constants";
import { useStore } from "../store";

export default function Lecteurs() {
  const { state, can, createLecteur, archiveLecteur, restoreLecteur } = useStore();
  const [q, setQ] = useState("");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    naissance: "",
    grade: GRADES[0],
    anneeAdhesion: new Date().getFullYear(),
    fratId: state.frats[0]?.id || "",
    adresse: "",
    contactParent: "",
  });
  const list = state.lecteurs.filter(
    (l) =>
      l.matricule.toLowerCase().includes(q.toLowerCase()) ||
      `${l.nom} ${l.prenom}`.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between gap-2">
        <h1 className="text-2xl font-semibold">Lecteurs</h1>
        {can("createLecteur") && (
          <button className="bg-cdlj-blue text-white px-4 py-2 rounded-lg" onClick={() => setShow((s) => !s)}>
            Nouveau lecteur
          </button>
        )}
      </div>
      <input className="border rounded-lg px-3 py-2 w-full" placeholder="Recherche nom ou matricule" value={q} onChange={(e) => setQ(e.target.value)} />
      {show && (
        <form
          className="card p-4 grid sm:grid-cols-2 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const r = createLecteur({ ...form, anneeAdhesion: Number(form.anneeAdhesion) });
            if (r.ok) setShow(false);
          }}
        >
          {["nom", "prenom", "naissance", "adresse", "contactParent"].map((k) => (
            <input key={k} required className="border rounded-lg px-3 py-2" placeholder={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
          ))}
          <select className="border rounded-lg px-3 py-2" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}>
            {GRADES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
          <select className="border rounded-lg px-3 py-2" value={form.fratId} onChange={(e) => setForm({ ...form, fratId: e.target.value })}>
            {state.frats.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <button className="bg-cdlj-blue text-white rounded-lg py-2 sm:col-span-2">Créer (matricule auto)</button>
        </form>
      )}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="p-3">Matricule</th>
              <th>Nom</th>
              <th>Grade</th>
              <th>Fraternité</th>
              <th>Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-3">
                  <Link className="text-cdlj-blue font-medium" to={`/lecteurs/${l.matricule}`}>
                    {l.matricule}
                  </Link>
                </td>
                <td>
                  {l.nom} {l.prenom}
                </td>
                <td>{l.grade}</td>
                <td>{state.frats.find((f) => f.id === l.fratId)?.name}</td>
                <td>{l.archived ? "Archivé" : "Actif"}</td>
                <td className="p-3">
                  {!l.archived && can("archiveLecteur") && (
                    <button className="text-cdlj-red text-xs" onClick={() => archiveLecteur(l.id)}>
                      Archiver
                    </button>
                  )}
                  {l.archived && can("restoreLecteur") && (
                    <button className="text-cdlj-blue text-xs" onClick={() => restoreLecteur(l.id)}>
                      Restaurer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
