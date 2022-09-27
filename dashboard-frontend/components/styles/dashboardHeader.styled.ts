import styled from "styled-components";

export const StyledDashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 3.5rem;
    flex: 0 1 40%;
  }

  input {
    padding: 1rem 1rem 1rem 4rem;
    border-radius: 2rem;
    transition: all 0.4s;
    border: none;
    box-shadow: 0.2rem 0.3rem 1rem rgba(0, 0, 0, 0.2);
    margin-left: -3rem;

    &:focus {
      outline: none;
    }
  }
`;
