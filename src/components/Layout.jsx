import { NavLink, Outlet } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Coins,
  Home,
  Landmark,
  LogOut,
  Shield,
  Users,
  Wallet,
} from "lucide-react";
import { SLOGAN } from "../lib/constants";
import { useStore } from "../store";

const links = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/lecteurs", label: "Lecteurs", icon: Users },
  { to: "/fraternites", label: "Fraternités", icon: BookOpen },
  { to: "/presences", label: "Présences", icon: Calendar },
  { to: "/cotisations", label: "Cotisations", icon: Coins },
  { to: "/evenements", label: "Événements", icon: Landmark },
  { to: "/caisse", label: "Caisse", icon: Wallet },
];

export default function Layout() {
  const { state, logout, can } = useStore();
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="bg-white border-b md:border-b-0 md:border-r border-slate-200 md:w-64 md:min-h-screen p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-cdlj-blue text-white grid place-items-center font-bold">
            CD
          </div>
          <div>
            <p className="font-semibold text-cdlj-blue leading-tight">CDLJ Gestion</p>
            <p className="text-[10px] text-slate-500 italic">{SLOGAN}</p>
          </div>
        </div>
        <nav className="flex md:flex-col gap-1 overflow-x-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                  isActive ? "bg-cdlj-blue text-white" : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <l.icon size={16} />
              {l.label}
            </NavLink>
          ))}
          {can("adminNav") && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  isActive ? "bg-cdlj-blue text-white" : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <Shield size={16} />
              Administration
            </NavLink>
          )}
        </nav>
        <div className="mt-auto text-xs text-slate-500">
          <p className="font-medium text-slate-800">{state.session.name}</p>
          <p className="capitalize">{state.session.role}</p>
          <button onClick={logout} className="mt-2 inline-flex items-center gap-1 text-cdlj-red">
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
