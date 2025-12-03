import uepaLogo from "./assets/images/UEPA_1.png";
import uepaImage from "./assets/images/Uepa_foto.png";
import styled from "styled-components";

const Header = styled.header`
  background-color: #d9d9d9;
  width: 100% !important;
  padding: 0 100px 0 100px;
  height: fit-content !important;
`;

const EventosSection = styled.section`
  margin: 20px 70px 20px 70px;
  background-color: #c4d2eb;
  padding: 20px;
`;

const Evento = styled.div``;

function App() {
  return (
    <>
      <Header className="border">
        <div className="container">
          <div className="row gap-4">
            <div className="col-12 col-lg g-0 d-flex justify-content-center align-items-center flex-column">
              <h1>Portal de Eventos UEPA</h1>
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
              {/* 1 */}
              <Evento className="evento col-12 col-md-6">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-start">
                      Workshop – Criação de Sites Profissionais
                    </h5>
                    <p className="card-text flex-grow-1 text-start">
                      Workshop intensivo para aprender os fundamentos de HTML,
                      CSS, JS e como publicar um site.
                    </p>
                    <ul className="list-unstyled text-start">
                      <li>
                        <strong>Data:</strong> 02 de abril de 2025 – 14h às 17h
                      </li>
                      <li>
                        <strong>Apresentadores:</strong> João Martins, Prof.
                        Elisa Ramos
                      </li>
                      <li>
                        <strong>Vagas Restantes:</strong> 25
                      </li>
                      <li>
                        <strong>Contato:</strong> suporte@webacademy.org | (21)
                        98822-4433
                      </li>
                    </ul>
                    <button className="btn btn-primary mt-auto">
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </Evento>

              {/* 2 */}
              <Evento className="evento col-12 col-md-6">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-start">
                      Encontro de Desenvolvedores Backend
                    </h5>
                    <p className="card-text flex-grow-1 text-start">
                      Encontro mensal com debates, apresentações e troca de
                      experiências sobre APIs e servidores.
                    </p>
                    <ul className="list-unstyled text-start">
                      <li>
                        <strong>Data:</strong> 18 de maio de 2025 – 19h
                      </li>
                      <li>
                        <strong>Apresentadores:</strong> Lucas Prado, Eng.
                        Marina Moreira
                      </li>
                      <li>
                        <strong>Vagas Restantes:</strong> 40
                      </li>
                      <li>
                        <strong>Contato:</strong> comunidade@devbackend.net |
                        (31) 9200-1100
                      </li>
                    </ul>
                    <button className="btn btn-primary mt-auto">
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </Evento>
            </div>

            <div className="row g-4 mt-3">
              {/* 3 */}
              <Evento className="evento col-12 col-md-6">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-start">
                      Seminário sobre Segurança em Servidores Locais
                    </h5>
                    <p className="card-text flex-grow-1 text-start">
                      Firewall, criptografia, certificados e prevenção de
                      ataques em servidores locais.
                    </p>
                    <ul className="list-unstyled text-start">
                      <li>
                        <strong>Data:</strong> 09 de junho de 2025 – 10h às 16h
                      </li>
                      <li>
                        <strong>Apresentadores:</strong> Dr. Rogério Lins, Eng.
                        Caio Fontes
                      </li>
                      <li>
                        <strong>Vagas Restantes:</strong> 18
                      </li>
                      <li>
                        <strong>Contato:</strong> seguranca@infosecbr.com | (48)
                        97777-4511
                      </li>
                    </ul>
                    <button className="btn btn-primary mt-auto">
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </Evento>

              {/* 4 */}
              <Evento className="evento col-12 col-md-6">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-start">
                      Expo Web & Design 2025
                    </h5>
                    <p className="card-text flex-grow-1 text-start">
                      Três dias de palestras, workshops e exposição sobre UX,
                      UI, front-end e design moderno.
                    </p>
                    <ul className="list-unstyled text-start">
                      <li>
                        <strong>Data:</strong> 25 de julho de 2025 – 10h às 20h
                      </li>
                      <li>
                        <strong>Apresentadores:</strong> Vários conferencistas
                        convidados
                      </li>
                      <li>
                        <strong>Vagas Restantes:</strong> 120
                      </li>
                      <li>
                        <strong>Contato:</strong> contato@expowebdesign.com |
                        (85) 3111-7722
                      </li>
                    </ul>
                    <button className="btn btn-primary mt-auto">
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </Evento>
            </div>

            <div className="row g-4 mt-3">
              {/* 5 */}
              <Evento className="evento col-12 col-md-6">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-start">
                      Fórum de Inteligência Artificial Aplicada
                    </h5>
                    <p className="card-text flex-grow-1 text-start">
                      IA generativa, automação, ética, modelos preditivos e
                      construção de protótipos.
                    </p>
                    <ul className="list-unstyled text-start">
                      <li>
                        <strong>Data:</strong> 03 de setembro de 2025 – 9h às
                        17h
                      </li>
                      <li>
                        <strong>Apresentadores:</strong> Dra. Renata Cardoso,
                        Eng. Felipe Aragão
                      </li>
                      <li>
                        <strong>Vagas Restantes:</strong> 60
                      </li>
                      <li>
                        <strong>Contato:</strong> ia@techconnect2025.org | (11)
                        93344-8821
                      </li>
                    </ul>
                    <button className="btn btn-primary mt-auto">
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </Evento>

              {/* 6 */}
              <Evento className="evento col-12 col-md-6">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-start">
                      Hackathon TechConnect – Inovação em 24h
                    </h5>
                    <p className="card-text flex-grow-1 text-start">
                      Equipes criando soluções em 24h com mentoria e
                      apresentação final.
                    </p>
                    <ul className="list-unstyled text-start">
                      <li>
                        <strong>Data:</strong> 12 de agosto de 2025 – 10h às 10h
                        (dia seguinte)
                      </li>
                      <li>
                        <strong>Apresentadores:</strong> Mentores convidados de
                        várias startups
                      </li>
                      <li>
                        <strong>Vagas Restantes:</strong> 14 equipes
                      </li>
                      <li>
                        <strong>Contato:</strong> hackathon@techconnect2025.org
                        | (21) 98012-5522
                      </li>
                    </ul>
                    <button className="btn btn-primary mt-auto">
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </Evento>
            </div>

            <div className="row g-4 mt-3">
              {/* 7 */}
              <Evento className="evento col-12 col-md-6">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-start">
                      Conferência de Cloud Computing e Infraestrutura Escalável
                    </h5>
                    <p className="card-text flex-grow-1 text-start">
                      Serverless, containers, Kubernetes, observabilidade e
                      otimização em multi-cloud.
                    </p>
                    <ul className="list-unstyled text-start">
                      <li>
                        <strong>Data:</strong> 30 de setembro de 2025 – 13h às
                        19h
                      </li>
                      <li>
                        <strong>Apresentadores:</strong> Eng. Paulo Almeida,
                        Arquiteta Júlia Torres
                      </li>
                      <li>
                        <strong>Vagas Restantes:</strong> 80
                      </li>
                      <li>
                        <strong>Contato:</strong> cloud@techconnect2025.org |
                        (41) 95555-3344
                      </li>
                    </ul>
                    <button className="btn btn-primary mt-auto">
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </Evento>
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

export default App;
