import { useState } from "react";
import { useStore } from "../store";

export default function Fraternites() {
  const { state, can, createFrat, deleteFrat, renameFrat } = useStore();
  const [name, setName] = useState("");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Fraternités</h1>
      {can("createFrat") && (
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            createFrat(name);
            setName("");
          }}
        >
          <input className="border rounded-lg px-3 py-2 flex-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nouvelle fraternité" />
          <button className="bg-cdlj-blue text-white px-4 rounded-lg">Créer</button>
        </form>
      )}
      <div className="space-y-2">
        {state.frats.map((f) => {
          const n = state.lecteurs.filter((l) => !l.archived && l.fratId === f.id).length;
          return (
            <div key={f.id} className="card p-4 flex justify-between items-center gap-2">
              <div>
                <p className="font-medium">{f.name}</p>
                <p className="text-xs text-slate-500">{n} lecteurs actifs</p>
              </div>
              {can("deleteFrat") && (
                <button
                  className="text-cdlj-red text-sm"
                  onClick={() => {
                    const r = deleteFrat(f.id);
                    if (r && r.error) alert(r.error);
                  }}
                >
                  Supprimer
                </button>
              )}
              {can("renameFrat") && (
                <button
                  className="text-sm text-cdlj-blue"
                  onClick={() => {
                    const nn = prompt("Nouveau nom", f.name);
                    if (nn) renameFrat(f.id, nn);
                  }}
                >
                  Renommer
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
