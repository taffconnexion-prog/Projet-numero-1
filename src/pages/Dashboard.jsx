import { Link } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useKpis, useStore } from "../store";

export default function Dashboard() {
  const k = useKpis();
  const { state } = useStore();
  const cards = [
    { label: "Lecteurs actifs", value: k.actifs, to: "/lecteurs" },
    { label: "Présence du mois", value: k.tauxPresence + " %", to: "/presences" },
    { label: "Cotisation du mois", value: k.tauxCotisation + " %", to: "/cotisations" },
    { label: "Caisse générale", value: k.caisse + " F", to: "/caisse" },
    { label: "Événements en cours", value: k.eventsOpen, to: "/evenements" },
    { label: "Collecté ce mois", value: k.collectedMonth + " F", to: "/caisse" },
  ];
  const data = [
    { name: "Présents", v: k.tauxPresence },
    { name: "Cotisés", v: k.tauxCotisation },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Tableau de bord</h1>
        <p className="text-sm text-slate-500">Bienvenue {state.session.name}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="card p-4 hover:border-cdlj-blue">
            <p className="text-xs text-slate-500">{c.label}</p>
            <p className="text-2xl font-semibold text-cdlj-blue">{c.value}</p>
          </Link>
        ))}
      </div>
      <div className="card p-4 h-64">
        <p className="text-sm mb-2">Taux du mois</p>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="v" fill="#1a56db" radius={6} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
