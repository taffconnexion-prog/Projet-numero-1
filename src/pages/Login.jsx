import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PARISH, SLOGAN } from "../lib/constants";
import { useStore } from "../store";

export default function Login() {
  const { state, login } = useStore();
  const [email, setEmail] = useState("admin@cdlj.local");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState("");
  if (state.session) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form
        className="card w-full max-w-md p-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const r = login(email, password);
          if (!r.ok) setErr(r.error);
        }}
      >
        <div className="flex gap-2">
          <div className="w-12 h-12 rounded-xl bg-cdlj-blue text-white grid place-items-center font-bold">A</div>
          <div className="w-12 h-12 rounded-xl bg-cdlj-red text-white grid place-items-center font-bold">C</div>
        </div>
        <h1 className="text-xl font-semibold text-cdlj-blue">Application de gestion CDLJ</h1>
        <p className="text-sm text-slate-500 italic">{SLOGAN}</p>
        <p className="text-xs text-slate-400">{PARISH} — Archidiocèse de Cotonou</p>
        {err && <p className="text-sm text-cdlj-red">{err}</p>}
        <input className="w-full border rounded-lg px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full border rounded-lg px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
        <button className="w-full bg-cdlj-blue text-white rounded-lg py-2 font-medium">Connexion</button>
        <p className="text-[11px] text-slate-400">
          Comptes démo : admin@cdlj.local / admin123 · co@cdlj.local / co123 · caisse1@cdlj.local / caisse123 ·
          resp@cdlj.local / resp123
        </p>
      </form>
    </div>
  );
}
