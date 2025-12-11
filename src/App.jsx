import HomePage from "./Pages/HomePage";
import CadastroEventosPage from "./Pages/CadastroEventosPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<CadastroEventosPage />} />
    </Routes>
  );
}

export default App;
