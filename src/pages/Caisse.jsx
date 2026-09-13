import { exportTable } from "../lib/pdf";
import { useKpis, useStore } from "../store";

export default function Caisse() {
  const { state, can, addDecaissement } = useStore();
  const k = useKpis();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Caisse & décaissements</h1>
        {can("exportPdf") && (
          <button
            className="border rounded-lg px-3 py-2 text-sm"
            onClick={() =>
              exportTable({
                title: "État de la caisse",
                period: new Date().toISOString().slice(0, 7),
                user: state.session.name,
                columns: ["Date", "Motif", "Montant"],
                rows: state.decaissements.map((d) => [d.date, d.motif, d.amount]),
              })
            }
          >
            Export PDF
          </button>
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card p-4">
          <p className="text-xs text-slate-500">Collecté ce mois (cotisations)</p>
          <p className="text-2xl font-semibold">{k.collectedMonth} F</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-500">Solde général (collecté − décaissements)</p>
          <p className="text-2xl font-semibold text-cdlj-blue">{k.caisse} F</p>
        </div>
      </div>
      {can("createDecaissement") && (
        <form
          className="card p-4 flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            addDecaissement({ motif: fd.get("motif"), amount: Number(fd.get("amount")) });
            e.target.reset();
          }}
        >
          <input name="motif" required className="border rounded-lg px-3 py-2 flex-1" placeholder="Motif" />
          <input name="amount" type="number" required className="border rounded-lg px-3 py-2 w-32" placeholder="Montant" />
          <button className="bg-cdlj-blue text-white px-4 rounded-lg">Décaisser</button>
        </form>
      )}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="p-3">Date</th>
              <th>Motif</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {state.decaissements.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-3">{d.date}</td>
                <td>{d.motif}</td>
                <td>{d.amount} F</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
