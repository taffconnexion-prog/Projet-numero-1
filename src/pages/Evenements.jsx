import { useState } from "react";
import { exportTable } from "../lib/pdf";
import { useStore } from "../store";

export default function Evenements() {
  const { state, can, createEvent, closeEvent, enroll, payEvent } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Événements</h1>
        {can("manageEvents") && (
          <button className="bg-cdlj-blue text-white px-4 py-2 rounded-lg" onClick={() => setOpen((s) => !s)}>
            Nouvel événement
          </button>
        )}
      </div>
      {open && (
        <form
          className="card p-4 grid sm:grid-cols-2 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            createEvent({
              name: fd.get("name"),
              date: fd.get("date"),
              lieu: fd.get("lieu"),
              montant: Number(fd.get("montant")),
            });
            setOpen(false);
          }}
        >
          <input name="name" required className="border rounded-lg px-3 py-2" placeholder="Nom" />
          <input name="date" type="date" required className="border rounded-lg px-3 py-2" />
          <input name="lieu" className="border rounded-lg px-3 py-2" placeholder="Lieu" />
          <input name="montant" type="number" required className="border rounded-lg px-3 py-2" placeholder="Montant participation" />
          <button className="sm:col-span-2 bg-cdlj-blue text-white rounded-lg py-2">Créer</button>
        </form>
      )}
      {state.events.map((ev) => {
        const collected = ev.participants.reduce((a, p) => a + p.payments.reduce((x, y) => x + y.amount, 0), 0);
        const remaining = ev.participants.length * ev.montant - collected;
        return (
          <div key={ev.id} className="card p-4 space-y-3">
            <div className="flex justify-between gap-2">
              <div>
                <h2 className="font-semibold">{ev.name}</h2>
                <p className="text-xs text-slate-500">
                  {ev.date} · {ev.lieu} · {ev.montant} F · {ev.status === "en_cours" ? "En cours" : "Terminé"}
                </p>
              </div>
              <div className="flex gap-2">
                {can("exportPdf") && (
                  <button
                    className="border rounded-lg px-2 text-sm"
                    onClick={() =>
                      exportTable({
                        title: "Bilan événement " + ev.name,
                        period: ev.date,
                        user: state.session.name,
                        columns: ["Matricule", "Payé", "Restant"],
                        rows: ev.participants.map((p) => {
                          const paid = p.payments.reduce((a, x) => a + x.amount, 0);
                          return [p.matricule, paid, ev.montant - paid];
                        }),
                      })
                    }
                  >
                    PDF
                  </button>
                )}
                {can("closeEvent") && ev.status === "en_cours" && (
                  <button className="text-cdlj-red text-sm" onClick={() => closeEvent(ev.id)}>
                    Terminer
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm">
              Collecté {collected} F · Restant {remaining} F
            </p>
            {ev.status === "en_cours" && can("enrollEvent") && (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const m = new FormData(e.target).get("m");
                  const r = enroll(ev.id, m);
                  if (!r.ok) alert(r.error);
                  e.target.reset();
                }}
              >
                <input name="m" className="border rounded-lg px-3 py-2" placeholder="Matricule LEC…" />
                <button className="border rounded-lg px-3">Inscrire</button>
              </form>
            )}
            {ev.participants.map((p) => {
              const paid = p.payments.reduce((a, x) => a + x.amount, 0);
              const rest = ev.montant - paid;
              const st = rest <= 0 ? "Solde réglé" : paid ? "Paiement partiel" : "Non payé";
              return (
                <div key={p.matricule} className="text-sm border-t pt-2">
                  <div className="flex justify-between">
                    <span>{p.matricule}</span>
                    <span>
                      {paid} / {ev.montant} F — {st}
                    </span>
                  </div>
                  {can("payEvent") && ev.status === "en_cours" && rest > 0 && (
                    <form
                      className="flex gap-2 mt-1"
                      onSubmit={(e) => {
                        e.preventDefault();
                        payEvent(ev.id, p.matricule, new FormData(e.target).get("a"));
                        e.target.reset();
                      }}
                    >
                      <input name="a" type="number" className="border rounded px-2 py-1 w-28" placeholder="Tranche" />
                      <button className="text-cdlj-blue">Encaisser</button>
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
