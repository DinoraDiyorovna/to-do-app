import styled from "styled-components";
import { Link } from "react-router-dom";

 export const Container = styled.div`
  text-align: center;
  padding: 50px;
`;

 export const Title = styled.h1`
  font-size: 28px;
  color: #333;
`;

 export const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
`;

 export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

 export const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 15px 30px;
  background: #007bff;
  color: #fff;
  border-radius: 5px;
  font-size: 18px;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;
