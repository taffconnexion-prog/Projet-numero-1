import { Navigate } from "react-router-dom";
import { ROLE_LABELS } from "../lib/constants";
import { useStore } from "../store";

export default function Admin() {
  const { state, can, createUser, resetDemo } = useStore();
  if (!can("adminNav")) return <Navigate to="/" replace />;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Administration</h1>
      <form
        className="card p-4 grid sm:grid-cols-2 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.target);
          createUser({
            email: fd.get("email"),
            password: fd.get("password"),
            name: fd.get("name"),
            role: fd.get("role"),
          });
          e.target.reset();
        }}
      >
        <input name="name" required className="border rounded-lg px-3 py-2" placeholder="Nom" />
        <input name="email" required className="border rounded-lg px-3 py-2" placeholder="Email" />
        <input name="password" required className="border rounded-lg px-3 py-2" placeholder="Mot de passe" />
        <select name="role" className="border rounded-lg px-3 py-2">
          {Object.entries(ROLE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <button className="sm:col-span-2 bg-cdlj-blue text-white rounded-lg py-2">Créer un compte</button>
      </form>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="p-3">Compte</th>
              <th>Rôle</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">
                  {u.name}
                  <div className="text-xs text-slate-400">{u.email}</div>
                </td>
                <td>{ROLE_LABELS[u.role]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-4">
        <h2 className="font-medium mb-2">Logs</h2>
        <ul className="text-xs space-y-1 max-h-80 overflow-auto">
          {state.logs.map((l) => (
            <li key={l.id}>
              {l.at} · {l.role} · {l.type} · {l.objet}
            </li>
          ))}
        </ul>
      </div>
      <button className="text-sm text-slate-500 underline" onClick={resetDemo}>
        Réinitialiser les données démo
      </button>
    </div>
  );
}
