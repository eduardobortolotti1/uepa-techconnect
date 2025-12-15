import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard";

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

const FormularioCadastroNoticia = styled.form`
  width: 100%;
  max-width: 700px;
`;

const NoticiaWrapper = styled.div`
  margin-bottom: 15px;
`;

function CadastroNoticiasPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    texto: "",
  });

  const [listaNoticias, setListaNoticias] = useState([]);

  // BUSCAR NOTÍCIAS DO BACKEND
  async function buscarNoticias() {
    try {
      const resp = await fetch("http://localhost:3000/noticias");
      const data = await resp.json();
      setListaNoticias(data);
    } catch (err) {
      console.error("Erro ao buscar notícias", err);
    }
  }

  useEffect(() => {
    buscarNoticias();
  }, []);

  // EXCLUIR NOTÍCIA
  async function excluirNoticia(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta notícia?")) return;

    try {
      const resp = await fetch(`http://localhost:3000/noticias/${id}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        alert("Notícia excluída com sucesso!");
        buscarNoticias();
      }
    } catch (err) {
      console.error("Erro ao excluir", err);
    }
  }

  // ATUALIZAÇÃO FORMULÁRIO DINÂMICO
  function atualizarCampo(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // CADASTRAR NOTÍCIA
  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.titulo || !formData.texto) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const resp = await fetch("http://localhost:3000/cadastroNoticia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (resp.ok) {
        alert("Notícia cadastrada com sucesso!");
        setFormData({ titulo: "", texto: "" });
        buscarNoticias();
      }
    } catch (err) {
      console.error("Erro ao cadastrar", err);
      alert("Erro ao cadastrar notícia!");
    }
  }

  return (
    <MainDiv>
      <div className="d-flex justify-content-between w-100">
        <VoltarButton
          className="border rounded"
          onClick={() => navigate("/admin")}
        >
          ← Voltar ao Admin
        </VoltarButton>
      </div>

      <SubDiv>
        <h1 className="mb-3">Cadastrar nova notícia</h1>
        <hr className="w-100 mb-4" />

        <FormularioCadastroNoticia onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título da notícia</label>
            <input
              name="titulo"
              type="text"
              className="form-control"
              value={formData.titulo}
              onChange={atualizarCampo}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Texto da notícia</label>
            <textarea
              name="texto"
              className="form-control"
              rows="5"
              value={formData.texto}
              onChange={atualizarCampo}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Cadastrar Notícia
          </button>
        </FormularioCadastroNoticia>
      </SubDiv>

      {/* LISTAGEM DAS NOTÍCIAS */}
      <SubDiv className="mt-4 w-100">
        <h2 className="mb-3">Notícias cadastradas</h2>
        <hr className="w-100 mb-4" />

        <div className="container">
          {listaNoticias.length === 0 && (
            <p className="text-center">Nenhuma notícia cadastrada.</p>
          )}

          {listaNoticias.map((noticia) => (
            <NoticiaWrapper key={noticia.id}>
              <NewsCard
                titulo={noticia.titulo}
                texto={noticia.texto}
                data={noticia.data_criacao}
              />

              <button
                className="btn btn-danger w-100"
                onClick={() => excluirNoticia(noticia.id)}
              >
                Excluir notícia
              </button>
            </NoticiaWrapper>
          ))}
        </div>
      </SubDiv>
    </MainDiv>
  );
}

export default CadastroNoticiasPage;
