import styled from "styled-components";

export const StyledProfileFigure = styled.div`
  background: ${({ theme }) => theme.colors.bg_orange};
  padding: 0.75rem 1.5rem;
  border-radius: 5rem;
  min-width: 15rem;
  cursor: pointer;

  h2 {
    margin-left: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;
