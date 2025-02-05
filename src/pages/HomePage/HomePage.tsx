import { Container, Title, Subtitle, ButtonContainer, StyledLink } from "./HomePage.style";

export const HomePage = () => {
   
  return (
    <Container>
      <Title>Добро пожаловать!</Title>
      <Subtitle>Выберите, куда хотите перейти:</Subtitle>
      <ButtonContainer>
        <StyledLink to="/projects">📁 Проекты</StyledLink>
        <StyledLink to="/tasks/0">✅ Задачи</StyledLink>
      </ButtonContainer>
          </Container>
        
  );
};
