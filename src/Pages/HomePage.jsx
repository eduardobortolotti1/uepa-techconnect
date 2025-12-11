import uepaLogo from "../assets/images/UEPA_1.png";
import uepaImage from "../assets/images/Uepa_foto.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Evento from "../components/Evento";

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

const EventosSection = styled.div`
  margin: 20px 70px 20px 70px;
  background-color: #c4d2eb;
  padding: 10px;
`;

function HomePage() {
  const navigate = useNavigate();

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
                Nossa universidade é palco de iniciativas que inspiram, conectam
                e transformam. Aqui, você encontra os principais eventos
                acadêmicos, culturais e científicos que fazem parte do nosso dia
                a dia. Explore, participe e viva a experiência de estar onde o
                conhecimento acontece.
              </p>
            </div>
            <div className="col-12 col-lg g-0">
              <img src={uepaImage} className="w-100 h-100 object-fit-cover" />
            </div>
          </div>
        </div>
      </Header>

      <section id="eventos">
        <EventosSection>
          <h2 className="text-center mb-4">Próximos Eventos</h2>
          <div className="container">
            <div className="row g-4">
              <Evento
                className="evento col-12 col-md-6"
                titulo="Workshop – Criação de Sites Profissionais"
                descricao="Workshop intensivo para aprender os fundamentos de HTML, CSS, JS e como publicar um site."
                data="02 de abril de 2025 – 14h às 17h"
                apresentadores="João Martins, Prof. Elisa Ramos"
                vagas={25}
                contato="suporte@webacademy.org | (21) 98822-4433"
                onInscrever={() => console.log("Inscrito!")}
              />
              <Evento
                className="evento col-12 col-md-6"
                titulo="Workshop – Criação de Sites Profissionais"
                descricao="Workshop intensivo para aprender os fundamentos de HTML, CSS, JS e como publicar um site."
                data="02 de abril de 2025 – 14h às 17h"
                apresentadores="João Martins, Prof. Elisa Ramos"
                vagas={25}
                contato="suporte@webacademy.org | (21) 98822-4433"
                onInscrever={() => console.log("Inscrito!")}
              />
            </div>

            <div className="row g-4 mt-3">
              <Evento
                className="evento col-12 col-md-6"
                titulo="Workshop – Criação de Sites Profissionais"
                descricao="Workshop intensivo para aprender os fundamentos de HTML, CSS, JS e como publicar um site."
                data="02 de abril de 2025 – 14h às 17h"
                apresentadores="João Martins, Prof. Elisa Ramos"
                vagas={25}
                contato="suporte@webacademy.org | (21) 98822-4433"
                onInscrever={() => console.log("Inscrito!")}
              />

              <Evento
                className="evento col-12 col-md-6"
                titulo="Workshop – Criação de Sites Profissionais"
                descricao="Workshop intensivo para aprender os fundamentos de HTML, CSS, JS e como publicar um site."
                data="02 de abril de 2025 – 14h às 17h"
                apresentadores="João Martins, Prof. Elisa Ramos"
                vagas={25}
                contato="suporte@webacademy.org | (21) 98822-4433"
                onInscrever={() => console.log("Inscrito!")}
              />
            </div>

            <div className="row g-4 mt-3">
              <Evento
                className="evento col-12 col-md-6"
                titulo="Workshop – Criação de Sites Profissionais"
                descricao="Workshop intensivo para aprender os fundamentos de HTML, CSS, JS e como publicar um site."
                data="02 de abril de 2025 – 14h às 17h"
                apresentadores="João Martins, Prof. Elisa Ramos"
                vagas={25}
                contato="suporte@webacademy.org | (21) 98822-4433"
                onInscrever={() => console.log("Inscrito!")}
              />

              <Evento
                className="evento col-12 col-md-6"
                titulo="Workshop – Criação de Sites Profissionais"
                descricao="Workshop intensivo para aprender os fundamentos de HTML, CSS, JS e como publicar um site."
                data="02 de abril de 2025 – 14h às 17h"
                apresentadores="João Martins, Prof. Elisa Ramos"
                vagas={25}
                contato="suporte@webacademy.org | (21) 98822-4433"
                onInscrever={() => console.log("Inscrito!")}
              />
            </div>

            <div className="row g-4 mt-3">
              <Evento
                className="evento col-12 col-md-6"
                titulo="Workshop – Criação de Sites Profissionais"
                descricao="Workshop intensivo para aprender os fundamentos de HTML, CSS, JS e como publicar um site."
                data="02 de abril de 2025 – 14h às 17h"
                apresentadores="João Martins, Prof. Elisa Ramos"
                vagas={25}
                contato="suporte@webacademy.org | (21) 98822-4433"
                onInscrever={() => console.log("Inscrito!")}
              />

              <Evento
                className="evento col-12 col-md-6"
                titulo="Workshop – Criação de Sites Profissionais"
                descricao="Workshop intensivo para aprender os fundamentos de HTML, CSS, JS e como publicar um site."
                data="02 de abril de 2025 – 14h às 17h"
                apresentadores="João Martins, Prof. Elisa Ramos"
                vagas={25}
                contato="suporte@webacademy.org | (21) 98822-4433"
                onInscrever={() => console.log("Inscrito!")}
              />
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
