import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import CadastroEventosPage from "./Pages/CadastroEventosPage";
import CadastroNoticiasPage from "./Pages/CadastroNoticiasPage";
import InscricaoEventoPage from "./Pages/InscricaoEventoPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/eventos" element={<CadastroEventosPage />} />
      <Route path="/admin/noticias" element={<CadastroNoticiasPage />} />
      <Route path="/inscricao/:id" element={<InscricaoEventoPage />} />
    </Routes>
  );
}

export default App;