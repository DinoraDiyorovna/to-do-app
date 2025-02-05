import { styled } from "styled-components";

 export const Container = styled.div`
  padding: 20px;
`;

 export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const TaskList = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Column = styled.div`
  flex: 1;
  margin: 0 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const TaskCard = styled.div`
  background-color: #f4f4f4;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
 export const AddTaskButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;