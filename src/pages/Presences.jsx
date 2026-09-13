import { useMemo, useState } from "react";
import { isPresenceFrozen, iso, saturdaysInMonth } from "../lib/constants";
import { exportTable } from "../lib/pdf";
import { useStore } from "../store";

export default function Presences() {
  const { state, can, setPresence } = useStore();
  const now = new Date();
  const [ym, setYm] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`);
  const [frat, setFrat] = useState("");
  const [y, m] = ym.split("-").map(Number);
  const sats = useMemo(() => saturdaysInMonth(y, m - 1).map(iso), [y, m]);
  const lecteurs = state.lecteurs.filter((l) => !l.archived && (!frat || l.fratId === frat));
  const admin = can("unfreezePresence");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-between">
        <h1 className="text-2xl font-semibold">Présences</h1>
        {can("exportPdf") && (
          <button
            className="border rounded-lg px-3 py-2 text-sm"
            onClick={() =>
              exportTable({
                title: "Fiche mensuelle des présences",
                period: ym,
                user: state.session.name,
                columns: ["Matricule", "Nom", ...sats],
                rows: lecteurs.map((l) => [l.matricule, `${l.nom} ${l.prenom}`, ...sats.map((s) => state.presences[s]?.[l.matricule] || "—")]),
              })
            }
          >
            Export PDF
          </button>
        )}
      </div>
      <div className="flex gap-2">
        <input type="month" className="border rounded-lg px-3 py-2" value={ym} onChange={(e) => setYm(e.target.value)} />
        <select className="border rounded-lg px-3 py-2" value={frat} onChange={(e) => setFrat(e.target.value)}>
          <option value="">Toutes fraternités</option>
          {state.frats.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-2 text-left">Lecteur</th>
              {sats.map((s) => (
                <th key={s} className="p-2">
                  {s.slice(8)}
                  {isPresenceFrozen(s) && <div className="text-[9px] text-cdlj-red">gelé</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lecteurs.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-2 whitespace-nowrap">
                  {l.matricule} {l.prenom}
                </td>
                {sats.map((s) => {
                  const frozen = isPresenceFrozen(s) && !admin;
                  const v = state.presences[s]?.[l.matricule] || "";
                  return (
                    <td key={s} className="p-1">
                      <select
                        disabled={frozen || !can("recordPresence")}
                        className="border rounded px-1 py-1"
                        value={v}
                        onChange={(e) => setPresence(s, l.matricule, e.target.value)}
                      >
                        <option value="">—</option>
                        <option value="present">P</option>
                        <option value="absent">A</option>
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Gel automatique le samedi suivant. Seul l’Admin peut corriger une présence gelée.</p>
    </div>
  );
}
