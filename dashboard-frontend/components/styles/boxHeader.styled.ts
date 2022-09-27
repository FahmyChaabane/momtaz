import styled from "styled-components";

export const StyledBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;

  h3 {
    font-size: 1.5rem;
    margin-left: 0.5rem;
  }

  section {
    padding: 0.5rem 1rem;
    color: green;
    border-radius: 2rem;
    background: ${({ theme }) => theme.colors.bg_green};
  }

  em {
    font-size: 1.25rem;
    color: #c8c6c4;
  }
`;
