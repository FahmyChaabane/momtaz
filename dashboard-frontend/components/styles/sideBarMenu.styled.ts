import styled from "styled-components";

interface StyledSideBarMenuProps {
  readonly displayed: boolean;
}

export const StyledSideBarMenu = styled.ul<StyledSideBarMenuProps>`
  font-size: 1.5rem;
  font-weight: 500;
  list-style: none;
  margin-top: 1.5rem;
  width: 20rem;

  li {
    &:not(:last-child) {
      margin-bottom: 0.4rem;
    }
  }

  figure {
    margin-right: 1rem;
  }

  div {
    display: ${({ displayed }) => (displayed ? "block" : "none")};
    padding: 1rem;
    background: #f8f8f8;
    border-radius: 2rem;
    ul {
      list-style: none;
      a {
        &:hover {
          color: #000;
          background: #fff;
          transform: none;
          border: ${({ theme }) => `0.15rem solid ${theme.colors.primary}`};
          transition: 0.2s;
          transform: translateY(-0.2rem);
        }

        &:active,
        &:focus {
          transform: translateY(-0.1rem);
        }
      }
    }
  }
`;

interface StyledNavAnchorsProps {
  readonly clicked: boolean;
}

export const StyledNavAnchors = styled.a<StyledNavAnchorsProps>`
  border-radius: 10rem;
  padding: 0.5rem 1rem;
  transition: 0.2s;
  text-decoration: none;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  ${({ clicked, theme }) =>
    clicked &&
    `
          background-image: linear-gradient(
            to right,
            ${theme.colors.primary},
            ${theme.colors.secondary}
          );
          color: #fff;
        `}

  &:hover {
    color: #fff;
    background-image: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
    transform: translateY(-0.3rem);
  }

  &:active,
  &:focus {
    transform: translateY(-0.1rem);
  }
}
`;
