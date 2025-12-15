import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import uepaLogo from "../assets/images/UEPA_1.png";

const MainDiv = styled.div`
  padding: 30px;
  background-color: #c4d2eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
  min-height: 100vh;
  margin: 0 auto;
`;

const VoltarButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  display: inline-block;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  padding: 40px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EventTitle = styled.h1`
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 10px;
  color: #212529;
`;

const EventDescription = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const EventInfo = styled.div`
  margin-bottom: 8px;
  font-size: 16px;
  color: #212529;

  strong {
    font-weight: 600;
  }
`;

const FormContainer = styled.form`
  margin-top: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #212529;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #212529;
  cursor: pointer;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const LogoContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Logo = styled.img`
  max-width: 300px;
  height: auto;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #6c757d;
`;

function InscricaoEventoPage() {
  const { id: eventoId } = useParams();
  const [eventoData, setEventoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    numeroMatricula: "",
    email: "",
    telefone: "",
    curso: "",
    aceitoTermos: false,
  });

  // -------------------------------
  // Carrega dados do evento
  // -------------------------------
  useEffect(() => {
    async function carregarEvento() {
      console.log("1. Iniciando carregamento...");
      console.log("2. Evento ID:", eventoId);

      try {
        const url = `http://localhost:3000/eventos/${eventoId}`;
        console.log("3. Fetching URL:", url);

        const resp = await fetch(url);
        console.log("4. Response status:", resp.status);
        console.log("5. Response ok:", resp.ok);

        if (!resp.ok) {
          throw new Error("Evento não encontrado");
        }

        const data = await resp.json();
        console.log("6. Dados recebidos:", data);
        console.log("7. Setando eventoData...");
        setEventoData(data);
        console.log("8. EventoData setado com sucesso!");
      } catch (err) {
        console.error("ERRO ao carregar evento:", err);
        alert("Erro ao carregar dados do evento: " + err.message);
      } finally {
        console.log("9. Finalizando - setLoading(false)");
        setLoading(false);
      }
    }

    console.log("0. useEffect disparado");
    if (eventoId) {
      carregarEvento();
    } else {
      console.log("Nenhum eventoId encontrado!");
      setLoading(false);
    }
  }, [eventoId]);

  function atualizarCampo(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.aceitoTermos) {
      alert("Você precisa aceitar os termos de condição e uso");
      return;
    }

    try {
      const resp = await fetch("http://localhost:3000/inscricoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventoId: eventoId,
        }),
      });

      if (resp.ok) {
        alert("Inscrição realizada com sucesso!");
        window.history.back();
      } else {
        alert("Erro ao realizar inscrição. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao enviar inscrição", err);
      alert("Erro ao realizar inscrição. Tente novamente.");
    }
  }

  if (loading) {
    return (
      <MainDiv>
        <ContentContainer>
          <LoadingMessage>Carregando evento...</LoadingMessage>
        </ContentContainer>
      </MainDiv>
    );
  }

  if (!eventoData) {
    return (
      <MainDiv>
        <ContentContainer>
          <LoadingMessage>Evento não encontrado</LoadingMessage>
        </ContentContainer>
      </MainDiv>
    );
  }

  return (
    <MainDiv>
      <div style={{ width: "100%", maxWidth: "700px" }}>
        <VoltarButton onClick={() => window.history.back()}>
          ← Voltar
        </VoltarButton>
      </div>

      <ContentContainer>
        <EventTitle>{eventoData.titulo}</EventTitle>
        <EventDescription>{eventoData.descricao}</EventDescription>
        <EventInfo>
          <strong>Data:</strong> {eventoData.data}
        </EventInfo>
        <EventInfo>
          <strong>Apresentadores:</strong> {eventoData.apresentadores}
        </EventInfo>
        <EventInfo>
          <strong>Vagas Restantes:</strong> {eventoData.vagasrestantes}
        </EventInfo>
        <EventInfo>
          <strong>Contato:</strong> {eventoData.contato}
        </EventInfo>
        <hr className="w-100" />

        <FormContainer onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nome completo</Label>
            <Input
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={atualizarCampo}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>CPF</Label>
            <Input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={atualizarCampo}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Número da matrícula</Label>
            <Input
              type="text"
              name="numeroMatricula"
              value={formData.numeroMatricula}
              onChange={atualizarCampo}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Endereço e-mail</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={atualizarCampo}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Número de telefone</Label>
            <Input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={atualizarCampo}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Curso</Label>
            <Input
              type="text"
              name="curso"
              value={formData.curso}
              onChange={atualizarCampo}
              required
            />
          </FormGroup>

          <CheckboxContainer>
            <CheckboxInput
              type="checkbox"
              name="aceitoTermos"
              id="aceitoTermos"
              checked={formData.aceitoTermos}
              onChange={atualizarCampo}
            />
            <CheckboxLabel htmlFor="aceitoTermos">
              Aceito os{" "}
              <a href="#" target="_blank">
                termos de condição e uso
              </a>
            </CheckboxLabel>
          </CheckboxContainer>

          <SubmitButton type="submit" disabled={!formData.aceitoTermos}>
            Enviar
          </SubmitButton>
        </FormContainer>
      </ContentContainer>

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
    </MainDiv>
  );
}

export default InscricaoEventoPage;
