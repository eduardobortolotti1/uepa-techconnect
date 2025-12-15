import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainDiv = styled.div`
  padding: 30px;
  background-color: #c4d2eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
`;

const SubDiv = styled.div`
  background-color: #ffffff;
  padding: 40px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const VoltarButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  display: inline-block;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
  color: #312783;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6c757d;
  text-align: center;
  margin-bottom: 40px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const AdminButton = styled.button`
  padding: 20px;
  font-size: 18px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &.eventos {
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
    }
  }
  
  &.noticias {
    background-color: #28a745;
    color: white;
    
    &:hover {
      background-color: #218838;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
    }
  }
`;

const Icon = styled.span`
  font-size: 24px;
`;

function AdminPage() {
  const navigate = useNavigate();

  return (
    <MainDiv>
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <VoltarButton onClick={() => navigate("/")}>
          ← Voltar para Home
        </VoltarButton>
      </div>

      <SubDiv>
        <Title>Painel Administrativo</Title>
        <Subtitle>Escolha o que deseja gerenciar</Subtitle>

        <ButtonsContainer>
          <AdminButton 
            className="eventos"
            onClick={() => navigate("/admin/eventos")}
          >
            <Icon>📅</Icon>
            Gerenciar Eventos
          </AdminButton>

          <AdminButton 
            className="noticias"
            onClick={() => navigate("/admin/noticias")}
          >
            <Icon>📰</Icon>
            Gerenciar Notícias
          </AdminButton>
        </ButtonsContainer>
      </SubDiv>
    </MainDiv>
  );
}

export default AdminPage;