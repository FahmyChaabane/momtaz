import styled from "styled-components";

interface StyledSelectKidsNavProps {
  readonly elarge: boolean;
}

export const StyledSelectKidsNav = styled.nav<StyledSelectKidsNavProps>`
  background: ${({ theme }) => theme.colors.bg_orange};
  padding: 0.5rem;
  border-radius: ${({ elarge }) => (!elarge ? "2rem" : "2rem 2rem 0 0")};
  flex: 0 1 25%;
  cursor: pointer;
  transition: 0.2s;
  position: relative;

  article {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid black;

    position: absolute;
    right: 10%;
  }

  section {
    display: ${({ elarge }) => (elarge ? "block" : "none")};
    position: absolute;
    width: 100%;
    top: 100;
    left: 0;
    border-radius: 0% 0% 2rem 2rem;
    background: ${({ theme }) => theme.colors.secondary};
    z-index: 99;

    div {
      z-index: 99;
      padding: 0.1rem 0;
      border-radius: 2rem;
      &:hover {
        background: ${({ theme }) => theme.colors.bg_orange};
      }
    }
  }

  p {
    margin-left: 0.5rem;
  }

  &:hover article {
    transform: rotate(180deg);
  }
`;
