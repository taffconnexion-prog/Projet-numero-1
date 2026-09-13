import { useMemo, useState } from "react";
import { iso, saturdaysInMonth } from "../lib/constants";
import { exportTable } from "../lib/pdf";
import { useStore } from "../store";

export default function Cotisations() {
  const { state, can, setCotisation, setAmount } = useStore();
  const now = new Date();
  const [ym, setYm] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`);
  const [frat, setFrat] = useState("");
  const [y, m] = ym.split("-").map(Number);
  const sats = useMemo(() => saturdaysInMonth(y, m - 1).map(iso), [y, m]);
  const lecteurs = state.lecteurs.filter((l) => !l.archived && (!frat || l.fratId === frat));
  const write = can("writeCotisation");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between gap-2">
        <h1 className="text-2xl font-semibold">Cotisations</h1>
        {can("exportPdf") && (
          <button
            className="border rounded-lg px-3 py-2 text-sm"
            onClick={() =>
              exportTable({
                title: "Fiche mensuelle des cotisations",
                period: ym,
                user: state.session.name,
                columns: ["Matricule", "Nom", ...sats, "Dû"],
                rows: lecteurs.map((l) => {
                  const due = sats.filter((s) => !state.cotisations[s]?.[l.matricule]).length * state.cotisationAmount;
                  return [l.matricule, `${l.nom} ${l.prenom}`, ...sats.map((s) => (state.cotisations[s]?.[l.matricule] ? "Payé" : "Dû")), due + " F"];
                }),
              })
            }
          >
            Export PDF
          </button>
        )}
      </div>
      <p className="text-sm text-slate-500">
        {state.cotisationAmount} F / samedi. Un absent reste dû. Admin et CO consultent uniquement.
      </p>
      {can("setCotisationAmount") && (
        <label className="text-sm">
          Montant
          <input
            type="number"
            className="border rounded-lg ml-2 px-2 py-1 w-24"
            defaultValue={state.cotisationAmount}
            onBlur={(e) => setAmount(Number(e.target.value))}
          />
        </label>
      )}
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
                <th key={s}>{s.slice(8)}</th>
              ))}
              <th>Dette</th>
            </tr>
          </thead>
          <tbody>
            {lecteurs.map((l) => {
              const due = sats.filter((s) => !state.cotisations[s]?.[l.matricule]).length * state.cotisationAmount;
              return (
                <tr key={l.id} className="border-t">
                  <td className="p-2 whitespace-nowrap">
                    {l.matricule} {l.prenom}
                  </td>
                  {sats.map((s) => (
                    <td key={s} className="p-1 text-center">
                      <input
                        type="checkbox"
                        disabled={!write}
                        checked={!!state.cotisations[s]?.[l.matricule]}
                        onChange={(e) => setCotisation(s, l.matricule, e.target.checked)}
                      />
                    </td>
                  ))}
                  <td className={due ? "text-cdlj-red font-medium" : ""}>{due} F</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
