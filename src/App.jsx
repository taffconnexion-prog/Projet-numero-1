import { Navigate, Route, Routes } from "react-router-dom";
import { useStore } from "./store";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Lecteurs from "./pages/Lecteurs";
import LecteurProfil from "./pages/LecteurProfil";
import Fraternites from "./pages/Fraternites";
import Presences from "./pages/Presences";
import Cotisations from "./pages/Cotisations";
import Evenements from "./pages/Evenements";
import Caisse from "./pages/Caisse";
import Admin from "./pages/Admin";

function Guard({ children }) {
  const { state } = useStore();
  if (!state.session) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Guard>
            <Layout />
          </Guard>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="lecteurs" element={<Lecteurs />} />
        <Route path="lecteurs/:matricule" element={<LecteurProfil />} />
        <Route path="fraternites" element={<Fraternites />} />
        <Route path="presences" element={<Presences />} />
        <Route path="cotisations" element={<Cotisations />} />
        <Route path="evenements" element={<Evenements />} />
        <Route path="caisse" element={<Caisse />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
