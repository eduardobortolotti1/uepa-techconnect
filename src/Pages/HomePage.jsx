import { useEffect, useState } from "react";
import uepaLogo from "../assets/images/UEPA_1.png";
import uepaImage from "../assets/images/Uepa_foto.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Evento from "../components/Evento";
import NewsCard from "../components/NewsCard";

const TopBar = styled.div`
  background-color: #312783;
  width: 100% !important;
  height: fit-content !important;
  padding: 10px;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-end;
`;

const Header = styled.header`
  background-color: #d9d9d9;
  width: 100% !important;
  padding: 0 100px 0 100px;
  height: fit-content !important;
`;

const NoticiasSection = styled.div`
  margin: 20px 70px 20px 70px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const EventosSection = styled.div`
  margin: 20px 70px 20px 70px;
  background-color: #c4d2eb;
  padding: 10px;
`;

function HomePage() {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [noticias, setNoticias] = useState([]);

  // -------------------------------
  // Carrega eventos do backend
  // -------------------------------
  useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await fetch("http://localhost:3000/eventos");
        const data = await res.json();
        setEventos(data);
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
      }
    }
    fetchEventos();
  }, []);

  // -------------------------------
  // Carrega notícias do backend
  // -------------------------------
  useEffect(() => {
    async function fetchNoticias() {
      try {
        const res = await fetch("http://localhost:3000/noticias");
        const data = await res.json();
        setNoticias(data);
      } catch (err) {
        console.error("Erro ao carregar notícias:", err);
      }
    }
    fetchNoticias();
  }, []);

  // -------------------------------
  // Navega para página de inscrição com ID do evento
  // -------------------------------
  function handleInscrever(eventoId) {
    navigate(`/inscricao/${eventoId}`);
  }

  return (
    <>
      <TopBar>
        <button className="btn btn-primary" onClick={() => navigate("/admin")}>
          Admin
        </button>
      </TopBar>

      <Header className="border">
        <div className="container">
          <div className="row gap-4">
            <div className="col-12 col-lg g-0 d-flex justify-content-center align-items-center flex-column">
              <h1 className="text-main">Portal de Eventos UEPA</h1>
              <p>
                Nossa universidade é palco de iniciativas que inspiram,
                conectam e transformam.
              </p>
            </div>
            <div className="col-12 col-lg g-0">
              <img src={uepaImage} className="w-100 h-100 object-fit-cover" />
            </div>
          </div>
        </div>
      </Header>

      {/* SEÇÃO DE NOTÍCIAS */}
      {noticias.length > 0 && (
        <section id="noticias">
          <NoticiasSection>
            <h2 className="text-center mb-4">Notícias e Avisos</h2>
            <div className="container">
              {noticias.map((noticia) => (
                <NewsCard
                  key={noticia.id}
                  titulo={noticia.titulo}
                  texto={noticia.texto}
                  data={noticia.data_criacao}
                />
              ))}
            </div>
          </NoticiasSection>
        </section>
      )}

      {/* SEÇÃO DE EVENTOS */}
      <section id="eventos">
        <EventosSection>
          <h2 className="text-center mb-4">Próximos Eventos</h2>
          <div className="container">
            <div className="row g-4">
              {eventos.length === 0 && (
                <p className="text-center">Nenhum evento encontrado.</p>
              )}
              {eventos.map((ev) => (
                <Evento
                  key={ev.id}
                  className="evento col-12 col-md-6"
                  titulo={ev.titulo}
                  descricao={ev.descricao}
                  data={ev.data}
                  apresentadores={ev.apresentadores}
                  vagas={ev.vagasrestantes}
                  contato={ev.contato}
                  onInscrever={() => handleInscrever(ev.id)}
                />
              ))}
            </div>
          </div>
        </EventosSection>
      </section>

      <footer className="footer">
        <img
          src={uepaLogo}
          alt="UEPA Logo"
          className="img-fluid"
          width={"300px"}
        />
        <div className="footer-content">
          <p>© 2024 UEPA Connect. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;