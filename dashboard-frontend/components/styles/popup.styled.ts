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

export const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.5rem);
  animation-name: ${breatheAnimation};
  animation-duration: 0.5s;
  z-index: 99;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledPopupContent = styled.div`
  background: #fff;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
  // overflow: hidden;
  min-width: 30vw;
  border: 0.5rem solid transparent;
  border-radius: 2rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: -1rem;
    bottom: -1rem;
    left: -1rem;
    right: -1rem;
    background: linear-gradient(
      to bottom right,
      #b827fc 0%,
      #2c90fc 25%,
      #b8fd33 50%,
      #fec837 75%,
      #fd1892 100%
    );
    border-image-slice: 1;
    z-index: -1;
    border-radius: 2rem;
  }

  input {
    padding: 1rem 2rem;
    border-radius: 1rem;
    margin: 1rem;
    text-align: center;

    border: 0.1rem solid gray;
    ::placeholder {
      text-align: center;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.3);
    }
  }

  p {
    padding: 0.5rem;
  }
`;

export const StyledPopupHeader = styled.div`
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 2rem;
  padding: 1rem;
  }
`;
