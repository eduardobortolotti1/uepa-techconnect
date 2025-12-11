import { useState } from "react";
import styled from "styled-components";
import Evento from "../components/Evento";

const MainDiv = styled.div`
  padding: 30px;
  background-color: #c4d2eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
  margin: 0 auto;
`;

const SubDiv = styled.div`
  background-color: #ffffff;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
`;

const VoltarButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  display: inline-block;
`;

const FormularioCadastroEvento = styled.form`
  max-width: 520px;
`;

function CadastroEventosPage() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [apresentadores, setApresentadores] = useState("");
  const [vagas, setVagas] = useState("");
  const [contato, setContato] = useState("");

  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validarData(dataStr) {
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    const br = /^\d{2}\/\d{2}\/\d{4}$/;

    if (iso.test(dataStr)) {
      const d = new Date(dataStr);
      return !isNaN(d.getTime());
    }

    if (br.test(dataStr)) {
      const [dia, mes, ano] = dataStr.split("/").map(Number);
      const d = new Date(ano, mes - 1, dia);
      return (
        d.getFullYear() === ano &&
        d.getMonth() === mes - 1 &&
        d.getDate() === dia
      );
    }

    return false;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    if (!titulo.trim()) newErrors.titulo = "O título não pode estar vazio.";
    if (!descricao.trim()) newErrors.descricao = "A descrição não pode estar vazia.";
    if (!data.trim()) {
      newErrors.data = "A data não pode estar vazia.";
    } else if (!validarData(data)) {
      newErrors.data = "Data inválida (use dd/mm/yyyy ou yyyy-mm-dd).";
    }
    if (!apresentadores.trim()) newErrors.apresentadores = "Campo obrigatório.";
    if (!vagas || Number(vagas) <= 0) newErrors.vagas = "Informe um número válido.";
    if (!contato.trim()) {
      newErrors.contato = "O contato não pode estar vazio.";
    } else if (!validarEmail(contato)) {
      newErrors.contato = "Informe um email válido.";
    }

    setErros(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // -----------------------------
    // ENVIO PARA O BACKEND
    // -----------------------------
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/cadastroEvento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo,
          descricao,
          data,
          apresentadores,
          vagas: Number(vagas),
          contato
        })
      });

      const result = await response.json();

      if (!response.ok) {
        alert("Erro no servidor: " + result.message);
      } else {
        alert("Evento cadastrado com sucesso!");
      }

    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainDiv>
      <div className="d-flex flex-content-start w-100">
        <VoltarButton
          className="border rounded"
          onClick={() => window.history.back()}
        >
          Voltar
        </VoltarButton>
      </div>

      <SubDiv>
        <h1 className="mb-3">Cadastrar novo evento</h1>
        <hr className="w-100 mb-4" />

        <Evento
          titulo={titulo || "Título ainda não definido"}
          descricao={descricao || "Descrição ainda não definida"}
          data={data || "Data não informada"}
          apresentadores={apresentadores || "Apresentadores não definidos"}
          vagas={vagas || 0}
          contato={contato || "Contato não informado"}
          onInscrever={() => console.log("Inscrito!")}
        />

        <FormularioCadastroEvento
          className="w-100 d-flex flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="form-label">Título do evento</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            {erros.titulo && <small className="text-danger">{erros.titulo}</small>}
          </div>

          <div>
            <label className="form-label">Descrição do evento</label>
            <textarea
              className="form-control"
              rows="2"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
            {erros.descricao && <small className="text-danger">{erros.descricao}</small>}
          </div>

          <div>
            <label className="form-label">Data</label>
            <input
              type="text"
              className="form-control"
              placeholder="dd/mm/yyyy ou yyyy-mm-dd"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            {erros.data && <small className="text-danger">{erros.data}</small>}
          </div>

          <div>
            <label className="form-label">Apresentadores</label>
            <input
              type="text"
              className="form-control"
              value={apresentadores}
              onChange={(e) => setApresentadores(e.target.value)}
            />
            {erros.apresentadores && (
              <small className="text-danger">{erros.apresentadores}</small>
            )}
          </div>

          <div>
            <label className="form-label">Vagas</label>
            <input
              type="number"
              className="form-control"
              value={vagas}
              onChange={(e) => setVagas(e.target.value)}
            />
            {erros.vagas && <small className="text-danger">{erros.vagas}</small>}
          </div>

          <div>
            <label className="form-label">Contato (email)</label>
            <input
              type="email"
              className="form-control"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
            />
            {erros.contato && <small className="text-danger">{erros.contato}</small>}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Cadastrar Evento"}
          </button>
        </FormularioCadastroEvento>
      </SubDiv>
    </MainDiv>
  );
}

export default CadastroEventosPage;
