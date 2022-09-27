import styled from "styled-components";

export const AppContainer = styled.div`
  max-width: 80%;
  min-height: 50rem;
  margin: 5rem auto;
  background-color: ${({ theme }) => theme.colors.bg_grey};
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.3);
`;
