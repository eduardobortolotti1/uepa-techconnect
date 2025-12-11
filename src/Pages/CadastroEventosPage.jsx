import styled from "styled-components";

const MainDiv = styled.div`
  padding: 30px;
  background-color: #c4d2eb;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const SubDiv = styled.div`
  background-color: #ffffff;
  padding: 20px;
`;
const VoltarButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  display: inline-block;
`;

function CadastroEventosPage() {
  return (
    <MainDiv>
      <VoltarButton
        className="border rounded"
        onClick={() => window.history.back()}
      >
        Voltar
      </VoltarButton>
      <SubDiv>Cadastrar novo evento</SubDiv>
    </MainDiv>
  );
}

export default CadastroEventosPage;
