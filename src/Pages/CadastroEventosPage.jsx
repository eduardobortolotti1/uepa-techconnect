import styled from "styled-components";
import Evento from "../components/Evento";
import { useEffect, useState } from "react";

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

const FormularioCadastroEvento = styled.div`
  width: 520px;
`;

function CadastroEventosPage() {
  async function cadastrarEvento(e) {
    e.preventDefault();

    try {
      const resp = await fetch("http://localhost:3000/cadastroEvento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          descricao: formData.descricao,
          data: formData.data,
          apresentadores: formData.apresentadores,
          vagas: Number(formData.vagas),
          contato: formData.contato,
        }),
      });

      if (!resp.ok) {
        throw new Error("Erro ao cadastrar evento");
      }

      alert("Evento cadastrado com sucesso!");

      // Limpa formulário
      setFormData({
        titulo: "",
        descricao: "",
        data: "",
        apresentadores: "",
        vagas: "",
        contato: "",
      });

      // Atualiza lista
      buscarEventos();
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar evento");
    }
  }

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    data: "",
    apresentadores: "",
    vagas: "",
    contato: "",
  });

  // LISTA DE EVENTOS DO BANCO
  const [listaEventos, setListaEventos] = useState([]);

  // BUSCAR EVENTOS DO BACKEND
  async function buscarEventos() {
    try {
      const resp = await fetch("http://localhost:3000/eventos");
      const data = await resp.json();
      setListaEventos(data);
    } catch (err) {
      console.error("Erro ao buscar eventos", err);
    }
  }

  useEffect(() => {
    buscarEventos();
  }, []);

  // EXCLUIR EVENTO
  async function excluirEvento(id) {
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) return;

    try {
      const resp = await fetch(`http://localhost:3000/eventos/${id}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        alert("Evento excluído com sucesso!");
        buscarEventos();
      }
    } catch (err) {
      console.error("Erro ao excluir", err);
    }
  }

  // ATUALIZAÇÃO FORMULÁRIO DINÂMICO
  function atualizarCampo(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

        {/* FORMULÁRIO MANTIDO */}

        <FormularioCadastroEvento>
          <Evento
            className="evento"
            titulo={formData.titulo || "Título do Evento"}
            descricao={formData.descricao || "Descrição..."}
            data={formData.data || "Data do evento"}
            apresentadores={formData.apresentadores || "Apresentador(es)"}
            vagas={formData.vagas || 0}
            contato={formData.contato || "Contato"}
            onInscrever={() => {}}
          />

          {/* FORMULÁRIO */}
          <form
            className="w-100 d-flex flex-column gap-3"
            onSubmit={cadastrarEvento}
          >
            <div>
              <label className="form-label">Título do evento</label>
              <input
                name="titulo"
                type="text"
                className="form-control"
                onChange={atualizarCampo}
              />
            </div>

            <div>
              <label className="form-label">Descrição do evento</label>
              <textarea
                name="descricao"
                className="form-control"
                rows="2"
                onChange={atualizarCampo}
              ></textarea>
            </div>

            <div>
              <label className="form-label">Data</label>
              <input
                name="data"
                type="text"
                className="form-control"
                onChange={atualizarCampo}
              />
            </div>

            <div>
              <label className="form-label">Apresentadores</label>
              <input
                name="apresentadores"
                type="text"
                className="form-control"
                onChange={atualizarCampo}
              />
            </div>

            <div>
              <label className="form-label">Vagas</label>
              <input
                name="vagas"
                type="number"
                className="form-control"
                onChange={atualizarCampo}
              />
            </div>

            <div>
              <label className="form-label">Contato</label>
              <input
                name="contato"
                type="text"
                className="form-control"
                onChange={atualizarCampo}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Cadastrar Evento
            </button>
          </form>
        </FormularioCadastroEvento>
      </SubDiv>

      {/* LISTAGEM DOS EVENTOS ABAIXO DO FORMULÁRIO */}
      <SubDiv className="mt-4 w-100">
        <h2 className="mb-3">Eventos cadastrados</h2>
        <hr className="w-100 mb-4" />

        <div className="container">
          <div className="row g-4">
            {listaEventos.map((ev) => (
              <div key={ev.id} className="col-12 col-md-6">
                <div className="h-100 d-flex flex-column">
                  <Evento
                    className="evento flex-grow-1"
                    titulo={ev.titulo}
                    descricao={ev.descricao}
                    data={ev.data}
                    apresentadores={ev.apresentadores}
                    vagas={ev.vagasrestantes}
                    contato={ev.contato}
                    onInscrever={() => {}}
                  />

                  <button
                    className="btn btn-danger w-100 mt-2"
                    onClick={() => excluirEvento(ev.id)}
                  >
                    Excluir evento
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SubDiv>
    </MainDiv>
  );
}

export default CadastroEventosPage;
