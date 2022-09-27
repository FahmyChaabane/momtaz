import styled, { keyframes } from "styled-components";

const spin = keyframes`
0% { 
    transform: rotate(0deg); 
}
100% { 
    transform: rotate(360deg); 
}
`;

export const StyledLoader = styled.div`
  border: 0.5rem solid #f3f3f3;
  border-radius: 50%;
  border-top: ${({ theme }) => `0.5rem solid ${theme.colors.primary}`};
  width: 4rem;
  height: 4rem;
  animation: ${spin} 1s linear infinite;
`;
