import styled, { keyframes } from "styled-components";

const breatheAnimation = keyframes`
 0% { 
  opacity: 0; 
  transform: scale(0.5); 
}
 100% {  
  opacity: 1; 
  transform: scale(1); 
}
`;

interface AlertProps {
  readonly type: string;
}

export const StyledAlert = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.5rem);
  z-index: 99;
`;

export const StyledAlertContent = styled.div<AlertProps>`
  padding: 1rem;
  text-align: center;
  background: #fff;
  overflow: hidden;
  width: 30vw;
  font-size: 1.25rem;
  font-weight: 400;
  border: 0.3rem solid
    ${({ type }) => (type === "error" ? "#ff6666" : "#32CD32")};
  border-radius: 1rem;
  margin: 10rem auto;
  position: relative;
  animation-name: ${breatheAnimation};
  animation-duration: 0.5s;
`;

export const StyledAlertHeader = styled.div<AlertProps>`
  color: ${({ type }) => (type === "error" ? "#ff6666" : "#32CD32")};
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  }
`;
