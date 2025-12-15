import styled from "styled-components";

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #312783;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #312783;
  margin-bottom: 12px;
  line-height: 1.4;
`;

const Text = styled.p`
  font-size: 15px;
  color: #333;
  line-height: 1.7;
  margin-bottom: 15px;
  white-space: pre-wrap;
`;

const DateText = styled.div`
  font-size: 13px;
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: "📅";
    font-size: 14px;
  }
`;

function NewsCard({ titulo, texto, data }) {
  // Formatar data para exibição
  const formatarData = (dataString) => {
    const dataObj = new Date(dataString);
    return dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Card>
      <Title>{titulo}</Title>
      <Text>{texto}</Text>
      <DateText>{formatarData(data)}</DateText>
    </Card>
  );
}

export default NewsCard;